const mongooes = require("mongoose");

const postSchema = new mongooes.Schema({
    imageText: {
        type: String,
        required: true

    },
    image: {
        type: String
    },
    user: {
        type: mongooes.Schema.Types.ObjectId,
        ref: 'user'
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Array,
        default: []
    }

});

module.exports = mongooes.model("post",postSchema);