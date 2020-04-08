const uuid = require('uuid');


exports.test = (req, res) => {
    res.json({
        test: 'a test'
    });
};

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

