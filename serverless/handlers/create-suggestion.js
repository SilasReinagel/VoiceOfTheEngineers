const aws = require('aws-sdk');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const { getMongoConfig } = require('../lib/secrets');
const { Suggestion } = require('../models/suggestion');

let conn = null;


exports.handler = async function (event, context) {
    const MongoURI = await getMongoConfig();

    context.callbackWaitsForEmptyEventLoop = false;

    if (conn == null) {
        mongoose.connect(MongoURI, { useNewUrlParser: true });
        conn = mongoose.connection
            .once('open', (conn) => console.log('Connected to Mongo instance.'))
            .on('error', error => console.log('Error connecting to Mongo:', error));
    }

    const { userId, title, description } = event;

    const suggestion = { 
        id: uuidv4(),
        userId,
        title,
        description,
        upvotes: []
    };

    const result = await new Suggestion(suggestion).save();

    return result;
}

