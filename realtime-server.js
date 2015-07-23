var environment = require('./environment.js');
var redis = environment.loadRedis();
environment.loadSocketIo(redis);
