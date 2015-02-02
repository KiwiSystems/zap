// Author: Katharine Xiao

var express = require('express');
var router = express.Router();
var User = require('../data/user.js').User;
var utils = require('../utils/utils');

/*
    GET /
    Redirects to test page
*/
router.get('/', function(req, res) {
    res.sendSuccessResponse(res, {})
});

//------------------
// Authentication
//------------------
/*
    POST /login
    Request body:
        - content: username and password fields of a user
    Response:
        - success: true if the server successfully logged in a user
        - err: on failure, an error message
 */
router.post('/login',
    function(req, res, next) {
        if (req.session.user) {
            return utils.sendErrResponse(res, 403, 'There is already a user logged in.');
        }
        if (!(req.body.username && req.body.password)) {
            return utils.sendErrResponse(res, 400, 'Username or password not provided.');
        }
        User.findOne({
            username: req.body.username
        }, function(err, user) {
            if (err) return utils.sendErrResponse(res, 500, 'An unknown error occurred.');
            if (user) {
                if (user.password === req.body.password) {
                    //req.session.user = user._id;
                    delete user.password
                    req.session.user = {
                        username: user.username,
                        id: user._id
                    };
                    return utils.sendSuccessResponse(res, {user: user});
                } else {
                    // wrong password
                    return utils.sendErrResponse(res, 400, 'Invalid username or password!');
                }
            } else {
                // username does not exist
                return utils.sendErrResponse(res, 400, 'Invalid username or password!');
            }
        });
    });

/*
  POST /logout
  Request body: empty
  Response:
    - success: true if logout succeeded; false otherwise
    - err: on error, an error message
*/
router.post('/logout', function(req, res) {
    if (req.session.user) {
        //delete req.session.user;
        //req.session.user = undefined;
        req.session.destroy();
        utils.sendSuccessResponse(res);
    } else {
        utils.sendErrResponse(res, 403, 'There is no user currently logged in.');
    }
});

module.exports = router;
