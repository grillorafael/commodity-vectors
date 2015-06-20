var mongoose = require('mongoose');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var compression = require('compression');
var app = express();
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/commodity-vectors');

var Vessel = mongoose.model('Vessel', new Schema({
    name: {
        type: String,
        required: '{PATH} is required'
    },
    len: {
        type: Number,
        required: '{PATH} is required'
    },
    width: {
        type: Number,
        required: '{PATH} is required'
    },
    draft: {
        type: Number,
        required: '{PATH} is required'
    },
    last_known_position: {
        type: [Number],
        index: '2d',
        required: '{PATH} is required'
    }
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(compression());
app.use(cors());


app.get('/vessels/:page?', function(req, res) {
    var page = req.params.page || 1;
    var elementsPerPage = 10;
    // Vessel.find().skip(elementsPerPage * (page - 1)).limit(elementsPerPage).exec(function(err, vessels) {
    Vessel.find().exec(function(err, vessels) {
        res.json(vessels);
    });
});

app.post('/vessels', function(req, res) {
    // TODO Sanitize fields
    var vessel = new Vessel(req.body);

    vessel.save(function(err) {
        if (!err) {
            res.json(vessel);
        } else {
            var errors = {};

            Object.keys(err.errors).forEach(function(field) {
                errors[field] = err.errors[field].message;
            });

            res.status(400).json({
                errors: errors
            });
        }
    });
});

app.put('/vessels/:id', function(req, res) {
    // TODO Sanitize fields
    Vessel.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, function(err, vessel) {
        if (!err) {
            res.json(vessel);
        } else {
            var errors = {};

            Object.keys(err.errors).forEach(function(field) {
                errors[field] = err.errors[field].message;
            });

            res.status(400).json({
                errors: errors
            });
        }
    });
});


var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
