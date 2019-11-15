let express = require('express');
let router = express.Router();
let database = require('../../bin/library/Database');
const CustomerWall = require('../../bin/classes/CustomerWall');

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('./admin/adminPanel', { adminName: req.session.adminDetail.name});
});

router.get('/logout', function (req, res) {
    req.session.adminDetail = undefined;
    res.redirect('/admin/login');
});

router.get('/send-newsletter', function (req, res) {
    res.render('./admin/newsletter');
});

router.get('/statistics', function (req, res) {
    res.render('./admin/statistics');
});


module.exports = router;