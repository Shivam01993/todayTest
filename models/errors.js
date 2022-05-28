const mongoose = require('mongoose');

const ErrorLogs = new mongoose.Schema({
    error_message: { type: String },
    error_detail: { type: String },
    error_data: { type: Object },
    api_path: { type: String },
    trace: { type: String },
}, {
    minimize: false,
    timestamps: true
});

mongoose.model('ErrorLogs', ErrorLogs);
module.exports = mongoose.model('ErrorLogs');