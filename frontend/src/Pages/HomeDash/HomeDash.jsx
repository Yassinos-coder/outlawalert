import "./HomeDash.css";
import { useSelector } from "react-redux";
import StyledButton2 from '../../Helpers/StyledButton2'
import Header from "../../Components/Header/Header";

const HomeDash = () => {
  const userData = useSelector((state) => state.UserReducer.userData);

  return (
    <div className="homedash">
      <Header />
      <h2 className="p-text-bodyHomeDash">Be a good citizen <br /> make your community safer !</h2>
      <div className="bodyHomeDash">
        <div className="itemButton1">
          <StyledButton2 btnType='submit' btnText='Show Other Reports'/>
        </div>
        <div className="itemButton2">
          <StyledButton2 btnType='submit' btnText='Submit A Public Report'/>
        </div>
        <div className="itemButton3">
          <StyledButton2 btnType='submit' btnText='Submit An Anonymous Report'/>
        </div>
      </div>
    </div>
  );
};

export default HomeDash;
