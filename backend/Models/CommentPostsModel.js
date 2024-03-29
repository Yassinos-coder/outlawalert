const  mongoose  = require('mongoose')
const db = require('mongoose')

const commentPostsModel = db.Schema({
    reportID : {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Reports'
    },
    commenterID : {
        type: mongoose.Types.ObjectId,
        required: true,
        ref:'Users'
    },
    comment : {
        type:'String',
        required: true,
    },
    commenterUsername : {
        type: 'String',
        required: true
    },
})

const CommentPostsModel =  mongoose.model('CommentsOnPost', commentPostsModel)
module.exports = CommentPostsModel