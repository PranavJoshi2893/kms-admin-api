const { registration, login } = require('./user_controller');

const router = require('express').Router();

router
    .route('/register')
    .post(registration)

router
    .route('/login')
    .post(login)

module.exports = router;