'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MetricsSchema = new Schema({
    SiteId: {
        type: String
    },
    Timestamp: {
        type: Date
    },
    Host: {
        type: String
    },
    User: {
        type: String
    },
    Method: {
        type: String
    },
    Uri: {
        type: String
    },
    StatusCode: {
        type: Number
    },
    Size: {
        type: Number
    },
    Duration: {
        type: Number
    }
});

module.exports = mongoose.model('Metrics', MetricsSchema);