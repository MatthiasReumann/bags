const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost/shopping';

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', function(){
    console.log(`Mongoose default connection open (${dbURI}).`)
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose default connection disconnected.')
});

process.on('SIGINT', function() {   
    mongoose.connection.close(function () { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
}); 