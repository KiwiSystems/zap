// Lead authors: Katharine Xiao and Aaron Suarez

$(document).on('click', '#new-dancer', function(e) {
    e.preventDefault();
    $('#modal-new-dancer').foundation('reveal', 'open');
});

/*
    Create a new dancer on the current set, given a dancer name
*/
$(document).on('submit', '#new-dancer-form', function(e) {
    e.preventDefault();
    // Only perform this function when in edit mode
    if (!$('#new-dancer-form').hasClass('disabled')) {
        var path_length = $("#formation-panel").data('max-index') - 1 || 0;
        var curr_index = $("#set-info").attr('index');
        // Default position to (0, 0)
        $('#new-dancer-form').append('<input type="hidden" name="x" value="' + 0 + '" />');
        $('#new-dancer-form').append('<input type="hidden" name="y" value="' + 0 + '" />');
        $('#new-dancer-form').append('<input type="hidden" name="path_length" value="' + path_length + '" />');

        $.post('/dancers', helpers.getFormData(this))
            .done(function(response) {
                $('#save-set').click();
                $('a.close-reveal-modal').trigger('click');
                getSetPage(curr_index);
            });
    }
});

/* 
    Save the current set, only if in edit mode
*/
$(document).on('click', '#save-set', function(e) {
    e.preventDefault();
    // Check if in edit mode
    if (!$('#save-set').hasClass('disabled')) {
        var index = $('#set-info').attr('index');
        var setId = $('#set-info').data('setid');
        // For each dancer, save the positions on the current formation
        $('.dancer-obj').each(function() {
            var id = $(this).data('id');
            var pos = $(this).position();
            $.ajax({
                type: 'PUT',
                data: {
                    index: index,
                    x: pos.left,
                    y: pos.top
                },
                url: '/dancers/' + id
            }).done(function(response) {}).fail(function(jqxhr) {
                var response = $.parseJSON(jqxhr.responseText);
                alert(response.err);
            });
        });
        // Re-load the set page, with the updated dancers and positions
        getSetPage(index);
    }
});

/*
    Create a new formation on the front end by extending the paths of all dancers 
*/
$(document).on('click', '#new-formation', function(e) {
    e.preventDefault();
    saveSet();
    // Only perform this action if in edit mode
    if (!$('#new-formation').hasClass('disabled')) {
        var curr_index = $("#set-info").attr('index');
        // Cannot create a formation without a dancer, since formations are not represented in the database
        if ($('.dancer-obj').length === 0) {
            alert('Please create a dancer first!');
        } else {
            // For each dancer, append a position to his path
            $('.dancer-obj').each(function() {
                var id = $(this).data('id');
                $.ajax({
                    type: 'GET',
                    url: '/dancers/' + id
                }).done(function(response) {

                    // The position will be (0, 0), if this is the first formation or
                    // it will be the same as the most recent position
                    var path = response.content[0].path;
                    var x = 0;
                    var y = 0;
                    if (path.length > 0) {
                        var x = path[path.length - 1].x;
                        var y = path[path.length - 1].y;
                    }
                    $.ajax({
                        type: 'PUT',
                        data: {
                            index: path.length,
                            x: x,
                            y: y
                        },
                        url: '/dancers/' + response.content[0]._id + '?action=append'
                    }).done(function(response) {}).fail(function(response) {
                        var response = $.parseJSON(response.responseText);
                        alert(response.err);
                    });
                    getSetPage(curr_index);
                }).fail(function(response) {
                    var resp = $.parseJSON(response.responseText);
                    alert(resp.err);
                });
            });
        }
    }
});

/*
    Delete a given formation by splicing the paths of all dancers at the corresponding index
*/
$(document).on('click', '.delete-formation', function(e) {
    e.preventDefault();
    var index = $(this).data('index');
    var curr_index = $("#set-info").attr('index');
    $('.dancer-obj').each(function() {
        var id = $(this).data('id');
        $.ajax({
            type: 'PUT',
            data: {
                index: index
            },
            url: '/dancers/' + id + '?action=delete'
        }).done(function(response) {
            // Make sure that the selected formation is adjusted, if the last formation is selected
            if (response.content.path.length <= curr_index) curr_index -= 1;
            getSetPage(curr_index);
        }).fail(function(response) {
            var response = $.parseJSON(response.responseText);
            alert(response.err);
        });
    });
});

/*
    Render the selected formation by re-rendering the set and indexing into the dancer paths
*/
$(document).on('click', '.formation', function(e) {
    e.preventDefault();
    saveSet();

    var index = $(this).data('index');
    $('#set-info').attr('index', index);
    // $('.formation').removeClass('formation-active');
    // $('#formation-' + index).addClass('formation-active');
    // $('.dancer-obj').each(function() {
    //     var id = $(this).data('id');
    //     var that = $(this);
    //     $.ajax({
    //         type: 'GET',
    //         url: '/dancers/' + id
    //     }).done(function(response) {
    //         var path = response.content[0].path;
    //         var x = path[index].x;
    //         var y = path[index].y;
    //         that.css('top', y);
    //         that.css('left', x);
    //     }).fail(function(response) {
    //         var response = $.parseJSON(response.responseText);
    //         alert(response.err);
    //     });
    // });

    var setId = $('#set-info').data('setid');
    var edit_mode = $('#edit-set').prop('checked');
    // Re-load the set page
    $.ajax({
        type: 'GET',
        url: '/sets/' + setId
    }).done(function(resp) {
        loadSet({
            set: resp.content,
            index: index,
            edit_mode: edit_mode
        });
    }).fail(function(jqxhr) {
        alert('An unknown error occurred.');
    });
})

/*
    Animate all formations by simulating button clicks on all formations, 
    in the order that they were created
*/
$(document).on('click', '#play', function(e) {
    e.preventDefault();
    var max_index = $("#formation-panel").data('max-index') || 0;
    (function myLoop(i) {
        setTimeout(function() {
            var id = "#formation-" + (max_index - i);
            $(id).click();
            if (--i) myLoop(i);
        }, 500)
    })(max_index);
})

/*
    When the edit option is checked or unchecked, update the mode of the set  
*/
$(document).on('click', '#edit-set', function(e) {
    var setToggle = $('#edit-set');
    // If edit option is checked, make dancers draggable and reveal the edit buttons
    if (setToggle.prop('checked')) {
        $('#set-toggle-view').toggleClass('secondary', 200);
        $('#set-toggle-edit').toggleClass('secondary', 200);
        $('.set-sub-nav-button').toggleClass('hidden', 200);
        $('.delete-formation').toggleClass('hidden', 200);
        $('.dancer-obj').each(function() {
            $(this).toggleClass('cursor-move');
            $(this).draggable({
                containment: 'parent',
                disabled: false,
            });
        });
    // If edit button is unchecked, dancers are no longer draggable and the edit buttons are hidden
    } else {
        $('#set-toggle-view').toggleClass('secondary', 200);
        $('#set-toggle-edit').toggleClass('secondary', 200);
        $('.set-sub-nav-button').toggleClass('hidden', 200);
        $('.delete-formation').toggleClass('hidden', 200);
        $('.dancer-obj').each(function() {
            $(this).toggleClass('cursor-move');
            $(this).draggable({
                containment: 'parent',
                disabled: true,
            });

        });
    }
});

/*
    Save the set by updating the positions of all dancers on the current formation
*/
function saveSet() {
    if (!$('#save-set').hasClass('disabled')) {
        var index = $('#set-info').attr('index');
        var setId = $('#set-info').data('setid');
        $('.dancer-obj').each(function() {
            var id = $(this).data('id');
            var pos = $(this).position();
            $.ajax({
                type: 'PUT',
                data: {
                    index: index,
                    x: pos.left,
                    y: pos.top
                },
                url: '/dancers/' + id
            }).done(function(response) {}).fail(function(jqxhr) {
                var response = $.parseJSON(jqxhr.responseText);
                alert(response.err);
            });
        });
    }
}

/*
    A helper function to load the set page, given the index representing
    the formation you want the set page to default to
*/
function getSetPage(index) {
    if (index < 0) {
        index = 0;
    }
    var setId = $('#set-info').data('setid');
    var edit_mode = $('#edit-set').prop('checked');
    $.ajax({
        type: 'GET',
        url: '/sets/' + setId
    }).done(function(resp) {
        loadSet({
            set: resp.content,
            index: index,
            edit_mode: edit_mode
        });
    }).fail(function(jqxhr) {
        alert('An unknown error occurred.');
    });
}
