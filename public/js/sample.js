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

    function createZap(userId, message, dateTime, location) {
        var out;

        $.ajax({
            type: 'POST',
            data: {
                creator: userId,
                message: message,
                dateTime: dateTime,
                location: location
            },
            url: '/zaps/',
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