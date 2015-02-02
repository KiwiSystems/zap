// Authors: Katharine Xiao (tests 1, 3, and 4) and Aaron Suarez (test 2, qunit set up)
$(document).ready(function() {
    main();

    function main() {
        /*
            Test case 1: Testing User creation, udpate, deletion, and authentication
        */
        test("testing user creation, update, deletion, and authentication", function() {
            var username = 'kjx';
            var password = 'test';
            var updatedUsername = 'kat'; // Should not update
            var updatedPassword = 'hello';

            clearDatabase();
            // Create a new user
            createUser(username, password, password);
            // Get all users
            var users = getUsers();
            equal(users.length, 1, 'Expect exactly one user from the users get request.');
            var userID = users[0]._id;
            // Get user by Id
            var user = getUser(userID);
            equal(user.username, username, 'Confirm username of newly created user.');
            equal(user.password, password, 'Confirm password of newly created user.');

            logInUser(username, password);
            var response = getCurrentUser();
            console.log(response);
            equal(response.user.id, userID, 'Expect current user to be the one that just logged in.')

            var err = logInUser(username, password);
            equal(JSON.parse(err.responseText).err, 'There is already a user logged in.', 'Expect 403 error because there is already a user logged in.');

            // Update user password
            updateUser(userID, username, updatedPassword);
            // Check that password was successfully updated
            var updatedUser = getUser(userID);
            equal(updatedUser.username, username, 'Username should not change in update.');
            equal(updatedUser.password, updatedPassword, 'Correct updated password.');
            // Try and update username
            updateUser(userID, updatedUsername, updatedPassword);
            var updatedUser = getUser(userID);
            equal(updatedUser.username, username, 'Username should not change in update.');
            equal(updatedUser.password, updatedPassword, 'Expect password to be unchanged.');

            // Log out
            logOutUser();
            var err = updateUser(userID, updatedUsername, updatedPassword);
            equal(JSON.parse(err.responseText).err, 'Access denied!', 'Should not have access to update function if user is not logged in.');

            // Log back in
            logInUser(username, updatedPassword);

            // Delete user by id
            deleteUser(userID);

            // User no longer exists
            err = getUser(userID);
            equal(JSON.parse(err.responseText).err, 'Resource not found.', 'Expect 404 error because user no longer exists');

            err = createSet('test', []);
            equal(JSON.parse(err.responseText).err, 'Access denied!', 'Should not have access to set creation function if user is not logged in.');

            err = logOutUser();
            equal(JSON.parse(err.responseText).err, 'There is no user currently logged in.', 'After user deletion, user is no longer logged in.');


        });

        /*
            Test case 2: Testing Dancer creation, update, and deletion
        */
        test("testing dancer creation, update, and deletion", function() {
            var username = 'suarez';
            var password = 'test';
            clearDatabase();
            createUser(username, password, password);
            logInUser(username, password);

            // Create a new dancer
            createDancer('N7', 5, 5, 0);
            // Get all dancers
            var dancer = getDancers().content.dancers;
            equal(dancer.length, 1, 'Correct number of dancers');
            // Update a position in the dancer's path
            updateDancerPosition(dancer[0]._id, 0, 25, 25);
            var dancer = getDancer(dancer[0]._id).content[0];
            equal(dancer.path[0].x, 25, 'Correctly updated x coordinates');
            equal(dancer.path[0].y, 25, 'Correctly updated y coordinates');
            // Append new position to dancer's path
            appendDancerPosition(dancer._id, 0, 22, 22);
            var dancer = getDancer(dancer._id).content[0];
            equal(dancer.path.length, 2, 'Correctly added position to path');
            // Delete a dancer
            deleteDancer(dancer._id);
            equal(getDancer(dancer._id).responseJSON.err, "Resource not found.", 'Successfully deleted dancer');
            // Create a dancer on the second formation
            createDancer('A6', 4, 7, 1);
            var dancers = getDancers().content.dancers;
            equal(dancers.length, 1, 'Correct number of dancers');
            var dancer = getDancer(dancers[0]._id).content[0];
            // equal(dancer.path[0].x, 0, 'Correctly padded x coordinates');
            // equal(dancer.path[0].y, 0, 'Correctly padded y coordinates');
            equal(dancer.path[1].x, 4, 'Correctly set x coordinates');
            equal(dancer.path[1].y, 7, 'Correctly set y coordinates');

            logOutUser();
        });

        /*
            Test case 3: Testing Set creation, update, and deletion, as well as interaction between Dancers and Sets
        */
        test("testing set creation, update, and deletion", function() {
            var username = 'kjx';
            var password = 'test';

            clearDatabase();
            createUser(username, password, password);

            // Get all users
            var users = getUsers();
            equal(users.length, 1, 'Expect exactly one user from the users get request.');
            var userID = users[0]._id;
            logInUser(username, password);

            // Create a new set
            createSet('test', []);
            var sets = getSets();
            equal(sets.length, 1, 'Expect exactly one set from the sets get request');
            var setID = sets[0]._id;
            equal('test', sets[0].name, 'Except name attribute of set to be populated correctly.');

            // Create a new dancer
            createDancer('D5', 5, 5, 0, setID);
            // Get all dancers
            var dancer = getDancers().content.dancers;
            equal(dancer.length, 1, 'Correct number of dancers');
            var dancerID = dancer[0]._id;

            sets = getSets();
            equal(sets[0].dancers.length, 1, 'Expect set to now have one dancer.');
            equal(sets[0].dancers[0]._id, dancerID, 'Expect that dancer to be the one we just created.');

            // Delete a dancer
            deleteDancer(dancerID);
            equal(getDancer(dancerID).responseJSON.err, "Resource not found.", 'Successfully deleted dancer');

            sets = getSets();
            equal(sets[0].dancers.length, 0, 'Expect dancer to be successfully removed from set.');

            updateSet(setID, '1234', []);
            var setById = getSet(setID);
            equal(setById.user, userID, 'Expect creator of set to be unchanged.');

            deleteSet(setID);
            var err = getSet(setID);
            console.log(err);
            equal(JSON.parse(err.responseText).err, 'Resource not found.', 'Expect set to no longer exist.');
            sets = getSets();
            equal(sets.length, 0, 'Expect all sets to be deleted.');

            createSet('one', []);
            createSet('two', []);
            createSet('three', []);
            sets = getSets();
            equal(sets.length, 3, 'Expect exactly three sets from the sets get request');
            // test delete all sets
            deleteSets();
            sets = getSets();
            equal(sets.length, 0, 'Expect all sets to be deleted.');

            logOutUser();
        });

        /*
            Test case 4: Testing Share creation and deletion
        */
        test("testing share creation and deletion", function() {
            var username1 = 'user1';
            var password1 = 'foo';
            var username2 = 'user2';
            var password2 = 'bar';

            clearDatabase();
            createUser(username1, password1, password1);
            createUser(username2, password2, password2);

            var users = getUsers();
            equal(users.length, 2, 'Expect exactly two users from the users get request.');
            var userID1 = users[0]._id;
            var userID2 = users[1]._id;

            logInUser(username1, password1);

            createSet('test', []);
            var sets = getSets();
            equal(sets.length, 1, 'Expect exactly one set from the sets get request');
            var setID = sets[0]._id;

            createShare(userID2, setID);

            logOutUser();

            logInUser(username2, password2);
            var shares = getShares(userID2);
            var shareID = shares[0];

            equal(shares.length, 1, 'Expect exactly one set to be shared with User 2.');
            var sharedWithMe = getShare(userID2, shareID);
            equal(sharedWithMe.recipient, userID2, 'Expect User 2 to be able to view that share.');

            // Delete share
            deleteShare(userID2, shareID);
            shares = getShares(userID2);
            equal(shares.length, 0, 'Expect no more sets shared with User 2.');
            var err = getShare(userID2, shareID);
            equal(JSON.parse(err.responseText).err, 'Resource not found.', 'Expect 404 error, share no longer exists.');

            // Should not be able to share with self
            err = createShare(userID2, setID);
            equal(JSON.parse(err.responseText).err, 'Cannot share a set with yourself.', 'Expect 400 error, cannot share set with self.');
            // Should not be able to share another user's set
            err = createShare(userID1, setID);
            equal(JSON.parse(err.responseText).err, "Access denied!", "Expect 400 error, cannot share another user's set.");

            logOutUser();

            // Delete all shares to user
            logInUser(username1, password1);

            createSet('one', []);
            createSet('two', []);
            var sets = getSets();
            equal(sets.length, 3, 'Expect exactly three sets from the sets get request');
            var setID1 = sets[0]._id;
            var setID2 = sets[1]._id;

            createShare(userID2, setID1);
            createShare(userID2, setID2);
            logOutUser();

            logInUser(username2, password2);
            shares = getShares(userID2);
            equal(shares.length, 2, 'Expect exactly two sets to be shared with User 2.');

            deleteShares(userID2);
            shares = getShares(userID2);
            equal(shares.length, 0, 'Expect exactly zero sets to be shared with User 2 after deletion.');

            logOutUser();


        });
    }

    // -----------------------------------------------------s
    //   Helper functions
    // -----------------------------------------------------
    function clearDatabase() {
        var out;
        $.ajax({
            type: 'DELETE',
            url: '/',
            async: false,
            success: function(data) {},
            error: function(err) {
                out = err;
            }
        });
        return out;
    }

    // -----------------------------------------------------
    //   Dancer helper functions
    // -----------------------------------------------------
    function createDancer(name, x, y, index, setId) {
        var out;
        $.ajax({
            type: 'POST',
            data: {
                name: name,
                x: x,
                y: y,
                index: index,
                set_id: setId,
            },
            url: '/dancers/',
            async: false,
            success: function(data) {
                out = data;
            },
            error: function(err) {
                out = err
            }
        });
        return out;
    }

    function getDancers() {
        var out;
        $.ajax({
            type: 'GET',
            url: '/dancers/',
            async: false,
            success: function(data) {
                out = data;
            },
            error: function(err) {
                out = err;
            }
        });
        return out;
    }

    function getDancer(id) {
        var out;
        $.ajax({
            type: 'GET',
            url: '/dancers/' + id,
            async: false,
            success: function(data) {
                out = data;
            },
            error: function(err) {
                out = err;
            }
        });
        return out;
    }

    function updateDancerPosition(id, index, x, y) {
        var out;
        $.ajax({
            type: 'PUT',
            data: {
                index: index,
                x: x,
                y: y
            },
            url: '/dancers/' + id,
            async: false,
            success: function(data) {
                out = data;
            },
            error: function(err) {
                out = err;
            }
        });
        return out;
    }

    function appendDancerPosition(id, index, x, y) {
        var out;
        $.ajax({
            type: 'PUT',
            data: {
                index: index,
                x: x,
                y: y
            },
            url: '/dancers/' + id + '?action=append',
            async: false,
            success: function(data) {
                out = data;
            },
            error: function(err) {
                out = err;
            }
        });
        return out;
    }

    function deleteDancer(id) {
        var out;
        $.ajax({
            type: 'DELETE',
            url: '/dancers/' + id,
            async: false,
            success: function(data) {
                out = data;
            },
            error: function(err) {
                out = err;
            }
        });
        return out;
    }

    // -----------------------------------------------------
    //   User helper functions
    // -----------------------------------------------------

    function createUser(name, password, confirm_password) {
        var out;

        $.ajax({
            type: 'POST',
            data: {
                username: name,
                password: password,
                confirm_password: confirm_password
            },
            url: '/users/',
            async: false,
            success: function(data) {
                out = data;
            },
            error: function(err) {
                out = err;
            }
        });

        return out;
    }

    function getUsers() {
        var out;

        $.ajax({
            type: 'GET',
            url: '/users/',
            async: false,
            success: function(data) {
                out = data.content.users;
            },
            error: function(err) {
                out = err;
            }
        });

        return out;
    }

    function getUser(id) {
        var out;
        $.ajax({
            type: 'GET',
            url: '/users/' + id,
            async: false,
            success: function(data) {
                out = data.content;
            },
            error: function(err) {
                out = err;
            }
        });
        return out;
    }

    function updateUser(id, username, password) {
        var out;
        $.ajax({
            type: 'PUT',
            data: {
                username: name,
                password: password
            },
            url: '/users/' + id,
            async: false,
            success: function(data) {
                out = data;
            },
            error: function(err) {
                out = err;
            }
        });
        return out;
    }

    function deleteUser(id) {
        var out;
        $.ajax({
            type: 'DELETE',
            url: '/users/' + id,
            async: false,
            success: function(data) {
                out = data;
            },
            error: function(err) {
                out = err;
            }
        });
        return out;
    }


    function logInUser(name, password) {
        var out;
        $.ajax({
            type: 'POST',
            data: {
                username: name,
                password: password
            },
            url: '/users/login/',
            async: false,
            success: function(data) {
                out = data;
            },
            error: function(err) {
                out = err;
            }
        });
        return out;
    }

    function logOutUser() {
        var out;

        $.ajax({
            type: 'POST',
            data: {},
            url: '/users/logout/',
            async: false,
            success: function(data) {
                out = data;
            },
            error: function(err) {
                out = err;
            }
        });
        return out;
    }

    function getCurrentUser() {
        var out;

        $.ajax({
            type: 'GET',
            url: '/users/current/',
            async: false,
            success: function(data) {
                out = data.content;
            },
            error: function(err) {
                out = err;
            }
        });

        return out;

    }

    // -----------------------------------------------------
    //   Set helper functions
    // -----------------------------------------------------
    function createSet(name, dancers) {
        var out;

        $.ajax({
            type: 'POST',
            data: {
                name: name,
                dancers: dancers
            },
            url: '/sets/',
            async: false,
            success: function(data) {
                out = data;
            },
            error: function(err) {
                out = err;
            }
        });

        return out;
    }

    function getSets() {
        var out;

        $.ajax({
            type: 'GET',
            url: '/sets/',
            async: false,
            success: function(data) {
                out = data.content;
            },
            error: function(err) {
                out = err;
            }
        });

        return out;
    }

    function deleteSets() {
        var out;
        $.ajax({
            type: 'DELETE',
            url: '/sets/',
            async: false,
            success: function(data) {
                out = data;
            },
            error: function(err) {
                out = err;
            }
        });
        return out;
    }

    function getSet(id) {
        var out;
        $.ajax({
            type: 'GET',
            url: '/sets/' + id,
            async: false,
            success: function(data) {
                out = data.content;
            },
            error: function(err) {
                out = err;
            }
        });
        return out;
    }

    function updateSet(id, user, dancers) {
        var out;
        $.ajax({
            type: 'PUT',
            data: {
                user: user,
                dancers: dancers
            },
            url: '/sets/' + id,
            async: false,
            success: function(data) {
                out = data;
            },
            error: function(err) {
                out = err;
            }
        });
        return out;
    }

    function deleteSet(id) {
        var out;
        $.ajax({
            type: 'DELETE',
            url: '/sets/' + id,
            async: false,
            success: function(data) {
                out = data;
            },
            error: function(err) {
                out = err;
            }
        });
        return out;
    }

    // -----------------------------------------------------
    //   Share helper functions
    // -----------------------------------------------------
    function createShare(recipientId, setId) {
        var out;

        $.ajax({
            type: 'POST',
            data: {
                recipient: recipientId,
                shared_set: setId
            },
            url: '/users/'+recipientId+'/shares',
            async: false,
            success: function(data) {
                out = data;
            },
            error: function(err) {
                out = err;
            }
        });

        return out;
    }

    function getShares(userId) {
        var out;

        $.ajax({
            type: 'GET',
            url: '/users/' + userId + '/shares',
            async: false,
            success: function(data) {
                out = data.content;
            },
            error: function(err) {
                out = err;
            }
        });

        return out;
    }

    function getShare(userId, shareId) {
        var out;
        $.ajax({
            type: 'GET',
            url: '/users/'+userId+'/shares/'+shareId,
            async: false,
            success: function(data) {
                out = data.content;
            },
            error: function(err) {
                out = err;
            }
        });
        return out;
    }

    function deleteShares(userId) {
        var out;
        $.ajax({
            type: 'DELETE',
            url: '/users/'+userId+'/shares/',
            async: false,
            success: function(data) {
                out = data;
            },
            error: function(err) {
                out = err;
            }
        });
        return out;
    }

    function deleteShare(userId, shareId) {
        var out;
        $.ajax({
            type: 'DELETE',
            url: '/users/'+userId+'/shares/'+shareId,
            async: false,
            success: function(data) {
                out = data;
            },
            error: function(err) {
                out = err;
            }
        });
        return out;
    }
});
