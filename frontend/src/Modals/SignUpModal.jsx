class SignUpModal {
    constructor ( 
        firstname ='', lastname='', username=`${firstname}.${lastname}`,
        cin='', address='', email='', phonenumber='', dob='', verification='false',
        password=''
    ){
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