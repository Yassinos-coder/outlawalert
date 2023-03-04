class SignUpModal {
    constructor ( 
        avatar='default.png', firstname ='', lastname='', username='',
        cin='', address='', email='', phonenumber='', dob='', verification='false',
        password=''
    ){
        this.avatar = avatar
        this.firstname = firstname
        this.lastname = lastname
        this.username = username
        this.cin = cin
        this.address = address
        this.email = email
        this.phonenumber = phonenumber
        this.dob = dob
        this.verification = verification
        this.password = password
    }
}

export default SignUpModal