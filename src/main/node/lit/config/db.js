const mongo = require('mongoose');

//mongo.connect('mongodb+srv://AdminUser:Imacoder7@lit-s8rma.mongodb.net/test?retryWrites=true&w=majority');
mongo.connect('mongodb://localhost:27017/lit');

var db = mongo.connection;
db.on('error', function(error) {
    console.log('DB connection fails' + error);
});
db.once('open', function() {
    console.log('DB connection Successful')
});

require('./player');
