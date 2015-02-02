// Lead author: Katharine Xiao

/*
  Sign users in by submitting a GET request with input params of 
  username and password
*/
$(document).on('submit', '#signin-form', function(evt) {
    evt.preventDefault();
    $.post(
        '/users/login',
        helpers.getFormData(this)
    ).done(function(response) {
        currentUser = response.content;
        loadHomePage();
    }).fail(function(jqxhr) {
        var response = $.parseJSON(jqxhr.responseText);
        // Redirect back to the login page, if login fields are incorrect
        loadPage('login', {
            error: response.err
        });
    });
});

/*
  Create new users by submitting a POST request,
  with input params of a username, password, and a password confirmation
*/
$(document).on('submit', '#register-form', function(evt) {
    evt.preventDefault();
    var formData = helpers.getFormData(this);
    $.post(
        '/users',
        formData
    ).done(function(response) {
        loadHomePage();
    }).fail(function(jqxhr) {
        // If user does not provide the necessary information, the password fields do not match,
        // or the username is already taken, redirect back to the login page with the appropriate error
        var response = $.parseJSON(jqxhr.responseText);
        loadPage('login', {
            error: response.err
        });
    });
});

/*
  End a user's session using POST request, and redirect to the login page
*/
$(document).on('click', '#logout-link', function(evt) {
    evt.preventDefault();
    $.post(
        '/users/logout'
    ).done(function(response) {
        currentUser = undefined;
        loadHomePage();
    }).fail(function(jqxhr) {
        var response = $.parseJSON(jqxhr.responseText);
        loadPage('login', {
            error: response.err
        });
    });
});
