'use strict';

var mongoose = require('mongoose');
var Metrics = mongoose.model('Metrics');
var VizMetrics = mongoose.model('VizMetrics');
var queries = require('./queries');

var transform = function(metrics) {
  var data = {
    renderer: 'global',
    name: 'edge',
    entryNode: 'INTERNET',
    nodes: [
      {
        renderer: 'region',
        layout: 'ltrTree',
        name: 'gea',
      }
    ]
  };

  return data;
}

exports.last = function(req, res) {
  queries.lastQuery().exec(function (err, metrics) {
    if (err) {
      res.send(err);
    }
    res.json(transform(metrics));
  });
};

exports.year = function(req, res) {
  queries.yearQuery(req.params.year).exec(function (err, metrics) {
    if (err) {
      res.send(err);
    }
    res.json(transform(metrics));
  });
};

exports.month = function(req, res) {
  queries.monthQuery(req.params.year, req.params.month-1).exec(function(err, metrics) {
    if (err) {
      res.send(err);
    }
    res.json(transform(metrics));
  });
};

exports.date = function(req, res) {
  queries.dateQuery(req.params.year, req.params.month-1, req.params.date).exec(function(err, metrics) {
    if (err) {
      res.send(err);
    }
    res.json(transform(metrics));
  });
};