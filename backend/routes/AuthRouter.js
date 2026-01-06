 const{login}= require('../controllers/AuthController');
const { signup } = require('../controllers/AuthController');
const { signupValidation } = require('../middlewares/AuthValidation');
const { loginValidation } = require('../middlewares/AuthValidation');
const router = require('express').Router();

  

router.post('/login', loginValidation,login);
router.post('/signup', signupValidation, signup);

module.exports = router;   