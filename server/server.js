'use strict';


/**
 * Load Twilio configuration from .env config file - the following environment
 * variables should be set:
 * process.env.TWILIO_ACCOUNT_SID
 * process.env.TWILIO_API_SID
 * process.env.TWILIO_API_SECRET
 */
require('dotenv').load();
const {v4: uuidv4} = require('uuid');


var path = require('path');
var cors = require('cors');
const bodyParser = require("body-parser");
var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;
var VoiceGrant = AccessToken.VoiceGrant;

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const videoController = require('./app/controllers/video.controller')(io);

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json());

// Max. period that a Participant is allowed to be in a Room (currently 14400 seconds or 4 hours)
const MAX_ALLOWED_SESSION_DURATION = 14400;

// Create Express webapp.
const whitelist = ['http://localhost:8080', 'http://example2.com'];
const corsOptions = {
    credentials: true, // This is important.
    origin: (origin, callback) => {
        // if(whitelist.includes(origin))
        return callback(null, true)

        // callback(new Error('Not allowed by CORS'));
    }
}

app.use(cors(corsOptions));


/**
 * Default to the Quick Start application.
 */
app.get('/', (request, response) => {
    response.redirect('/test');
});


app.get('/test', videoController.test);
app.get('/sessions', videoController.index);

/**
 * Generate an Access Token for a chat application user - it generates a random
 * username for the client requesting a token, and takes a device ID as a query
 * parameter.
 */
app.get('/token', function (request, response) {
    var identity = request.query.identity || uuidv4();
    console.log('identity is ' + identity);
    var id = request.query.id;
    var userType = request.query.userType;

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created.
    var token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET,
        {ttl: MAX_ALLOWED_SESSION_DURATION}
    );

    // Assign the generated identity to the token.
    token.identity = identity;

    // Grant the access token Twilio Video capabilities.
    var grant;
    if (userType === 'admin') {
        grant = new VideoGrant();
    } else {
        grant = new VideoGrant();
    }
    token.addGrant(grant);
    response.send({
        identity: identity,
        token: token.toJwt()
    });
});

app.post('/session', (req, res) => {

})

// Create http server and run it.

io.origins((origin, callback) => {
    if (origin === 'https://foo.example.com') {
        return callback('origin not allowed', false);
    }
    callback(null, true);
});


io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('delete_room', function (id) {
        console.log('deleting room: ' + id);
        videoController.deleteSession(id);
    });
});

http.listen(app.get('port'), () => {
    console.log('App is running at http://localhost:' + app.get('port'));
    console.log('  Press CTRL-C to stop\n');
});
