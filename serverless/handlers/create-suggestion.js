const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

//const { getMongoConfig } = require('../lib/secrets');
const { Suggestion } = require('../models/suggestion');

let conn = null;

const handler = async function (event, context) {
    const MongoURI = 'mongodb+srv://noah:Illlauren94@cluster0.9ovld.mongodb.net/test?retryWrites=true&w=majority';//await getMongoConfig();

    //context.callbackWaitsForEmptyEventLoop = false;

    if (conn == null) {
        mongoose.connect(MongoURI, { useNewUrlParser: true });
        conn = mongoose.connection
            .once('open', (conn) => console.log('Connected to Mongo instance.'))
            .on('error', error => console.log('Error connecting to Mongo:', error));
    }

    const { authorId, title, description } = event;

    const suggestion = { 
        authorId,
        title,
        description,
        upvotes: [],
        createdOn: new Date(),
        updatedOn: new Date()
    };

    const result = await new Suggestion(suggestion).save();

    return result;
}

module.exports.handler = handler;

handler({authorId: 'xyz', title: 'doof tilte', description: 'this is stuff'}, {});