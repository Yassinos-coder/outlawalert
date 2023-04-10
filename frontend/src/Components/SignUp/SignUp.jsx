import "./SignUp.css";
import StyledButton from "../../Helpers/StyledButton";
import { useState } from "react";
import SignUpModal from "../../Modals/SignUpModal";
import {useDispatch} from 'react-redux'
import { AddUser } from "../../Redux/UserReducer";
import {useNavigate} from 'react-router-dom'
import AlertPoPUp from '../../Helpers/AlertPopUp'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [newSignUp, setNewSignUp] = useState(new SignUpModal())
  const [UserAlreadyExist, setUserAlreadyExist] = useState(false)
  const [AccountSuccessCreation, setAccountSuccessCreation] = useState(false)

  const handleSignUp = () => {
    console.log(newSignUp)
    dispatch(AddUser(newSignUp)).then((response) => {
      if (response.payload === 'userExists') {
        setUserAlreadyExist(true)
      } else if (response.payload.message === 'AccountCreatedSuccess') { 
        setAccountSuccessCreation(true)
      }
      setTimeout(() => {
        navigate('/')
      }, 1000);
    }).catch((err) => {
      console.warn('Error in handleSignup', err)
    })
  }

  return (
    <>
      <div className="signup">
        <div className="alert">
          <AlertPoPUp alertTitle='Sign Up Error' alertMsg='This user already exists.' alertType='warning' alertVisible={UserAlreadyExist ===true ? true : false} />
          <AlertPoPUp alertTitle='Sign Up Success' alertMsg='Account Succesfuly Created.' alertType='success' alertVisible={AccountSuccessCreation === true ? true : false} />
        </div>
        <div className="signUp">
            <p style={{color:'red', textAlign:'center', paddingTop:'2%'}}>* Please make sure your data is correct.</p>
          <div className="inputs">
            <label htmlFor="fn">Prènom</label>
            <input type="text" required={true} name="fn" placeholder="Prènom" 
              onChange={(e) => {setNewSignUp({...newSignUp, firstname: e.currentTarget.value})}}
            />
            <label htmlFor="ln">Nom</label>
            <input type="text" required={true} name="ln" placeholder="Nom" onChange={(e) => {setNewSignUp({...newSignUp, lastname: e.currentTarget.value})}}
            />
            <label htmlFor="cin">CIN</label>
            <input type="text" required={true} name="cin" placeholder="CIN" onChange={(e) => {setNewSignUp({...newSignUp, cin: e.currentTarget.value})}}
            />
            <label htmlFor="dob">DOB</label>
            <input type="date" required={true} name="dob" placeholder="DOB" onChange={(e) => {setNewSignUp({...newSignUp, dob: e.currentTarget.value})}}
            />
            <label htmlFor="addr">Addresse</label>
            <input type="text" required={true} name="addr" placeholder="Addresse" onChange={(e) => {setNewSignUp({...newSignUp, address: e.currentTarget.value})}}
            />
            <label htmlFor="email">E-mail</label>
            <input type="email" required={true} name="email" placeholder="E-mail" onChange={(e) => {setNewSignUp({...newSignUp, email: e.currentTarget.value})}}
            />
            <label htmlFor="pn">Phone Number</label>
            <input type="text" required={true} name="pn" placeholder="Phone Number" onChange={(e) => {setNewSignUp({...newSignUp, phonenumber: e.currentTarget.value})}}
            />
            <label htmlFor="pass">Password</label>
            <input type="password" required={true} name="pass" placeholder="Password" onChange={(e) => {setNewSignUp({...newSignUp, password: e.currentTarget.value})}}
            />
          </div>
        </div>
        <div className="btnSubmit">
            <StyledButton btnType='button' btnText='Sign Up' onClick={handleSignUp} />
        </div>
      </div>
    </>
  );
};

export default SignUp;
