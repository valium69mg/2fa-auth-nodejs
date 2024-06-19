const User = require('../models/User.js');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {genToken} = require('../tokenGen.js');

module.exports.signup_get = async (req,res) => {
    res.render("signup.ejs");
}

module.exports.signup_post = async (req,res) => {
    const {mail,password} = req.body; 
    // HASHING PASSWORDS
    bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS), async function(err, hash) {
        let token = genToken();
        const createUser = await User.createUser(mail,hash,token);
        if (createUser instanceof Error) {
            res.status(400).json({error: 'Oops, something went wrong'}); 
        } else {
            res.status(201).redirect('/');
        }
        
    });  
}

module.exports.login_get = async (req,res) => {
    res.render('login.ejs');
}
module.exports.login_post = async (req,res) => {
    const {mail,password} = req.body; 
    const userHash = await User.getUserHash(mail);
    if (userHash instanceof Function) {
        res.redirect('/');
    }
    bcrypt.compare(password, userHash, function(err, result) {
        // BAD PASSWORD
        if (result === false) {res.render('login.ejs')}
        else {
            const token = jwt.sign(mail,process.env.MY_SECRET);
            res.cookie("token",token,{
                httpOnly: true,
            });   
            res.redirect('/');
        }  
            
    });
};

module.exports.logout_get = async (req,res) => {
    res.clearCookie("token").redirect("/");
};
