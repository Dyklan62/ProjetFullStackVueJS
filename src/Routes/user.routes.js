const express = require('express')
const Router = express.Router();
const Auth = require('../Auth/Auth');

const UserControler = require('../controler/user.controler');

//fonction user
Router.put("/Account",Auth,UserControler.routeufindAccountById);
Router.post("/register", UserControler.routecreate);
Router.put("/update/account/:userID",Auth, UserControler.routeupdateById);
Router.put("/update/MDP",Auth ,UserControler.routeupdateMdpById);
Router.put("/update/Pseudo",Auth ,UserControler.routeupdatePseudoById);
Router.put("/update/Email",Auth ,UserControler.routeupdateEmailById);
Router.put("/login", UserControler.routelogin);
Router.put("/Auth",Auth, (req, res) => {
    res.status(200).send('auth');
});

module.exports = Router;