const Pokemon = require("../DB/Db.Pokemon.controler");
const axios = require('axios');

//requetes bdd pokemon

exports.routeurAddPokemon = (req, res) => {
  var newPokemon = {
    Nom: req.body.Nom,
    Type: req.body.Type,
    EvolutionStep: req.body.EvolutionStep,
    Image: req.body.Image,
    userId: req.body.userId,
  };
  return Pokemon.AddPokemon(newPokemon)
    .then((result) => {
      res.status(200).json({
        result,
      });
    })
    .catch((err) => res.status(500).send(err.code));
};

exports.routeurcopyPokemon = (req, res) => {
  return Pokemon.copyPokemon(req.body.IdPokemon)
    .then((result) => res.send(result.code))
    .catch((err) => res.status(500).send(err.code));
};

exports.routeurDeletePokemon = (req, res) => {
  return Pokemon.removePokemonById(req.body.IdPokemon)
    .then((result) => res.send(result.code))
    .catch((err) => res.status(500).send(err.code));
};

exports.routeurfindByIdPokemon = (req, res) => {
  return Pokemon.findByIdPokemon(req.body.IdPokemon)
    .then((result) => {
      res.status(200).json({
        result,
      });
    })
    .catch((err) => res.status(500).send(err.code));
};

exports.routeurfindtypelist = (req, res) => {
  return Pokemon.findTypelist(req.body.IdTypeList)
    .then((result) => {
      res.status(200).json({
        result,
      });
    })
    .catch((err) => res.status(500).send(err.code));
};

exports.routeurfindTypes = (req, res) => {
  return Pokemon.findTypes()
    .then((result) => {
      res.status(200).json({
        result,
      });
    })
    .catch((err) => res.status(500).send(err.code));
};

exports.routeurgetlist = (req, res) => {
  return Pokemon.getlist(req.headers.authorization.split(" ")[2])
    .then((result) => {
      res.status(200).json({
        result,
      });
    })
    .catch((err) => res.status(500).send(err.code));
};
