const mongo = require('mongoose');

mongo.connect('mongodb+srv://AdminUser:Imacoder7@lit-s8rma.mongodb.net/test?retryWrites=true&w=majority');

var db = mongo.connection;
db.on('error', function(error) {
    console.log('DB connection fails' + error);
});
db.once('open', function() {
    console.log('DB connection Successful')
});

require('./player');
