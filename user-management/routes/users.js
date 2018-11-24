let express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', async (req, res, next) => {
    console.log('LOGIN');
    passport.authenticate('local',
        async (err, user) => {
            if (err) {
                const error = new Error('An Error occurred');
                return next(error);
            }
            if (!user) {
                const error = new Error('User ' + req.body.name + ' not found');
                return next(error);
            }

            req.login(user, {session: false}, async (error) => {
                if (error) return next(error);

                const token = jwt.sign({name: user.name, _id: user._id}, 'secrettt');

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

