// code from https://github.com/kongming92/6170-p3demo/blob/master/public/javascripts/helpers.js
var helpers = (function() {
    var self = {};
    self.getFormData = function(form) {
        var inputs = {};
        $(form).serializeArray().forEach(function(item) {
            inputs[item.name] = item.value;
        });
        return inputs;
    };
    return self;
})();
