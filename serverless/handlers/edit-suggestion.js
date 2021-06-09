const mongoose = require('mongoose');
//const { getMongoConfig } = require('../lib/secrets');
const { Suggestion } = require('../models/suggestion');

const handler = async function (event, context) {
    const MongoURI = 'mongodb+srv://noah:Illlauren94@cluster0.9ovld.mongodb.net/test?retryWrites=true&w=majority';//await getMongoConfig();

    //context.callbackWaitsForEmptyEventLoop = false;

    let conn;

    if (conn == null) {
        mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        conn = mongoose.connection;
        conn.once('open', (conn) => console.log('Connected to Mongo instance.'));
        conn.on('error', error => console.log('Error connecting to Mongo:', error));
    }

    const { suggestionId, title, description } = event;
    const filter = { _id: suggestionId };   
    
    const suggestion = await Suggestion.findOne(filter);
    suggestion.title = title;
    suggestion.description = description;

    console.log("Suggestion: " + suggestion);

    await suggestion.save();

    return suggestion;
}

handler({ suggestionId: '60c0e2d1d538c518b154f24c', title: 'new title', description: 'new description' }, {});

module.exports.handler = handler;