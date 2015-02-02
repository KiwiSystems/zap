var mongoose = require('mongoose');

var zapSchema = mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    dateTime: { type: Date, required: true },
    location: { type: String, required: true }
});

var Zap = mongoose.model('Zap', zapSchema);

exports.Zap = Zap;