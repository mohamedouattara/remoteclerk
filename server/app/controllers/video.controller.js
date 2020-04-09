const uuid = require('uuid');
const moment = require('moment');


module.exports = function (io) {
    var module = {};
    module.test = (req, res) => {
        res.json({
            test: 'a test'
        });
    };

    module.saveSession = (req, res) => {
        const body = req.body;
        console.log('received body' + body);
        const session = new VideoSession();
        session.id = body.id;
        session.state = 'OPEN';
        // TODO save to firebase
        io.emit('client_room_created', {id: session.id}); // This will emit the event to all connected sockets
        res.sendStatus(200);
    };

    module.deleteSession = (_id) => {

    };

    module.index = (req, res) => {
        const page = (req.query.page > 0 ? req.query.page : 1) - 1;
        const _id = req.query.item;
        const limit = 25;
        const options = {
            limit: limit,
            page: page
        };

        if (_id) options.criteria = {_id};

    };


    return module;
};
