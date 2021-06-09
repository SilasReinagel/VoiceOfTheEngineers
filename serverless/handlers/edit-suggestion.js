const mongoose = require('mongoose');
//const { getMongoConfig } = require('../lib/secrets');
const { Suggestion } = require('../models/suggestion');

const handler = async function (event, context) {
    const MongoURI = 'mongodb+srv://noah:Illlauren94@cluster0.9ovld.mongodb.net/test?retryWrites=true&w=majority';//await getMongoConfig();

    context.callbackWaitsForEmptyEventLoop = false;

    let conn;

    if (conn == null) {
        mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        conn = mongoose.connection;
        conn.once('open', (conn) => console.log('Connected to Mongo instance.'));
        conn.on('error', error => console.log('Error connecting to Mongo:', error));
    }

    const { authorId, title, description } = event;
    const suggestion = await Suggestion.find({authorId}).exec().catch(e => console.error(e));

    console.log(suggestion);
    
    const updatedSuggestion = {
        id: suggestion.id,
        authorId: suggestion.authorId,
        title: title,
        description: description,
        upvotes: suggestion.upvotes,
        createdOn: suggestion.createdOn,
        updatedOn: new Date()
    };
    
    return await new Suggestion(updatedSuggestion).save();
}

handler({ id: 'xxx', title: 'doof', authorId: 'adfasdf', description: 'asdfasdf' }, {});

module.exports.handler = handler;