let express = require('express');
let router = express.Router();
let database = require('../../bin/library/Database');
const CustomerWall = require('../../bin/classes/CustomerWall');


router.get('/add-users', function (req, res) {

    let customersWallT1 = [];
    let customersWallEndUsr = [];

    let queryForT1User = "SELECT" +
        " t1User.id, t1User.name, t1User.town, t1User.comment, t1User.user_type\n" +
        "FROM\n" +
        "     theoSalePage.tier1_customers AS t1User\n" +
        "WHERE\n" +
        "t1User.wall_of_fame != 1";

    let queryForEndUsr = "SELECT" +
        " endCustomers.id, endCustomers.name, endCustomers.town, endCustomers.comment, endCustomers.user_type\n" +
        "FROM\n" +
        "     theoSalePage.end_customers AS endCustomers\n" +
        "WHERE\n" +
        "     endCustomers.wall_of_fame != 1";

    database.query(queryForT1User)
        .then(function (rows) {
            if ((rows.length | 0) >= 1) {
                for (let n = 0; n < rows.length; n++) {
                    customersWallT1.push(new CustomerWall(rows[n].id, rows[n].name, rows[n].town,
                        rows[n].comment, rows[n].user_type));
                }
            } else {
                customersWallT1.push(rows[0].id = '-', rows[0].name = '-',
                    rows[0].town = '-', rows[0].comment = '-', rows[0].user_type = '-');
            }

            database.query(queryForEndUsr)
                .then(function (rows) {
                    if ((rows.length | 0) >= 1) {
                        for (let i = 0; i < rows.length; i++) {
                            customersWallEndUsr.push(new CustomerWall(rows[i].id, rows[i].name, rows[i].town,
                                rows[i].comment, rows[i].user_type));
                        }
                    } else {
                        customersWallEndUsr.push(rows[0].id = '-', rows[0].name = '-',
                            rows[0].town = '-', rows[0].comment = '-', rows[0].user_type = '-');
                    }
                    res.render('./admin/wallOfFame/wallAddUsers', {customersT: customersWallT1, customersEndUsr: customersWallEndUsr});
                })
                .catch(err => {
                    console.log('Customers EndUsr Wall: ' + err);
                });
        })
        .catch(err => {
            console.log('Customers T1 Wall: ' + err);
        });
});

router.get('/change-user', function (req, res) {
    //решить проблему с определением типа юзера
    console.log('user-type - ', req.query.userType);
    if (req.query.userType === 't1') {
        getUserByIdAndType(Number(req.query.userId), 'tier1', res);
    } else {
        getUserByIdAndType(Number(req.query.userId), 'endUser', res);
    }
});

router.get('/addUserToWall', function (req, res) {
    let queryAddUser = null;

    if (req.query.userType === 't1') {
        queryAddUser = "UPDATE theoSalePage.tier1_customers\n" +
            "SET " +
            "     tier1_customers.wall_of_fame = 1, \n" +
            "     tier1_customers.name = '" + req.query.userName + "', \n" +
            "     tier1_customers.town = '" + req.query.userTown + "', \n" +
            "     tier1_customers.comment = '" + req.query.userComment + "' \n" +
            "WHERE\n" +
            "     tier1_customers.id = " + Number(req.query.userId);
    } else {
        queryAddUser = "UPDATE theoSalePage.end_customers\n" +
            "SET " +
            "     end_customers.wall_of_fame = 1, \n" +
            "     end_customers.name = '" + req.query.userName + "', \n" +
            "     end_customers.town = '" + req.query.userTown + "', \n" +
            "     end_customers.comment = '" + req.query.userComment + "' \n" +
            "WHERE\n" +
            "     end_customers.id = " + Number(req.query.userId);
    }

    database.query(queryAddUser)
        .then(function (rows) {
            console.log(rows);
            res.redirect('/admin/wall-of-fame/add-users');
        })
        .catch(err => {
            console.log('Save User to DB Wall: ' + err);
        });
});

router.get('/change-users', function (req, res) {

    let usersOnWall = [];
    let queryForT1User = "SELECT" +
        " t1User.id, t1User.name, t1User.town, t1User.comment, t1User.user_type\n" +
        "FROM\n" +
        "     theoSalePage.tier1_customers AS t1User\n" +
        "WHERE\n" +
        "t1User.wall_of_fame != 0";
    let queryForEndUsr = "SELECT" +
        " endCustomers.id, endCustomers.name, endCustomers.town, endCustomers.comment, endCustomers.user_type\n" +
        "FROM\n" +
        "     theoSalePage.end_customers AS endCustomers\n" +
        "WHERE\n" +
        "     endCustomers.wall_of_fame != 0";

    database.query(queryForT1User)
        .then(function (rows) {
            if (rows.length >= 1) {
                for (let n = 0; n < rows.length; n++) {
                    usersOnWall.push(new CustomerWall(rows[n].id, rows[n].name, rows[n].town,
                        rows[n].comment, rows[n].user_type));
                }
            }

            database.query(queryForEndUsr)
                .then(function (rows) {
                    if (rows.length >= 1) {
                        for (let i = 0; i < rows.length; i++) {
                            usersOnWall.push(new CustomerWall(rows[i].id, rows[i].name, rows[i].town,
                                rows[i].comment, rows[i].user_type));
                        }
                    }

                    res.render('./admin/wallOfFame/usersOnWall', {customers: usersOnWall});
                })
                .catch(err => {
                    console.log('Customers EndUsr ON Wall: ' + err);
                });
        })
        .catch(err => {
            console.log('Customers T1 ON Wall: ' + err);
        });
});

function getUserByIdAndType(id, type, res) {
    let queryUser = null;
    let userInfo = null;

    if (type === 'tier1') {
        queryUser = "SELECT " +
            "   t1User.id, t1User.name, t1User.town, t1User.comment, t1User.user_type\n " +
            "FROM \n" +
            "   theoSalePage.tier1_customers AS t1User \n" +
            "WHERE \n" +
            "   t1User.id = " + id;
    } else {
        queryUser = "SELECT " +
            "   endCustomers.id, endCustomers.name, endCustomers.town, endCustomers.comment, endCustomers.user_type\n " +
            "FROM \n" +
            "   theoSalePage.end_customers AS endCustomers \n" +
            "WHERE \n" +
            "   endCustomers.id = " + id;
    }

    database.query(queryUser)
        .then(function (rows) {
            if ((rows.length | 0) >= 1) {
                userInfo = new CustomerWall(rows[0].id, rows[0].name, rows[0].town, rows[0].comment, rows[0].user_type);
            } else {
                userInfo = 'userNotFound';
            }

            res.render('./admin/wallOfFame/wallChangeUsers', {userInfo: userInfo});
        })
        .catch(err => {
            console.log('User Detail: ' + err);
        });
}


module.exports = router;