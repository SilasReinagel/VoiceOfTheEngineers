const mongoose = require('mongoose');
//const { getMongoConfig } = require('../lib/secrets');
require('dotenv').config(); 
const { Suggestion } = require('../models/suggestion');

const handler = async function (event, context) {
    const MongoURI = process.env.MONGO_CONNECTION_STRING; //await getMongoConfig();

    context.callbackWaitsForEmptyEventLoop = false;

    let conn;

    if (conn == null) {
        mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        conn = mongoose.connection;
        conn.once('open', (conn) => console.log('Connected to Mongo instance.'));
        conn.on('error', error => console.log('Error connecting to Mongo:', error));
    }

    const { suggestionId, userId } = event;

    const filter = { _id: suggestionId };   
    
    let { upvotes = [] } = await Suggestion.findOne(filter);

    upvotes = upvotes.includes(userId) ? upvotes.filter(vote => vote !== userId) : [ ...upvotes, userId ];

    const updatedSuggestion = await Suggestion.findOneAndUpdate(filter, { upvotes }, { new: true });

    return updatedSuggestion;
}

module.exports.handler = handler;