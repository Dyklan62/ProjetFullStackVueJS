const sql = require("./Db.connection");

//fonction controler pour user
const User = function (user) {
    this.ID = user.ID;
    this.email = user.email;
    this.Pseudo = user.Pseudo;
    this.token = user.token;
};

    User.create = (newUser) => {
        return new Promise((resolve,reject) => { 
            sql.query("INSERT INTO User(Email,Mdp,Pseudo) VALUES (?,?,?)", [newUser.Email, newUser.Mdp, newUser.Pseudo], (err, res) => {
                if (err) {
                    
                    return reject(err)
                }
                res.code='success_create'
                resolve(res)
            });
        });
    };

    User.LogIn = (user) => {
        return new Promise((resolve,reject) => { 
            sql.query(`SELECT * FROM User WHERE Email = ? AND Mdp = ?`,[user.Email,user.Mdp] ,(err, res) => {
                if (err) {
                    return reject(err);
                }
                else if(res == ''){
                    res.code='error_login';
                    return reject(res);
                }
                res.ID= res[0].ID;
                resolve(res)
            });
        });
    };

    User.findById = (UserId) => {
        return new Promise((resolve,reject) => { 
            sql.query(`SELECT * FROM User WHERE ID = ${UserId}`, (err, res) => {
            if (err) {
                
                return reject(err);
            }
            res.code='success_findById';
            res.Email= res[0].Email;
            res.Pseudo= res[0].Pseudo;
            resolve(res)
        });
    });
};


User.findByEmail = (user) => {
    return new Promise((resolve,reject) => { 
        sql.query(`SELECT * FROM User WHERE Email = ? AND Mdp = ?`,[user.Email,user.Mdp], (err, res) => {
        if (err) {
            
            return reject(err);
        }
        res.code='success_findByEmail';
        
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
                    
                    return reject(err);
                }
                if(res.changedRows < 1 && res.affectedRows < 1){
                    res.code='error_update';
                    
                    return reject(res);
                }
                if(res.changedRows < 1 && res.affectedRows > 0){
                    res.code='error_sameData';
                    
                    return reject(res);
                }
                res.code='success_updateByID';
                
                
                resolve(res)

            });
    });
};

User.updateMdpById = (id,OldMdp, Mdp) => {
    return new Promise((resolve,reject) => { 
        sql.query(
            "UPDATE User SET Mdp = ? WHERE id = ? AND Mdp = ?",
            [Mdp,id,OldMdp],(err, res) => {
            if (err) {
                err.code = 'test'
                
                return reject(err);
            }
            res.code='success_updateMdpByID';
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
                return reject(err);
            }
            res.code='success_updateLogByID';
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
                return reject(err);
            }
            res.code='success_updatePseudoByID';
            resolve(res)
        });
});
};

    User.getAll = () => {
        return new Promise((resolve,reject) => { 
            sql.query("SELECT * FROM User", (err, res) => {
                if (err) {
                    
                    return reject(err);
                }
                res.code='success_getAll';
                resolve(res)
            });
        });
};

module.exports = User;
