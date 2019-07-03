var express = require('express');
var router = express.Router();
import Login from '../controller/login/login'

/* GET users listing. */
router.get('/login', Login.login);
router.post('/register', Login.register);

export default router;
