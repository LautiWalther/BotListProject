const express = require('express');

const app = express();

const url = require("url");

const ejs = require("ejs");

const passport = require("passport");

const session = require("express-session");

const Strategy = require("passport-discord").Strategy;

const config = require('./src/Utils/config');

const bodyParser = require("body-parser");

const MemoryStore = require("memorystore")(session);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
passport.use(new Strategy({
    clientID: config.id,
    clientSecret: config.clientSecret,
    callbackURL: config.redirect_uri,
    scope: ["identify"]
},
  (accessToken, refreshToken, profile, done) => { // eslint-disable-line no-unused-vars
    process.nextTick(() => done(null, profile));
  }));

  app.use(session({store: new MemoryStore({ checkPeriod: 86400000 }), secret: "#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n", resave: false, saveUninitialized: false,}));

  app.use(passport.initialize());

  app.use(passport.session());

  app.locals.domain = config.domain.split("//")[1];

  app.engine("html", ejs.renderFile);

  app.set("view engine", "html");

  app.use(bodyParser.json());
  
  app.use(bodyParser.urlencoded({
    extended: true
  }));




app.use('/', require('./src/routes/index'));

  // Login endpoint.
  app.get("/login", (req, res, next) => {
    // We determine the returning url.
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL; // eslint-disable-line no-self-assign
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "/";
    }
    // Forward the request to the passport middleware.
    next();
  },
  passport.authenticate("discord"));

  // Callback endpoint.
  app.get("/callback", passport.authenticate("discord", { failureRedirect: "/" }), /* We authenticate the user, if user canceled we redirect him to index. */ (req, res) => {
    // If user had set a returning url, we redirect him there, otherwise we redirect him to index.
    if (req.session.backURL) {
      const url = req.session.backURL;
      req.session.backURL = null;
      res.redirect(url);
    } else {
      res.redirect("/");
    }
  });

  app.get("/logout", function (req, res) {
    // We destroy the session.
    req.session.destroy(() => {
      // We logout the user.
      req.logout();
      // We redirect user to index.
      res.redirect("/");
    });
  });

app.use(express.static('src/public'));

app.listen(80, () => {console.log('Listening on http://localhost')});