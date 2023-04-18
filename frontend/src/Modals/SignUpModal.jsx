class SignUpModal {
    constructor ( 
        avatar='noavatar', firstname ='', lastname='', username='',
        cin='', address='', email='', phonenumber='', dob='', tokenExpirationDate='', userToken='',isVerified='false',
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
        this.tokenExpirationDate= tokenExpirationDate
        this.userToken = userToken
        this.isVerified = isVerified
        this.password = password
    }
}

export default SignUpModal