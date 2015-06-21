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

function parseErrors(err) {
    var errors = {};

    Object.keys(err.errors).forEach(function(field) {
        errors[field] = err.errors[field].message;
    });

    return errors;
}


app.get('/api/vessels/:page?', function(req, res) {
    // var page = req.params.page || 1;
    // var elementsPerPage = 10;
    // Vessel.find().skip(elementsPerPage * (page - 1)).limit(elementsPerPage).exec(function(err, vessels) {
    Vessel.find().exec(function(err, vessels) {
        res.json(vessels);
    });
});

app.delete('/api/vessels/:id', function(req, res) {
    Vessel.find({
        _id: req.params.id
    }).remove().exec(function(err) {
        res.sendStatus(err ? 404 : 200);
    });
});

app.post('/api/vessels', function(req, res) {
    var vessel = new Vessel(req.body);
    if (vessel.errors) {
        res.status(400).json({
            errors: parseErrors(vessel)
        });
        return;
    }

    if (req.body._id) {
        Vessel.findOneAndUpdate({
            _id: vessel._id
        }, {
            $set: vessel
        }, {
            new: true
        }, function(err, vessel) {
            if (!err) {
                res.json(vessel);
            } else {
                res.status(400).json({
                    errors: parseErrors(err)
                });
            }
        });
    } else {
        vessel.save(function(err) {
            if (!err) {
                res.json(vessel);
            } else {
                res.status(400).json({
                    errors: parseErrors(err)
                });
            }
        });
    }
});


var server = app.listen(3000, function() {
    console.log('Example app listening at http://localhost:3000');
});
