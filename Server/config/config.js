var path = require('path');
var rootPath = path.normalize(__dirname + '/../../')

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://admin:123456@ds033380.mongolab.com:33380/jokebook',
        //db: 'mongodb://localhost:27017/Jokebook',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:123456@ds033380.mongolab.com:33380/jokebook',
        port: process.env.PORT || 3030
    }
};
