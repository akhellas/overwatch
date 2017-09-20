'use strict';

var mongoose = require('mongoose');
var Metrics = mongoose.model('Metrics');
var VizMetrics = mongoose.model('VizMetrics');
var queries = require('./queries');

exports.last = function(req, res) {
  queries.lastQuery().exec(function (err, metrics) {
    if (err) {
      res.send(err);
    }
    res.json(metrics);
  });
};

exports.year = function(req, res) {
  queries.yearQuery(req.params.year).exec(function (err, metrics) {
    if (err) {
      res.send(err);
    }
    res.json(metrics);
  });
};

exports.month = function(req, res) {
  queries.monthQuery(req.params.year, req.params.month-1).exec(function(err, metrics) {
    if (err) {
      res.send(err);
    }
    res.json(metrics);
  });
};

exports.date = function(req, res) {
  queries.dateQuery(req.params.year, req.params.month-1, req.params.date).exec(function(err, metrics) {
    if (err) {
      res.send(err);
    }
    res.json(metrics);
  });
};