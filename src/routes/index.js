const router = require('express').Router();

const path = require('path');

const {renderTemplate} = require('../Utils/renderTemplate');

const client = require('./bot.export');

router.use('/api', require('./api'));

router.use('/bot', require('./bot'));

router.use('/user', require('./user'));

router.get('/', (req, res) => {
	renderTemplate(req, res, 'index.ejs', {});
});

exports = module.exports = router;