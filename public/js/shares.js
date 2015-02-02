// Lead author: Katharine Xiao

/*
  On submitting the share form, first get the id of the
  desired recipient, and then create the share object
*/
$(document).on('submit', '#share-form', function(evt) {
    evt.preventDefault();
    var formData = helpers.getFormData(this);
    var item = $(this).parent();
    var id = item.data('set-id');
    // GET request to find the id of the recipient user
    $.get(
        '/users/shares/' + formData.recipient
    ).done(function(response) {
        recipientId = response.content;

        // POST to create the corresponding share object in database,
        // given a recipient user id and a set id
        $.post('/users/' + recipientId + '/shares', {
            name: formData.name,
            shared_set: id
        }).done(function(response) {
            // If query is successful, close the modal window and reload the dashboard
            $('a.close-reveal-modal').trigger('click');
            loadHomePage();
        }).fail(function(response) {
            var response = $.parseJSON(response.responseText);
            alert(response.err);
        });
    }).fail(function(jqxhr) {
        var response = $.parseJSON(jqxhr.responseText);
        alert(response.err);
    });
});

/*
  Display a shared set when the user clicks on the share link
*/
$(document).on('click', '.shared-set', function(e) {
    e.preventDefault();
    var item = $(this).parent();
    var id = item.data('share-id');
    // GET request to retrieve desired share
    $.ajax({
        type: 'GET',
        url: '/users/' + currentUser.id + '/shares/' + id
    }).done(function(response) {
        var setId = response.content.shared_set._id;
        // GET request to display the shared set (in view mode)
        $.ajax({
            type: 'GET',
            url: '/sets/' + setId
        }).done(function(resp) {
            loadSet({
                set: resp.content,
                index: 0,
                edit_mode: false
            });
        }).fail(function(jqxhr) {
            var response = $.parseJSON(jqxhr.responseText);
            alert(response.err);
        });
    }).fail(function(jqxhr) {
        var response = $.parseJSON(jqxhr.responseText);
        // If the original creator of the shared set has deleted the set,
        // display the following error if user tries to access the share
        if (response.err === "Resource not found.") {
            alert("Set has been deleted by original creator.");
        } else {
            alert(response.err);
        }
    });
});

/*
  Delete a share instance, so that user can no longer access the corresponding shared set 
*/
$(document).on('click', '.delete-share', function(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this set?')) {
        var item = $(this).parent().parent().parent();
        var id = item.data('share-id');
        // DELETE request to remove corresponding share object from database
        $.ajax({
            type: 'DELETE',
            url: '/users/' + currentUser.id + '/shares/' + id
        }).done(function(response) {
            // Remove share from the front-end dashboard
            item.remove();
        }).fail(function(jqxhr) {
            var response = $.parseJSON(jqxhr.responseText);
            alert(response.err);
        });
    }
});
