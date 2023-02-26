import './Helpers.css'

const StyledButton = (props) => {
  return <button style={props.overrideStyle} onClick={props.handler} class="btn" type={props.btnType} >{props.btnText}</button>;
};

export default StyledButton;
