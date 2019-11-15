let express = require('express');
let router = express.Router();
let database = require('../bin/library/Database');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Theo' });
});

router.post('/form-sending-t1', function (req, res, next) {
  if (req.body !== undefined) {
    console.log(req.body);
    saveCustomerToDB(req, res);
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});

function saveCustomerToDB(req, res, callback = null) {

  let sending_email = 0;
  let customer_comment = null;

  if (req.body.sending_email === 'on') {
    sending_email = 1;
  }
  
  if (req.body.user_comment !== undefined) {
    customer_comment = req.body.user_comment;
  }

  database.query("INSERT INTO\n" +
      "     theoSalePage.tier1_customers (`name`, `email`, `town`, `mobile`, `comment`, `sending_email`, `user_type`) \n" +
      "     VALUES ('" + req.body.user_name + "', '" + req.body.user_email + "', '" + req.body.user_town +
      "', '" + req.body.user_phone + "', '" + customer_comment + "', " + sending_email + ", 'T1');")
      .then(function (rows) {
          console.log(rows);
      })
      .catch(err => {
        console.log('Search User Prod' + err);
      });
}

module.exports = router;
