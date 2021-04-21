
module.exports = (req, res, next) => {
const jwt = require('jsonwebtoken');
        try {
            const token = req.headers.authorization.split(' ')[1];
            const ID = req.headers.authorization.split(' ')[2];
            jwt.verify(token, '79YxSPNj398Exnrc48qZ',(err,decoded) => {
                if(err){
                    localStorage.clear();
                    console.log('error')
                    throw 'Token invalid';
                }
            });
            const decodedToken = jwt.verify(token, '79YxSPNj398Exnrc48qZ');
            const userId = decodedToken.userId;
            if (ID && ID != userId) {
                throw 'Invalid user ID';
            } else {
            next();
            }
        } catch {
            console.log(res);
            res.status(401).send('Invalid request!');
        }
};

