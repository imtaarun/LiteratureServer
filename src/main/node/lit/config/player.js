const mongo = require('mongoose');

var gameSchema = new mongo.Schema({
    p1: {
        id:Number,
        name:String,
        cards: [
            {
                type: String
            }
        ],
        turn: Boolean
    },
    p2: {
        id:Number,
        name:String,
        cards: [
            {
                type: String
            }
        ],
        turn: Boolean
    },
    p3: {
        id:Number,
        name:String,
        cards: [
            {
                type: String
            }
        ],
        turn: Boolean
    },
    p4: {
        id:Number,
        name:String,
        cards: [
            {
                type: String
            }
        ],
        turn: Boolean
    },
    p5: {
        id:Number,
        name:String,
        cards: [
            {
                type: String
            }
        ],
        turn: Boolean
    },
    p6: {
        id:Number,
        name:String,
        cards: [
            {
                type: String
            }
        ],
        turn: Boolean
    },
    points: {
        team1: Number,
        team2: Number
    },
    room: String
});

mongo.model('game', gameSchema)