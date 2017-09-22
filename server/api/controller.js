'use strict';

var mongoose = require('mongoose');
var Metrics = mongoose.model('Metrics');
var VizMetrics = mongoose.model('VizMetrics');
var queries = require('./queries');

var config = function () {
  return {
    renderer: 'global',
    name: 'edge',
    nodes: [
      {
        renderer: 'region',
        name: 'iris',
        displayName: 'IRIS',
        nodes: [],
        connections: [],
        class: 'normal',
        metadata: {}
      },
      {
        renderer: 'region',
        name: 'gea',
        displayName: 'GEA',
        nodes: [],
        connections: [],
        class: 'normal',
        metadata: {}
      },
      {
        renderer: 'region',
        name: 'ata',
        displayName: 'ATA',
        nodes: [],
        connections: [],
        class: 'normal',
        metadata: {}
      },
      {
        renderer: 'region',
        name: 'day',
        displayName: 'DAY',
        nodes: [],
        connections: [],
        class: 'normal',
        metadata: {}
      },
      {
        renderer: 'region',
        name: 'dae',
        displayName: 'DAE',
        nodes: [],
        connections: [],
        class: 'normal',
        metadata: {}
      }
    ]
  };
};

var transform = function (data, metrics) {
  data = data || config();

  metrics.forEach(function(element) {

  });
};

exports.last = function (req, res) {
  queries.lastQuery().exec(function (err, metrics) {
    if (err) {
      res.send(err);
    }
    res.json(metrics);
  });
};

exports.year = function (req, res) {
  queries.yearQuery(req.params.year).exec(function (err, metrics) {
    if (err) {
      res.send(err);
    }
    res.json(metrics);
  });
};

exports.month = function (req, res) {
  queries.monthQuery(req.params.year, req.params.month - 1).exec(function (err, metrics) {
    if (err) {
      res.send(err);
    }
    res.json(metrics);
  });
};

exports.date = function (req, res) {
  queries.dateQuery(req.params.year, req.params.month - 1, req.params.date).exec(function (err, metrics) {
    if (err) {
      res.send(err);
    }
    res.json(metrics);
  });
};