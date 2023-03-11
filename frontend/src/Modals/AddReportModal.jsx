class AddReportModal {
    constructor (
        reporter ='', reportTitle='', reportSubject ='', reportMessage='', reportMediaAttachement='', 
        reportLocationCoords='', reportDate='', isReportAnonyme=''
    ) {
        this.reporter = reporter
        this.reportTitle = reportTitle
        this.reportSubject = reportSubject
        this.reportMessage = reportMessage
        this.reportMediaAttachement = reportMediaAttachement
        this.reportLocationCoords = reportLocationCoords
        this.reportDate = reportDate
        this.isReportAnonyme = isReportAnonyme
    }
}

export default AddReportModal