// Luodaan tietokantayhteys mongoosen avulla
const mongoose = require('mongoose');

// Otetaan express käyttöön
const express = require('express');
const app = express();

//otetaan players käyttöön
const player = require('./playerSchema.js'); 

//otetaan bodyparser käyttöön lomakkeen käsittelyä varten
const bodyparser = require('body-parser');

const mongodb = require('mongodb');

// Asetetaan määritykset express-palvelimelle
//Otetaan käyttöön public-tiedosto
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended:false }));

// Luodaan vakio connectionstringille
const uri = 'mongodb+srv://pyge:barcelona@cluster0.gifxn3m.mongodb.net/userdb?retryWrites=true&w=majority'; // Change the database name
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
// Muodostetaan yhteys tietokantaan
const db = mongoose.connection;
db.once('open', function () {
    console.log('Tietokantayhteys avattu');
});

// Pelaajan lisäys post-funktio
app.get('/players', function (req, res) { 
    //// Haetaan pelaajat tietokannasta
    player.find(req.query, function (err, result) { 
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});
// Poistofunktio
app.post('/newPlayer', function (req, res) { 
    delete req.body._id;
//Poistetaan collectionista kirja
    db.collection('players').insertOne(req.body); 
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

// Päivitysfunktio, (EI TOIMI)
app.post('/updatePlayer', function(req, res) {
    
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
    // Laitetaan palvelin kuuntelemaan porttia 8080
    const server = app.listen(8080, function(){})
    
    //Selaimessa localhost:8080/players