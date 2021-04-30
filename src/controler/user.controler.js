        const User = require("../DB/Db.User.controler");
        const jwt = require('jsonwebtoken');

//requetes bdd user
        exports.routecreate = (req, res) => {
            var newUser = {
                Email : req.body.Email,
                Mdp : req.body.Mdp,
                Pseudo : req.body.Pseudo,
            }
            return User
            .create(newUser)
            .then((result) => res.status(201).send(result.code))
            .catch((err) => {
            if(err.code == 'ER_DUP_ENTRY'){
                res.status(409).send(err);
            }else{
            res.status(500).send(err)}
        });
    };

    exports.routelogin = (req, res) => {
            var user = {
                Email : req.body.Email,
                Mdp : req.body.Mdp,
            };
            User
            .LogIn(user)
            .then(result => {
                res.status(200).json({
                userId: result.ID,
                token: jwt.sign(
                    { userId: result.ID },
                    '79YxSPNj398Exnrc48qZ',
                    { expiresIn: '24h' })
                })
            })
            .catch((err) =>{
                if(err.code == 'error_login'){
                    res.status(422).send(err);
                }else{
                res.status(500).send(err)}
            });
    };

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

    exports.routeupdatePseudoById = (req, res) => {
        if(!req.body.Pseudo) throw 'erreur pseudo vide';
        return User
        .updatePseudoById(req.body.userId,req.body.Pseudo)
        .then((result) => res.send(result.code))
        .catch((err) => res.status(500).send(err.code));
    };

    
    exports.routefindById = (req, res) => {
            return User
            .findById(req.params.userID)
            .then((result) => res.status(200).send(result.code))
            .catch((err) => res.status(500).send(err.code));
    };

    exports.routeufindAccountById = (req, res) => {
        return User
        .findById(req.body.userID)
        .then((result) => {
            res.status(200).json({
                Email: result.Email,
                Pseudo : result.Pseudo,
            })
        })
        .catch((err) => res.status(500).send(err.code));
};

    exports.routefindByEmail = (req, res) => {
        var user = {
            Email : req.body.Email,
            Mdp : req.body.Mdp,
        };
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
