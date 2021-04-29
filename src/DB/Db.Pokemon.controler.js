const sql = require("./Db.connection");

//fonction controler pour pokemon

const Pokemon = function (pokemon) {
  this.ID = pokemon.ID;
  this.Nom = pokemon.Nom;
  this.Type = req.body.Type;
  this.EvolutionStep = req.body.EvolutionStep;
  this.Image = req.body.Image;
};

Pokemon.AddPokemon = (newPokemon) => {
  return new Promise((resolve, reject) => {
    sql.query(
      "INSERT INTO Pokemon(Nom,Type,EvolutionStep,Image,IDUser) VALUES (?,?,?,?,?)",
      [
        newPokemon.Nom,
        newPokemon.Type,
        newPokemon.EvolutionStep,
        newPokemon.Image,
        newPokemon.userId,
      ],
      (err, res) => {
        if (err) {
          return reject(err);
        }
        res.code = "success_create";
        resolve(res);
      }
    );
  });
};

Pokemon.findTypelist = (IdTypeList) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT * FROM listetype WHERE ID IN (${IdTypeList})`,
      (err, res) => {
        if (err) {
          return reject(err);
        }
        res.code = "success_findTypesList";
        resolve(res);
      }
    );
  });
};

Pokemon.findTypes = () => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM Listetype `, (err, res) => {
      if (err) {
        return reject(err);
      }
      res.code = "success_findTypes";
      resolve(res);
    });
  });
};

Pokemon.getlist = (userId) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM Pokemon WHERE IDUser = ? ORDER BY Nom", userId, (err, res) => {
      if (err) {
        
        return reject(err);
      }
      resolve(res);
    });
  });
};


Pokemon.copyPokemon = (IdPokemon) => {
  return new Promise((resolve, reject) => {
    var copyPokemon = [];
    sql.query("SELECT * FROM Pokemon WHERE ID = ?", IdPokemon, (err, res) => {
      if (err) {
        
        return reject(err);
      }
      copyPokemon = res;
      sql.query(
        "INSERT INTO Pokemon(Nom,Type,EvolutionStep,Image,IDUser) VALUES (?,?,?,?,?)",
        [
          copyPokemon[0].Nom,
          copyPokemon[0].Type,
          copyPokemon[0].EvolutionStep,
          copyPokemon[0].Image,
          copyPokemon[0].IDUser,
        ],
        (err, res) => {
          if (err) {
            return reject(err);
          }
          res.code = "success_copy";
          
          resolve(res);
        }
      );
    });
  });
};

Pokemon.removePokemonById = (IdPokemon) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM Pokemon WHERE id = ?", IdPokemon, (err, res) => {
      if (err) {
        
        return reject(err);
      }

      if (res.affectedRows == 0) {
        
        return reject(err);
      }
      res.code = "success_deletePokemon";
      
      resolve(res);
    });
  });
};

Pokemon.findByIdPokemon = (IdPokemon) => {
  return new Promise((resolve, reject) => {
    var copyPokemon = [];
    sql.query("SELECT * FROM Pokemon WHERE ID = ?", IdPokemon, (err, res) => {
      if (err) {
        
        return reject(err);
      }
      findPokemon = res;
      sql.query(
        "SELECT * FROM Listetype WHERE Type = ?",
        [
          findPokemon[0].Type,
        ],
        (err, res2) => {
          if (err) {
            return reject(err);
          }
          res2.code = "success_find";
          findPokemon[0].TypeInfo = res2;
          resolve(findPokemon);
        }
      );
    });
  });
};

module.exports = Pokemon;
