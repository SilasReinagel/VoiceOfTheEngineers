const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


//const { getMongoConfig } = require('../lib/secrets');
const { Suggestion } = require('./suggestion');

let conn = null;

const handler = async function (event, context) {
    const MongoURI = process.env.MONGO_CONNECTION_STRING; //await getMongoConfig();

    context.callbackWaitsForEmptyEventLoop = false;

    if (conn == null) {
        mongoose.connect(MongoURI, { useNewUrlParser: true });
        conn = mongoose.connection
            .once('open', (conn) => console.log('Connected to Mongo instance.'))
            .on('error', error => console.log('Error connecting to Mongo:', error));
    }

    const { authorId } = event;

    const result = await Suggestion.find({authorId});

    console.log('RESULT', result);

    return result;
}

// handler({authorId: 'xyz'}, {});

module.exports.handler = handler;