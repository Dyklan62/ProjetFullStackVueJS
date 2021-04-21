const sql = require("./Db.connection");


const Pokemon = function (pokemon) {
  this.ID = pokemon.ID;
  this.Nom = pokemon.Nom;
  this.Type = req.body.Type;
  this.EvolutionStep = req.body.EvolutionStep;
  this.Image = req.body.Image;
};

// TODO enlever les comments

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
          //console.log("res_code",err.code);
          return reject(err);
        }
        //console.log("created Pokemon: ", {res});
        res.code = "success_create";
        //console.log("res_code",res.code);
        resolve(res);
      }
    );
  });
};

Pokemon.findTypelist = (IdTypeList) => {
  console.log(IdTypeList);
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
    sql.query(`SELECT * FROM listetype `, (err, res) => {
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
        console.log("res_code", err.code);
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
        console.log("res_code", err.code);
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
          console.log("res_code", res.code);
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
        console.log("res_code", err.code);
        return reject(err);
      }

      if (res.affectedRows == 0) {
        console.log("res_code", err.code);
        return reject(err);
      }
      res.code = "success_deletePokemon";
      console.log("res_code", res.code);
      resolve(res);
    });
  });
};

Pokemon.findByIdPokemon = (IdPokemon) => {
  return new Promise((resolve, reject) => {
    var copyPokemon = [];
    sql.query("SELECT * FROM Pokemon WHERE ID = ?", IdPokemon, (err, res) => {
      if (err) {
        console.log("res_code", err.code);
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
          console.log("res_code", res2.code);
          findPokemon[0].TypeInfo = res2;
          console.log(findPokemon);
          resolve(findPokemon);
        }
      );
    });
  });
};
/*

User.findByEmail = (user) => {
    return new Promise((resolve,reject) => { 
        sql.query(`SELECT * FROM User WHERE Email = ? AND Mdp = ?`,[user.Email,user.Mdp], (err, res) => {
        if (err) {
            console.log("res_code",err.code);
            return reject(err);
        }
        res.code='success_findByEmail';
        console.log("res_code",res.code);
        res.ID= res[0].ID;
        resolve(res)
    });
});
};

    User.updateById = (id, User) => {
        return new Promise((resolve,reject) => { 
            sql.query(
                "UPDATE User SET Email = ?, Mdp = MD5(?), Pseudo = ? WHERE id = ?",
                [User.Email, User.Mdp, User.Pseudo, id],(err, res) => {
                if (err) {
                    console.log("res_code",err.code);
                    return reject(err);
                }
                if(res.changedRows < 1 && res.affectedRows < 1){
                    res.code='error_update';
                    console.log("res_code",res.code);
                    return reject(res);
                }
                if(res.changedRows < 1 && res.affectedRows > 0){
                    res.code='error_sameData';
                    console.log("res_code",res.code);
                    return reject(res);
                }
                res.code='success_updateByID';
                console.log("res_code",res.code);
                console.log(res)
                resolve(res)

            });
    });
};




User.updateEmailById = (id,Email) => {
    return new Promise((resolve,reject) => { 
        sql.query(
            "UPDATE User SET Email = ? WHERE id = ?",
            [Email,id],(err, res) => {
            if (err) {
                console.log("res_code",err);
                return reject(err);
            }
            /*if(res.changedRows < 1 && res.affectedRows < 1){
                res.code='error_update';
                console.log("res_code",res);
                return reject(res);
            }
            if(res.changedRows < 1 && res.affectedRows > 0){
                res.code='error_sameData';
                console.log("res_code",res.code);
                return reject(res);
            }
            res.code='success_updateLogByID';
            console.log("res_code",res.code);
            console.log(res)
            resolve(res)
        });
});
};

User.updatePseudoById = (id,Pseudo) => {
    return new Promise((resolve,reject) => { 
        sql.query(
            "UPDATE User SET Pseudo = ? WHERE id = ?",
            [Pseudo,id],(err, res) => {
            if (err) {
                console.log("res_code",err);
                return reject(err);
            }
            /*if(res.changedRows < 1 && res.affectedRows < 1){
                res.code='error_update';
                console.log("res_code",res);
                return reject(res);
            }
            if(res.changedRows < 1 && res.affectedRows > 0){
                res.code='error_sameData';
                console.log("res_code",res.code);
                return reject(res);
            }
            res.code='success_updatePseudoByID';
            console.log("res_code",res.code);
            console.log(res)
            resolve(res)
        });
});
};

    User.getAll = () => {
        return new Promise((resolve,reject) => { 
            sql.query("SELECT * FROM User", (err, res) => {
                if (err) {
                    console.log("res_code",err.code);
                    return reject(err);
                }
                res.code='success_getAll';
                console.log("res_code",res.code);
                console.log(res)
                resolve(res)
            });
        });
};

    User.removeById = (id, result) => {
        sql.query("DELETE FROM User WHERE id = ?", id, (err, res) => {
            if (err) {
            console.log("error: ", err);
            return;
            }

            if (res.affectedRows == 0) {
            return;
            }

            console.log("deleted User with id: ", id);
        });
    };

    User.removeAll = (result) => {
        sql.query("DELETE FROM User", (err, res) => {
            if (err) {
            console.log("error: ", err);
            return;
            }

            console.log(`deleted ${res.affectedRows} Users`);
        });
    };
*/
module.exports = Pokemon;
