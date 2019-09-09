var mongo = require('mongoose');
var Player = mongo.model('game');

var game = new Player();
game.p1.id = 1;
game.p1.name = '';
game.p1.cards = [];
game.p1.turn = true;

game.p2.id = 2;
game.p2.name = '';
game.p2.cards = [];
game.p2.turn = false;

game.p3.id = 3;
game.p3.name = '';
game.p3.cards = [];
game.p3.turn = false;

game.p4.id = 4;
game.p4.name = '';
game.p4.cards = [];
game.p4.turn = false;

game.p5.id = 5;
game.p5.name = '';
game.p5.cards = [];
game.p5.turn = false;

game.p6.id = 6;
game.p6.name = '';
game.p6.cards = [];
game.p6.turn = false;

game.points.team1 = 0;
game.points.team2 = 0;

game.save((err,doc)=>{
    if(!err){
        console.log('Init-Success');
    }
    else{
        console.log('Init-Error')
        console.log(err);
    }
});