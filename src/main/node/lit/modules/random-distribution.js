var cards = require('../config/cards');
var express = require('express');
var mongo = require('mongoose');
require('../config/db');
var Player = mongo.model('game');


function assign(i,j,a){
    var temp =[];
    for(var k = i; k<=j;k++){
        temp.push(a[k]);
    }
    return temp;
}

function randomDistribution(){
    
    var game;

    var shuffled = cards.cards
    .map((a) => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
    
    Player.findOne(
        (err,doc)=>{
        game = doc;
        if(!err){           
            game.p1.cards = assign(0,7,shuffled);
            game.p2.cards = assign(8,15,shuffled);
            game.p3.cards = assign(16,23,shuffled);
            game.p4.cards = assign(24,31,shuffled);
            game.p5.cards = assign(32,39,shuffled);
            game.p6.cards = assign(40,47,shuffled);          

            game.save((err,doc)=>{
                if(!err){
                    console.log('Init-Success');
                    //res.send(doc);
                }
                else{
                    console.log('Init-Error')
                    console.log(err);
                }
            });
        }
        else{
            console.log('Error');
        } 
    });
}

module.exports={
    randomDistribution : randomDistribution
}