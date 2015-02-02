// Lead author: Katharine Xiao

currentUser = undefined;

Handlebars.registerPartial('setlink', Handlebars.templates['setlink']);
Handlebars.registerPartial('sharelink', Handlebars.templates['sharelink']);

$(document).ready(function() {
    // GET the username and ObjectId of the current user, if there is a user signed in
    $.get('/users/current', function(response) {
        if (response.content.loggedIn) {
            currentUser = response.content.user;
        }
        loadHomePage();
    });
});

$(document).on('click', '#dashboard', function(e) {
    e.preventDefault();
    loadHomePage();
});

$(document).on('click', '#login-signup', function(e) {
    e.preventDefault();
    loadPage('login');
});

$(document).on('click', '#logo-link', function(e) {
    e.preventDefault();
    loadHomePage();
})

/*
    Helper function that takes in a Handlebars template, and loads it, along with the header
*/
var loadPage = function(template, data) {
    data = data || {};
    var isSignedIn = false;
    if (currentUser) {
        isSignedIn = true;
    }
    $('#nav-wrapper').html(Handlebars.templates['header']({
        isSignedIn: isSignedIn
    }));
    $('#main').html(
        Handlebars.templates[template](data));
};

/*
    Checks if there is a user logged in, and redirects accordingly
*/
var loadHomePage = function(err) {
    if (currentUser) {
        loadDashboard(err);
    } else {
        loadPage('login');
    }
};

/*
    Loads the user dashboard from a GET request to retrieve the user object
*/
var loadDashboard = function(err, additional) {
    $.get('/users/' + currentUser.id, function(response) {
        loadPage(
            'dashboard', {
                err: err,
                sets: response.content.sets,
                shares: response.content.shares,
                currentUser: currentUser,
                additional: additional
            }
        );

    });
};

loadSet = function(data) {
    if (currentUser) {
        data['isOwner'] = currentUser.id === data.set.user;
        loadPage('set', data);
    } else {
        loadPage('login');
    }
}

loadShare = function(data) {
    if (currentUser) {
        loadPage('share', data);
    } else {
        loadPage('login');
    }
}
