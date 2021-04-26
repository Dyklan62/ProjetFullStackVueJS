
module.exports = (req, res, next) => {
const jwt = require('jsonwebtoken');
        try {
            const token = req.headers.authorization.split(' ')[1];
            const ID = req.headers.authorization.split(' ')[2];
            const decodedToken = jwt.verify(token, '79YxSPNj398Exnrc48qZ',(error,decoded) => {
                if(error){
                    throw 'Token invalid';
                }
                return decoded;
            });
            const userId = decodedToken.userId;
            if (ID && ID == userId) {
                next();
            } else {
                throw 'Invalid user ID';
            }
        } catch(error) {
            res.status(401).send(error);
        }
};

