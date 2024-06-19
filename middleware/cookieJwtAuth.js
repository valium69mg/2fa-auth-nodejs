const jwt = require("jsonwebtoken");

exports.validateJwt = (req,res,next) => {
    const token = req.cookies.token;

    try {
        const mail = jwt.verify(token,process.env.MY_SECRET);
        req.mail = mail;
        next();
    }catch(err) {
        res.clearCookie("token");
        res.redirect("auth/login");
    }
};