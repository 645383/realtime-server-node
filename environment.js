module.exports = {
    
    loadSocketIo: function loadSocketIo(redis) {
        var port = 5001;
        console.log('STARTING ON PORT: ' + port);

        var io = require('socket.io').listen(Number(port));

        io.on('connection', function(socket) {
            socket.on('realtime_user_id_connected', function(message) {
                console.log('User ID connected: ' + message.userId);
            });

            redis.sub.on('message', function(channel, message) {
                msg = JSON.parse(message);
                delete msg.recipient_user_ids;
                socket.emit('realtime_msg', msg);
            });
        });
        return io;
    },

    loadRedis: function loadRedis() {
        var redis = require('redis');
        var redisSub = redis.createClient();

        redisSub.subscribe('realtime_msg');

        return {
            sub: redisSub
        };
    }
};
