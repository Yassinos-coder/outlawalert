import "./SignIn.css";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import StyledButton from "../../Helpers/StyledButton";

const SignIn = () => {
  return (
    <>
      <div className="signin">
        <div className="logo">
          <img className="logo-si" src={logo} alt="" />
        </div>

        <div className="login-box">
          <form>
            <div className="user-box">
              <input required="" name="" type="text" />
              <label>C.I.N</label>
            </div>
            <div className="user-box">
              <input required="" name="" type="password" />
              <label>Password</label>
            </div>
            <StyledButton btnType='text' btnText='Sign In' overrideStyle={{border:'1px red solid'}} />
          </form>
          <p>
            Don't have an account? <Link to="/SignUp">Sign up!</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
