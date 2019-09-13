2//imports
var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());

var http = require('http').Server(app);
var io = require('socket.io')(http);
require('./config/db');
var mongo = require('mongoose');
var Player = mongo.model('game');
console.log("server started");
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var playerCount = 0;

//Socket connection
io.on('connection', (socket) => {
    if(playerCount<13) {
    playerCount++;
    console.log('Player ' +playerCount +' is connected');

    socket.on('disconnect', function(){
        console.log('Player ' +playerCount +' is disconnected');
    });

    socket.on('room',(room) => {
        if(playerCount<13) {
            var joinPlayer = require('./modules/join-player');
            var join = joinPlayer.joinPlayers;
            new join((playerCount/2),room);
            console.log('Player ' +(playerCount/2) +' has joined the room ' +room);
            io.emit('room', {type:'new-message', number: +(playerCount/2)}); 
            if((playerCount/2)==6){
                io.emit('start',{type:'start-message', bool: true});
                var randomDistribution = require('./modules/random-distribution');
                var a = randomDistribution.randomDistribution;
            
                new a();
            } 
        }
        else{
            io.emit('room',{type:'new-message', number: "Full"})
        }
    });
}
else{
    io.emit('room',{type:'new-message', number: "Full"})
}
});

//init db
require('./config/db.init');

//request mapping
app.get('/start',randomDist);
app.post('/turn',turn);
app.post('/ask',askFriend);
app.post('/deal',deal);

//controllers
function randomDist(req,res){
    Player.findOne(
        (err,doc)=>{
            res.send(doc);
        });
}

function turn(req,res){
    var selectedCard = req.body.selectedCard;
    var selectedOpponent = req.body.selectedOpponent;
    var playerId = req.body.playerId;

    var turnDistribution = require('./modules/turn');
    var a = turnDistribution.turn;

    new a(res,selectedCard,selectedOpponent,playerId,io);
}

function askFriend(req,res) {
    var requestedCard = req.body.selectedCard;
    var requestedFriend = req.body.selectedOpponent;
    var playerId = req.body.playerId;

    var turnDistribution = require('./modules/ask-friend');
    var a = turnDistribution.askFriend;

    new a(res,requestedCard,requestedFriend,playerId,io);   
}

function deal(req,res) {
    var dealCards = req.body.deal;
    var playerId = req.body.playerId;


    var dealMaker = require('./modules/deal');
    var a = dealMaker.deal;

    new a(res,dealCards,playerId,io);   
}

//Listener
http.listen(8080, () => {
    console.log('started on port 8080');
});
