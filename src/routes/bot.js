const router = require('express').Router();

const path = require('path');

const {clean} = require('../Utils/clean');

const config = require('../Utils/config');

const bots = require('../databases/bots.json')

const client = require('./bot.export');

const {checkAuth} = require('../Utils/checkAuth');

const {renderTemplate} = require('../Utils/renderTemplate');

router.get('/', (req, res) => {
	res.redirect('/');
});


router.get('/addbot', checkAuth, (req, res)=> {
	renderTemplate(req, res, 'addbot.ejs', {});
});

router.post('/addbot', checkAuth, (req, res)=> {
	res.json(JSON.stringify(req.body));
});

router.get('/:id', (req, res) => {
	var id = clean(req.params.id);
	if(!id || !bots[id])return res.redirect('/');
	var authors = [];
	var bot_db = bots[id];
	if(!bot_db)return res.redirect('/');
	if(!bot_db.aproved){
		if(!req.isAuthenticated())return res.redirect('/');
	}
	var bot = client.users.cache.get(id);
	if(!bot)return res.redirect('/');
	bot_db.owners.forEach(author => {
		authors.push(client.users.cache.get(author));
	});
	renderTemplate(req, res, 'bot.ejs', {id, bot, bot_db, authors});
});

exports = module.exports = router;