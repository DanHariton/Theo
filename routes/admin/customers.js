let express = require('express');
let router = express.Router();
let database = require('../../bin/library/Database');
const Customer = require('../../bin/classes/Customer');

router.get('/tier1', function (req, res) {
    database.query("SELECT *  FROM theoSalePage.tier1_customers")
        .then(function (rows) {
            req.session.customers = [];
            if ((rows.length | 0) >= 1) {
                for (let n = 0; n < rows.length; n++) {
                    req.session.customers.push(new Customer(rows[n].id, rows[n].name, rows[n].email, rows[n].town, rows[n].mobile,
                        rows[n].comment, rows[n].sending_email));
                }
                console.log(req.session.customers);
            } else {
                req.session.customers.push(rows[0].id = '-', rows[0].name = '-', rows[0].email = '-',
                    rows[0].town = '-', rows[0].mobile = '-', rows[0].comment = '-', rows[0].sending_email = '-');
            }
            res.render('./admin/customers/tier1', { customers: req.session.customers});
        })
        .catch(err => {
            console.log('Customers' + err);
        });
});

router.get('/end-users', function (req, res) {
    database.query("SELECT *  FROM theoSalePage.end_customers")
        .then(function (rows) {
            req.session.customers = [];
            if ((rows.length | 0) >= 1) {
                for (let n = 0; n < rows.length; n++) {
                    req.session.customers.push(new Customer(rows[n].id, rows[n].name, rows[n].email, rows[n].town, rows[n].mobile,
                        rows[n].comment, rows[n].sending_email));
                }
                console.log(req.session.customers);
            } else {
                req.session.customers.push(rows[0].id = '-', rows[0].name = '-', rows[0].email = '-',
                    rows[0].town = '-', rows[0].mobile = '-', rows[0].comment = '-', rows[0].sending_email = '-');
            }
            res.render('./admin/customers/end-users', { customers: req.session.customers});
        })
        .catch(err => {
            console.log('Customers' + err);
        });
});

module.exports = router;