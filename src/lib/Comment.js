const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: String,
        default: "Anonymous"
    },
    matchId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ALL-MATCHES'
    },
    commentedAt: {
        type: Date,
        default: Date.now
    }
});

// Check if the model exists before creating a new one
const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

module.exports = Comment;
