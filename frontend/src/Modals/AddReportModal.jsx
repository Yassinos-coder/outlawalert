class AddReportModal {
    constructor (
        reporter ='', reportSubject ='', reportMessage='', reportMediaAttachement='', 
        reportLocationCoords='', reportDate='', isReportAnonyme=''
    ) {
        this.reporter = reporter
        this.reportSubject = reportSubject
        this.reportMessage = reportMessage
        this.reportMediaAttachement = reportMediaAttachement
        this.reportLocationCoords = reportLocationCoords
        this.reportDate = reportDate
        this.isReportAnonyme = isReportAnonyme
    }
}

export default AddReportModal