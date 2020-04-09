
const moment = require('moment');

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Session Schema
 */

const VideoSessionSchema = new Schema({
    id: String,
    userId: String,
    createdAt: {type: Date, default: moment()},
    state: String
});



/**
 * Methods
 */

VideoSessionSchema.methods = {

    uploadAndSave: function (session) {
        return this.save();

    },
    //creates the object if it doesnt exists
    upsert: function(session) {
        this.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
            if (err) return res.send(500, { error: err });
            return res.send("succesfully saved");
        });

    },

};

/**
 * Statics
 */

VideoSessionSchema.statics = {

    /**
     * Find article by id
     *
     * @param {ObjectId} id
     * @api private
     */

    load: function (_id) {
        return this.findOne({_id})
        // .populate('user', 'name email username')
        // .populate('comments.user')
            .exec();
    },

    loadBySessionId: function (sessionId) {
        return this.findOne({'sessionId': sessionId})
            .exec();
    },

    loadIntents: function () {
        var start = new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)));
        return this.aggregate([
            {
                $match: {
                    'createdAt': {$gte: start}
                }
            },
            { "$unwind": "$messages" },
            {$group: {_id: "$messages.intent", count: {$sum: 1}}},
            {$sort: {'count': -1}},
            {$limit: 100}
        ]);
    },

    loadByUser: function (userId) {
        return this.findOne({'userId': userId})
            .exec();
    },

    loadByName: function (name) {
        return this.find({'user.name': name})
            .exec();
    },
    getQueryById: function (id) {
        return { 'user.id': id };
    },

    /**
     * List articles
     *
     * @param {Object} options
     * @api private
     */

    list: function (options) {
        const criteria = options.criteria || {};
        const page = options.page || 0;
        const limit = options.limit || 50;
        return this.find({'isHumanConversation': {$ne: true}})
        // .populate('user', 'name username')
            .sort({createdAt: -1})
            .limit(limit)
            .skip(limit * page)
            .exec();
    }
};

const VideoSession = mongoose.model('VideoSession', VideoSessionSchema);

module.exports = VideoSession;
