var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zap'
    }],
    zaps: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zap'
    }]
});

var User = mongoose.model('User', userSchema);

exports.User = User;

