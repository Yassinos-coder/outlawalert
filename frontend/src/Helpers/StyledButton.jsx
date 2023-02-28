import './Helpers.css'

const StyledButton = (props) => {
  return <button style={props.overrideStyle} onClick={props.handler} className="btn" type={props.btnType} >{props.btnText}</button>;
};

export default StyledButton;
