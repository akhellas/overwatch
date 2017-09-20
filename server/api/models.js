'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MetricsSchema = new Schema({ Timestamp: 'date' });

var VisMetricsSchema = new Schema({});

module.exports = mongoose.model('Metrics', MetricsSchema);
module.exports = mongoose.model('VizMetrics', VisMetricsSchema);