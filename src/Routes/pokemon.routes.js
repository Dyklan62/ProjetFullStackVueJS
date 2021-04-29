const express = require('express')
const Router = express.Router();
const Auth = require('../Auth/Auth');

const PokemonControler = require('../controler/pokemon.controler');

//fonction pokemon
Router.put("/types",Auth,PokemonControler.routeurfindTypes);
Router.put("/type/list",Auth,PokemonControler.routeurfindtypelist);
Router.put("/list",Auth,PokemonControler.routeurgetlist);
Router.post("/add",Auth,PokemonControler.routeurAddPokemon);
Router.patch("/this/copy",Auth,PokemonControler.routeurcopyPokemon);
Router.delete("/this/delete",Auth,PokemonControler.routeurDeletePokemon);
Router.put("/details/findById",Auth,PokemonControler.routeurfindByIdPokemon);





module.exports = Router;