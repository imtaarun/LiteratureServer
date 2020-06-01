const mongo = require('mongoose');

var localDb = 'mongodb://localhost:27017/lit';
var serverDb = 'mongodb+srv://AdminUser:Imacoder7@lit-s8rma.mongodb.net/test?retryWrites=true&w=majority';

mongo.connect(serverDb);

var db = mongo.connection;
db.on('error', function(error) {
    console.log('DB connection fails' + error);
});
db.once('open', function() {
    console.log('DB connection Successful')
});

require('./player');