const { verifyJwt } = require("../../libs/utils");


const Middleware = (req, res, next) => {

    try {
        

        const jwtData = verifyJwt(req.headers.authorization);
        req.jwtData = jwtData;
       

      
        next();
    } catch (error) {
        res.status(401).json({
            message: "No se encuetra autenticado",

        });
    }
};

module.exports = Middleware;