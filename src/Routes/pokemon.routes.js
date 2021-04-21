const express = require('express')
const Router = express.Router();
const Auth = require('../Auth/Auth');

const PokemonControler = require('../controler/pokemon.controler');

Router.put("/types",Auth,PokemonControler.routeurfindTypes);
Router.put("/type/list",Auth,PokemonControler.routeurfindtypelist);
Router.put("/list",Auth,PokemonControler.routeurgetlist);
Router.put("/add",Auth,PokemonControler.routeurAddPokemon);
Router.put("/this/copy",Auth,PokemonControler.routeurcopyPokemon);
Router.put("/this/delete",Auth,PokemonControler.routeurDeletePokemon);
Router.put("/details/findById",Auth,PokemonControler.routeurfindByIdPokemon);





module.exports = Router;