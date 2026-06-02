const jwt = require("jsonwebtoken");

function auth(req, res, next) {

    console.log("HEADERS:");
    console.log(req.headers);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log("SEM TOKEN");
        return res.status(401).json({
            msg: "Token não informado"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("TOKEN DECODIFICADO:");
        console.log(decoded);

        req.user = decoded;

        next();

    } catch (err) {

        console.log("ERRO JWT:");
        console.log(err);

        return res.status(401).json({
            msg: "Token inválido"
        });
    }
}

module.exports = auth;