const router = require('express').Router();

const client = require('./bot.export');

const {clean} = require('../Utils/clean');

const config = require('../Utils/config');

const bots = require('../databases/bots.json');

const {renderTemplate} = require('../Utils/renderTemplate');

router.get('/:id', (req, res) => {
	var id = clean(req.params.id);
	if(!id)return res.redirect('/');
	var user = client.users.cache.get(id);
	if(!user)return res.redirect('/');
	var bot = Object.values(bots);
	var bot_owner = [];
	bot.forEach(b => {
		if(b.uploaded_by === id)bot_owner.push(b);
	})
	renderTemplate(req, res, 'user.ejs', {user_to_show:user, bot_owner});
});




exports = module.exports = router;