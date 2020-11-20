const path = require('path');

const dataDir = path.resolve(`${process.cwd()}${path.sep}src`);

const templateDir = path.resolve(`${dataDir}${path.sep}views`);

const client = require('../routes/bot.export');

exports.renderTemplate = (req, res, template, data = {}) => {
	const baseData = {
		clientejs: client,
	  path: req.path,
	  user: req.isAuthenticated() ? req.user : null
	};
	res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
};