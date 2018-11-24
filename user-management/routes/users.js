let express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const log = require('../../logger');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('login',
        async (err, user) => {

            if (err || !user) {
                log.error('LOGIN router', 'Name or Password incorrect');
                return next('Name or Password incorrect');
            }

            req.login(user, {session: false}, async (err) => {
                log.info('LOGIN router login', {user});

                if (err) {
                    log.error('LOGIN router login', 'something wrong');
                    return next(err);
                }
                const token = jwt.sign({name: user.name, _id: user._id}, 'secret');
                return res.json({token});
            })
        })(req, res, next);
});

router.post('/signup', passport.authenticate('signup', { session : false}), async (req, res) => {
    res.json({
        massage: 'Signup successful',
        user: req.body,
    });
});

module.exports = router;

