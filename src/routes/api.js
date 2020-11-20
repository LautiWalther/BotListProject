const router = require('express').Router();

const bots = require('../databases/bots.json');

const {clean} = require('../Utils/clean');

const config = require('../Utils/config');

const unirest = require("unirest");

const client = require('./bot.export');

const {checkAuth} = require('../Utils/checkAuth');

router.get('/getall', (req, res) => {
	res.json(Object.values(bots));
})

router.get('/get/:id', (req, res) => {
	var id = clean(req.params.id);
	if(!bots[id])return res.send('Error');
	res.json(bots[id])
});

router.get('/getbot/:id', (req, res) => {
	var id = clean(req.params.id);
    let data = [];
    unirest
        .get(`https://discord.com/api/users/${id}`)
        .headers({
            Authorization: `Bot ${config.token}`,
        })
        .end(function (user) {
            if (user["raw_body"].error) return res.send('error');
            data.push(JSON.parse(user["raw_body"]));
            res.json(data);
        });
});

router.post('/addbot', (req, res) => {
    var datos = {
        id : clean(req.body.id),
        prefix : clean(req.body.prefix),
        uploaded_by : clean(req.body.user_id),
        owners : clean(req.body.owners),
        server : clean(req.body.server),
        short_desc : clean(req.body.short_desc),
        description : clean(req.body.description),
        tags : clean(req.body.tags),
        website : clean(req.body.website),
    }
    var allowed = false;
    Object.keys(datos).forEach(d => {
        if(!datos[d])return res.end('error:Missing  '+ d);
        if(d === 'website')allowed = true;
    });
    console.log(datos);
    if(!allowed)return;
    var bot = client.users.cache.get(datos.id);
    if(!bot)return res.json({error:"Invalid BOT ID"});
    datos.name = bot.username;
    datos.tag = bot.discriminator;
    res.json(datos);
});

exports = module.exports = router;