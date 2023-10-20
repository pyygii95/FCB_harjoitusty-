const mongoose = require('mongoose');

const express = require('express');

const app = express();

const player = require('./playerSchema.js'); // Change bookSchema to playerSchema

const bodyparser = require('body-parser');

const mongodb = require('mongodb');

app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended:false }));

const uri = 'mongodb+srv://pyge:barcelona@cluster0.gifxn3m.mongodb.net/playerDb?retryWrites=true&w=majority'; // Change the database name
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;
db.once('open', function () {
    console.log('Tietokantayhteys avattu');
});

app.get('/players', function (req, res) { // Change '/books' to '/players'
    player.find(req.query, function (err, result) { // Change 'book' to 'player'
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/newPlayer', function (req, res) { // Change '/newBook' to '/newPlayer'
    delete req.body._id;

    db.collection('players').insertOne(req.body); // Change 'books' to 'players'
    res.send('Player is added with following data: ' + JSON.stringify(req.body));
});

app.post('/deletePlayer', function (req, res) {
    db.collection('players').deleteOne({ _id: new mongodb.ObjectId(req.body._id)}, function (err, result) {
        if (err) {
            res.send('Error deleting with the following data: ' + err);
        } else {
            res.send('Player is deleted with the following id: ' + req.body._id);
            
        }
    });
});
app.post('/updatePlayer', function(req, res) {
    // Update a document in the 'players' collection. Three parameters: ID, what to update, and error handling and response function.
    db.collection('players').updateOne(
        { _id: new mongodb.ObjectId(req.body._id) },
        {$set: {
                name: req.body.name,
                nationality: req.body.nationality,
                height: req.body.height,
                position: req.body.position,
                number: req.body.number,
                goals: req.body.goals,
                injured: req.body.injured
            }
        }),
        function(err, results) {
            if (err) {
                res.send('Error updating: ' + err);
            } else {
                res.send('Player is updated with the following id: ' + req.body._id + ' and the following data: ' + JSON.stringify(req.body));
            }
        }
    });


    const server = app.listen(8080, function(){})