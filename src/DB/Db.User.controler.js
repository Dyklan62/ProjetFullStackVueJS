const sql = require("./Db.connection");

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
                    console.log("res_code",err.code);
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
                console.log("login User: ", res);
                res.ID= res[0].ID;
                console.log("res_ID",res.ID);
                resolve(res)
            });
        });
    };

    User.findById = (UserId) => {
        return new Promise((resolve,reject) => { 
            sql.query(`SELECT * FROM User WHERE ID = ${UserId}`, (err, res) => {
            if (err) {
                console.log("res_code",err.code);
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

User.updateMdpById = (id,OldMdp, Mdp) => {
    return new Promise((resolve,reject) => { 
        sql.query(
            "UPDATE User SET Mdp = ? WHERE id = ? AND Mdp = ?",
            [Mdp,id,OldMdp],(err, res) => {
            if (err) {
                err.code = 'test'
                console.log("res_code",err.code);
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
            }*/
            res.code='success_updateMdpByID';
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
            }*/
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
            }*/
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

module.exports = User;
