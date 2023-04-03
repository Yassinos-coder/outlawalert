class CommentModal {
    constructor (commenterID = '', reportID='', comment='', commenterUsername='' ) {
        this.commenterID = commenterID
        this.reportID = reportID
        this.comment = comment
        this.commenterUsername = commenterUsername
    }
}

export default CommentModal