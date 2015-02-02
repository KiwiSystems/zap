// Lead authors: Katharine Xiao and Aaron Suarez

$(document).on('click', '#open-modal-new-set', function(e) {
    e.preventDefault();
    $('#modal-new-set').foundation('reveal', 'open');
});

/*
    Given the desired set name as a parameter, creates a new
    set object with the currentUser as its owner
*/
$(document).on('click', '#add-set', function(e) {
    e.preventDefault();
    var name = $('#new-set-name').val();
    if (name.trim().length === 0) {
        alert('Name must not be empty');
        return;
    }
    // POST to create new set in the database
    $.post(
        '/sets', {
            name: name
        }
    ).done(function(response) {
        $('a.close-reveal-modal').trigger('click');
        // Default set to view mode
        loadSet({
            set: response.content,
            index: 0,
            edit_mode: false
        });
    }).fail(function(jqxhr) {
        var response = $.parseJSON(jqxhr.responseText);
        alert(response.err);
    });
});

/*
    Delete a set from both the html and the database, upon button click
*/
$(document).on('click', '.delete-set', function(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this set?')) {
        var item = $(this).parent().parent().parent();
        var id = item.data('set-id');
        $.ajax({
            type: 'DELETE',
            url: '/sets/' + id
        }).done(function(response) {
            item.remove();
        }).fail(function(jqxhr) {
            var response = $.parseJSON(jqxhr.responseText);
            alert(response.err);
        });
    }

});

/*
    When any of the edit set buttons are clicked, render the set corresponding to 
    the clicked button
*/
$(document).on('click', '.edit-set', function(e) {
    e.preventDefault();
    var item = $(this).parent();
    var id = item.data('set-id');
    $.ajax({
        type: 'GET',
        url: '/sets/' + id
    }).done(function(response) {
        // Load the set view with the appropriate content, defaulting to view mode
        loadSet({
            set: response.content,
            index: 0,
            edit_mode: false
        });
    }).fail(function(jqxhr) {
        alert('An unknown error occurred.');
    });
});

$(document).on('click', '.open-modal-share-set', function(e) {
    e.preventDefault();
    var item = $(this).parent().parent().parent();
    var id = item.data('set-id');
    $('#share-wrapper').attr('data-set-id', id);
    $('#modal-share-set').foundation('reveal', 'open');
});

$(document).on('click', '.close', function(e) {
    e.preventDefault();
    $('#error-message').fadeOut();
});
