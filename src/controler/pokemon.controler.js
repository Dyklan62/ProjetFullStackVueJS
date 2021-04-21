const Pokemon = require("../DB/Db.Pokemon.controler");
const axios = require('axios');


// TODO enlever les comments

exports.routeurAddPokemon = (req, res) => {
  var newPokemon = {
    Nom: req.body.Nom,
    Type: req.body.Type,
    EvolutionStep: req.body.EvolutionStep,
    Image: req.body.Image,
    userId: req.body.userId,
  };
  console.log(newPokemon);
  return Pokemon.AddPokemon(newPokemon)
    .then((result) => {
      res.status(200).json({
        result,
      });
    })
    .catch((err) => res.status(500).send(err.code));
};
/*
exports.routeupdateById = (req, res) => {
var updatedUser = {
    Email : req.body.Email,
    Mdp : req.body.Mdp,
    Pseudo : req.body.Pseudo,
}
return User
.updateById(req.params.userID,updatedUser)
.then((result) => res.send(result.code))
.catch((err) => res.status(500).send(err.code));
};

exports.routeupdateMdpById = (req, res) => {
return User
.updateMdpById(req.body.userId,req.body.OldMdp,req.body.Mdp,)
.then((result) => res.send(result.code))
.catch((err) => res.status(500).send(err.code));
};

exports.routeupdateEmailById = (req, res) => {
return User
.updateEmailById(req.body.userId,req.body.Email)
.then((result) => res.send(result.code))
.catch((err) => res.status(500).send(err.code));
};
*/
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
  console.log(req.body.IdTypeList);
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


/*
exports.routefindByEmail = (req, res) => {
var user = {
    Email : req.body.Email,
    Mdp : req.body.Mdp,
};
console.log(user);
return User
.findByEmail(user)
.then(result => {
    res.status(200).json({
        userId: result.ID,
    })
})
.catch((err) => res.status(500).send(err.code));
};

exports.routegetAll = (req, res) => {
    return User
    .getAll()
    .then((result) => res.send(result.code))
    .catch((err) => res.status(500).send(err.code));
};
*/
