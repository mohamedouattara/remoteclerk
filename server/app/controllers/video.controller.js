const uuid = require('uuid');
const moment = require('moment')


exports.test = (req, res) => {
    res.json({
        test: 'a test'
    });
};

exports.saveSession = (req, res) => {
    const body = req.body;
    const session = new VideoSession();
    session.id = body.id;
    session.state = 'OPEN';
    session.uploadAndSave()
}

exports.index = (req, res) =>  {
    const page = (req.query.page > 0 ? req.query.page : 1) - 1;
    const _id = req.query.item;
    const limit = 25;
    const options = {
        limit: limit,
        page: page
    };

    if (_id) options.criteria = {_id};

    const sessions =  VideoSession.list(options);

    res.json({
        title: 'Sessions',
        sessions: sessions,
    });
};

