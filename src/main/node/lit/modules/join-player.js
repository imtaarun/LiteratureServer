var mongo = require('mongoose');
require('../config/db');
var Player = mongo.model('game');


function joinPlayers(playerId,playerName){
    
    var game;

    Player.findOne(
        (err,doc)=>{
        game = doc;
        if(!err){           
            if(playerId==1){
                game.p1.name = playerName;
            } else  if(playerId==2){
                game.p2.name = playerName;
            } else  if(playerId==3){
                game.p3.name = playerName;
            } else  if(playerId==4){
                game.p4.name = playerName;
            } else  if(playerId==5){
                game.p5.name = playerName;
            } else  if(playerId==6){
                game.p6.name = playerName;
            }
            game.save((err,doc)=>{
                if(!err){
                    console.log('Joining-Player-Success for player '+playerId)
                }
                else{
                    console.log('Joining-Player-Error')
                    console.log(err);
                }
            });
        }
        else{
            console.log('Joining-Player-Error');
        } 
    });
}

module.exports={
    joinPlayers : joinPlayers
}