
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuggestionSchema = new Schema({
    authorId: { type: String },
    title: { type: String },
    description: { type: String },
    upvotes: [String],
    createdOn: { type: Date }
});


const Suggestion = mongoose.model('suggestion', SuggestionSchema);

module.exports = {
    Suggestion
}
