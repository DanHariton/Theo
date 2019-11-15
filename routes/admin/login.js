let express = require('express');
let bcrypt = require('bcryptjs');
let router = express.Router();
let database = require('../../bin/library/Database');
const SessionAdmin = require('../../bin/classes/SessionAdmin');

router.post('/logging', function (req, res) {
    console.log(req.body);
    if (req.body.adminLogin) {
        database.query("SELECT id, login, password, name  FROM theoSalePage.user_admin WHERE login = " + "'" + req.body.adminLogin + "'")
            .then(function (rows) {
                if (rows.length === 1 && bcrypt.compareSync(req.body.password, rows[0].password)) {
                    req.session.adminDetail = new SessionAdmin(rows[0].id, rows[0].login, rows[0].name);
                    console.log('admin - ', req.session.adminDetail);
                    res.redirect('/admin');
                } else {
                    req.session.erorrAdminLogin = 'wrongUserLogin';
                    res.redirect('/admin/login');
                }
            })
            .catch(err => {
                console.log('Login' + err);
            });
    }
});

/* GET users listing. */
router.get('/', function(req, res) {
    console.log('tut');
    let errorAdminLogin = null;

    if (req.session.erorrAdminLogin !== undefined) {
        errorAdminLogin = 'Email or password is wrong.';
        req.session.erorrAdminLogin = undefined;
    }

    res.render('./admin/adminLogin', { variable: 'Sign in', errorAdminLogin: errorAdminLogin});
});


module.exports = router;