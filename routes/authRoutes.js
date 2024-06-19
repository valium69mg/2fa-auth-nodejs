const {Router} = require('express');
const authController = require('../controllers/authController.js');
const router = Router();
//auth routes

//signup get
router.get('/signup',authController.signup_get);
//signup post
router.post('/signup', authController.signup_post);
//login get
router.get('/login', authController.login_get);
//login post
router.post('/login', authController.login_post);
//logout get
router.get('/logout', authController.logout_get);

module.exports = router;