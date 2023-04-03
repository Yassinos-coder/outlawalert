const {Router} = require('express')
const CommentPostsModel = require('../Models/CommentPostsModel')
const CommentsOnPostAPI = Router()
const UserModel = require('../Models/UserModel')
const { JWT } = require('../Helpers/jwtConfig')

CommentsOnPostAPI.post('/comments/AddComment', JWT, async(req, res ) => {
    let commentData = req.body
    try {
        const usernameOfCommenter = await UserModel.findOne({_id: commentData.commenterID}, {username:1})
        commentData.commenterUsername = usernameOfCommenter.username
        const newComment = new CommentPostsModel(commentData)
        const newCommentAfterSave = await newComment.save()
        res.send({
            message:'success',
            comments: newCommentAfterSave
        })
    } catch (err) {
        console.error(`Error in ComentsAPI ${err}`)
    }
})


CommentsOnPostAPI.get('/comments/getAllComments/:reportID', JWT, async(req, res) => {
    let reportID = req.params.reportID
    try {
        const comments = await CommentPostsModel.find({reportID: reportID})
        res.send(comments)
    } catch (err) {
        console.error(`Error in getAllComments ${err}`)
    }
})

CommentsOnPostAPI.post('/comments/DeleteComments/:reportID/:commentID', JWT, async(req, res) => {
    let commentID = req.params.commentID
    let reportID = req.params.reportID

    try {
        await CommentPostsModel.deleteOne({_id: commentID})
        const updatedList = await CommentPostsModel.find({reportID: reportID})
        res.send(updatedList) 
    } catch (err) {
        console.error(`Error in DeleteComments ${err}`)
    }
})

module.exports = CommentsOnPostAPI