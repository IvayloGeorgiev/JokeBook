var express = require('express');

//var env = process.env.NODE_ENV || 'development';

var app = express();
//var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
//require('./server/config/mongoose')(config);
//require('./server/config/passport')();
//require('./server/config/routes')(app);

//app.listen(config.port);
//console.log("Server running on port: " + config.port);

app.listen(3000);
console.log("Server running on port: " + 3000);