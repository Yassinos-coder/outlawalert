import "./SignUp.css";
import logo from "../../assets/img/logo.png";
import StyledButton from "../../Helpers/StyledButton";

const SignUp = () => {
  return (
    <>
      <div className="signup">
        <div className="logo-su-div">
          <img src={logo} alt="" className="logo-su" />
        </div>
        <div className="signUp">
            <p style={{color:'red', textAlign:'center', paddingTop:'2%'}}>* Please make sure your data is correct.</p>
          <div className="inputs">
            <label htmlFor="fn">Prènom</label>
            <input type="text" required='true' name="fn" placeholder="Prènom" />
            <label htmlFor="ln">Nom</label>
            <input type="text" required='true' name="ln" placeholder="Nom" />
            <label htmlFor="cin">CIN</label>
            <input type="text" required='true' name="cin" placeholder="CIN" />
            <label htmlFor="dob">DOB</label>
            <input type="text" required='true' name="dob" placeholder="DOB" />
            <label htmlFor="addr">Addresse</label>
            <input type="text" required='true' name="addr" placeholder="Addresse" />
            <label htmlFor="email">E-mail</label>
            <input type="email" required='true' name="email" placeholder="E-mail" />
            <label htmlFor="pn">Phone Number</label>
            <input type="text" required='true' name="pn" placeholder="Phone Number" />
            <label htmlFor="pass">Password</label>
            <input type="password" required='true' name="pass" placeholder="Password" />
          </div>
        </div>
        <div className="btnSubmit">
            <StyledButton btnType='text' btnText='Sign Up' />
        </div>
      </div>
    </>
  );
};

export default SignUp;
