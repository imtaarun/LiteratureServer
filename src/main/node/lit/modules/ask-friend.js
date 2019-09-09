var cards = require('../config/cards');
var express = require('express');
var mongo = require('mongoose');
require('../config/db');
var Player = mongo.model('game');

function playerCardPicker(data,player){
    if(player==1){
        return data.p1.cards;
    } else if(player==2){
        return data.p2.cards;
    } else if(player==3){
        return data.p3.cards;
    } else if(player==4){
        return data.p4.cards;
    } else if(player==5){
        return data.p5.cards;
    } else if(player==6){
        return data.p6.cards;
    }
}

function focusedDeckPicker(card) {
    if(card.slice(0,1)=='H'){
        if((card.slice(1,2)=='2')||(card.slice(1,2)=='3')||(card.slice(1,2)=='4')||(card.slice(1,2)=='5')||(card.slice(1,2)=='6')||(card.slice(1,2)=='7')){
            return cards.Hset1;
        } else {
            return cards.Hset2;
        }
    } else if(card.slice(0,1)=='D'){
        if((card.slice(1,2)=='2')||(card.slice(1,2)=='3')||(card.slice(1,2)=='4')||(card.slice(1,2)=='5')||(card.slice(1,2)=='6')||(card.slice(1,2)=='7')){
            return cards.Dset1;
        } else {
            return cards.Dset2;
        }
    } else if(card.slice(0,1)=='S'){
        if((card.slice(1,2)=='2')||(card.slice(1,2)=='3')||(card.slice(1,2)=='4')||(card.slice(1,2)=='5')||(card.slice(1,2)=='6')||(card.slice(1,2)=='7')){
            return cards.Sset1;
        } else {
            return cards.Sset2;
        }
    } else if(card.slice(0,1)=='C'){
        if((card.slice(1,2)=='2')||(card.slice(1,2)=='3')||(card.slice(1,2)=='4')||(card.slice(1,2)=='5')||(card.slice(1,2)=='6')||(card.slice(1,2)=='7')){
            return cards.Cset1;
        } else {
            return cards.Cset2;
        }
    }
}

function check(data,card,player){
    var currentPlayerCards = playerCardPicker(data,player);
    var currentFocusedDeck = focusedDeckPicker(card);
    var flag = 0;

    for(var i in currentFocusedDeck){
        for(var j in currentPlayerCards){
            if(currentFocusedDeck[i]==currentPlayerCards[j]){
                flag = 1;
            }
        }
    }

    if(flag>0){
        return true;
    } else {
        return false;
    }

}

function checkOneCard(data,card,player){
    var currentPlayerCards = playerCardPicker(data,player);
    var flag = 0;
    for(var j in currentPlayerCards){
        if(currentPlayerCards[j]==card){
            flag = 1;
        }
    }

    if(flag>0){
        return true;
    } else {
        return false;
    }
}

function popOpponentCard(data,card,opponent){
    if(opponent==1){       
        var index = data.p1.cards.indexOf(card);
        if (index > -1) {
            data.p1.cards.splice(index, 1);
        }
        return data;
    } else if(opponent==2){
        var index = data.p2.cards.indexOf(card);
        if (index > -1) {
            data.p2.cards.splice(index, 1);
        }
        return data;
    } else if(opponent==3){
        var index = data.p3.cards.indexOf(card);
        if (index > -1) {
            data.p3.cards.splice(index, 1);
        }
        return data;
    } else if(opponent==4){
        var index = data.p4.cards.indexOf(card);
        if (index > -1) {
            data.p4.cards.splice(index, 1);
        }
        return data;
    } else if(opponent==5){
        var index = data.p5.cards.indexOf(card);
        if (index > -1) {
            data.p5.cards.splice(index, 1);
        }
        return data;
    } else if(opponent==6){
        var index = data.p5.cards.indexOf(card);
        if (index > -1) {
            data.p5.cards.splice(index, 1);
        }
        return data;
    }
}

function pushCardToPlayer(data,card,player){
    if(player==1){
        data.p1.cards.push(card);
        return data;
    } else if(player==2){
        data.p2.cards.push(card);
        return data;
    } else if(player==3){
        data.p3.cards.push(card);
        return data;
    } else if(player==4){
        data.p4.cards.push(card);
        return data;
    } else if(player==5){
        data.p5.cards.push(card);
        return data;
    } else if(player==6){
        data.p6.cards.push(card);
        return data;
    }
}

function shiftOpponentTurn(data,oppo){
    if(oppo==1){
        data.p1.turn = true;
        return data;
    } else if(oppo==2){
        data.p2.turn = true;
        return data;
    } else if(oppo==3){
        data.p3.turn = true;
        return data;
    } else if(oppo==4){
        data.p4.turn = true;
        return data;
    } else if(oppo==5){
        data.p5.turn = true;
        return data;
    } else if(oppo==6){
        data.p6.turn = true;
        return data;
    }
}

function shiftPlayerTurn(data,player){
    if(player==1){
        data.p1.turn = false;
        return data;
    } else if(player==2){
        data.p2.turn = false;
        return data;
    } else if(player==3){
        data.p3.turn = false;
        return data;
    } else if(player==4){
        data.p4.turn = false;
        return data;
    } else if(player==5){
        data.p5.turn = false;
        return data;
    } else if(player==6){
        data.p6.turn = false;
        return data;
    }
}

function nameFinder(data, player){
    if(player==1){
        return data.p1.name;
    } else if(player==2){
        return data.p2.name;
    } else if(player==3){
        return data.p3.name;
    } else if(player==4){
        return data.p4.name;
    } else if(player==5){
        return data.p5.name;
    } else if(player==6){
        return data.p6.name;
    }
}

function randomizeTurn(data,team){
    if(team=='EVEN'){
        var players = [2,4,6];
        var shuffled = players
        .map((a) => ({sort: Math.random(), value: a}))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);

        var player = shuffled[0];

        if(player==1){
            data.p1.turn = true;
        } else if(player==2){
            data.p2.turn = true;
        } else if(player==3){
            data.p3.turn = true;
        } else if(player==4){
            data.p4.turn = true;
        } else if(player==5){
            data.p5.turn = true;
        } else if(player==6){
            data.p6.turn = true;
        }

        return data;
    } else {
        var players = [1,3,5];
        var shuffled = players
        .map((a) => ({sort: Math.random(), value: a}))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);

        var player = shuffled[0];

        if(player==1){
            data.p1.turn = true;
        } else if(player==2){
            data.p2.turn = true;
        } else if(player==3){
            data.p3.turn = true;
        } else if(player==4){
            data.p4.turn = true;
        } else if(player==5){
            data.p5.turn = true;
        } else if(player==6){
            data.p6.turn = true;
        }

        return data;
    }
}


function askFriend(res,card,opponent,player,io) {
    var gameData;
    Player.findOne(
        (err,doc)=>{
            gameData = doc;
            if(check(gameData,card,player)){
                if(checkOneCard(gameData,card,opponent)){
                    //card shifting
                    var data = pushCardToPlayer(popOpponentCard(gameData,card,opponent),card,player);
                    data.save((err,doc)=>{
                        if(!err){
                            console.log('Init-Success');
                            io.emit('event',{type:'start-message', msg: nameFinder(data,player) +' has recieved ' +card +' from  ' +nameFinder(data,opponent)});
                            res.send(doc);
                        }
                        else{
                            console.log('Init-Error')
                            console.log(err);
                        }
                    });
                } else {
                    var throwingSet = focusedDeckPicker(card);
                    for(var i in throwingSet){
                        for(var j in gameData.p1.cards){
                            if(gameData.p1.cards[j]==throwingSet[i]){
                                var index = gameData.p1.cards.indexOf(throwingSet[i]);
                                if (index > -1) {
                                    gameData.p1.cards.splice(index, 1);
                                }
                            }
                        }
                        for(var j in gameData.p2.cards){
                            if(gameData.p2.cards[j]==throwingSet[i]){
                                var index = gameData.p2.cards.indexOf(throwingSet[i]);
                                if (index > -1) {
                                    gameData.p2.cards.splice(index, 1);
                                }
                            }
                        }
                        for(var j in gameData.p3.cards){
                            if(gameData.p3.cards[j]==throwingSet[i]){
                                var index = gameData.p3.cards.indexOf(throwingSet[i]);
                                if (index > -1) {
                                    gameData.p3.cards.splice(index, 1);
                                }
                            }
                        }
                        for(var j in gameData.p4.cards){
                            if(gameData.p4.cards[j]==throwingSet[i]){
                                var index = gameData.p4.cards.indexOf(throwingSet[i]);
                                if (index > -1) {
                                    gameData.p4.cards.splice(index, 1);
                                }
                            }
                        }
                        for(var j in gameData.p5.cards){
                            if(gameData.p5.cards[j]==throwingSet[i]){
                                var index = gameData.p5.cards.indexOf(throwingSet[i]);
                                if (index > -1) {
                                    gameData.p5.cards.splice(index, 1);
                                }
                            }
                        }
                        for(var j in gameData.p6.cards){
                            if(gameData.p6.cards[j]==throwingSet[i]){
                                var index = gameData.p6.cards.indexOf(throwingSet[i]);
                                if (index > -1) {
                                    gameData.p6.cards.splice(index, 1);
                                }
                            }
                        }
                    }
                    var team;
                    if(player%2==0){
                        gameData.points.team1 =  gameData.points.team1 + 1;
                        team = 'ODD';
                    } else {
                        gameData.points.team2 =  gameData.points.team2 + 1;
                        team = 'EVEN';
                    }

                    var data1 = randomizeTurn(shiftPlayerTurn(gameData,player),team);

                    data1.save((err,doc)=>{
                        if(!err){
                            console.log('Init-Success');
                            io.emit('event',{type:'start-message', msg: nameFinder(data1,player) +' has made an illegal call '});
                            res.send(doc);
                        }
                        else{
                            console.log('Init-Error')
                            console.log(err);
                        }
                    });

                }
            } else {
                console.log('you not having the requested card set');
                var team;
                if(player%2==0){
                    team = 'ODD';
                } else {
                    team = 'EVEN';
                }

                var data2 = randomizeTurn(shiftPlayerTurn(gameData,player),team);

                data2.save((err,doc)=>{
                    if(!err){
                        console.log('Init-Success');
                        io.emit('event',{type:'start-message', msg: nameFinder(data2,player) +' has commited a wrong call '});

                        res.send(doc);
                    }
                    else{
                        console.log('Init-Error')
                        console.log(err);
                    }
                });
            }
        });
}

module.exports={
    askFriend : askFriend
}