const express = require('express')
const Router = express.Router();
const Auth = require('../Auth/Auth');

const UserControler = require('../controler/user.controler');

//Account and user
Router.put("/Account",Auth,UserControler.routeufindAccountById);
Router.put("/register", UserControler.routecreate);
Router.put("/update/account/:userID",Auth, UserControler.routeupdateById);
Router.put("/update/MDP",Auth ,UserControler.routeupdateMdpById);
Router.put("/update/Pseudo",Auth ,UserControler.routeupdatePseudoById);
Router.put("/update/Email",Auth ,UserControler.routeupdateEmailById);
Router.post("/login", UserControler.routelogin);
Router.post("/find/Email",UserControler.routefindByEmail);



//todo : a supprimé car inutile
Router.put("/:userID",Auth, UserControler.routefindById);


//todo : a supprimé car inutile
Router.post("/getAll",UserControler.routegetAll);

module.exports = Router;