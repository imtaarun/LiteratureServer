const mongo = require('mongoose');

mongo.connect('mongodb://localhost:27017/lit');
var db = mongo.connection;
db.on('error',function(){
    console.log('DB connection fails');
});
db.once('open',function(){
    console.log('DB connection Successful')
});

require('./player');