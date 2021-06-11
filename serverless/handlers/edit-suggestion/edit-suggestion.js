const mongoose = require('mongoose');
//const { getMongoConfig } = require('../lib/secrets');
require('dotenv').config(); 
const { Suggestion } = require('./suggestion');

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

    const { suggestionId, title, description } = event;
    const filter = { _id: suggestionId };   
    
    const suggestion = await Suggestion.updateOne(filter, {title,description});

    return suggestion;
}

module.exports.handler = handler;