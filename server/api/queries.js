'use strict';

var mongoose = require('mongoose');
var Metrics = mongoose.model('Metrics');

var dateQuery = function (year, month, date) {
    var timestamp = new Date(year || 2015, month || 0, date || 1);
    var filter = { 
        Timestamp: { $gt: timestamp },
        StatusCode: { $ne: 401 }
    };

    // Metrics.find(filter).count(function (err, count) {
    //     console.log('query', filter, 'returns', count, 'items');
    // });

    // Metrics.aggregate([
    //     { $match: filter },
    //     { $group: { 
    //         _id: '$Host' , 
    //         count: { $sum: 1 },
    //         avgDuration: { $avg: '$Duration' },
    //         avgSize: { $avg: '$Size' },
    //         errors: { $sum: { $cond: [ { $ne: ['$StatusCode', 200]}, 1, 0] } },
    //     }}
    // ]).exec(function (err, result) {
    //     console.log(result);
    // });

    return Metrics.find(filter);
}

exports.monthQuery = function (year, month) {
    return dateQuery(year, month);
}

exports.yearQuery = function(year) {
    return dateQuery(year);
}

exports.lastQuery = function () { 
    return dateQuery();
}

exports.dateQuery = dateQuery;