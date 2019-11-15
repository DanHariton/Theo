let express = require('express');
let router = express.Router();

/* authorization here */
router.get('*', function(req, res, next) {
    console.log('here');
    if (req.session.adminDetail === undefined) {
        res.redirect('/admin/login');
    } else {
        next();
    }
});

module.exports = router;
