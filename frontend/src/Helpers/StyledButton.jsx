import React from 'react';
import './Helpers.css'

const StyledButton = React.memo(({ btnType, btnText, onClick, overrideStyle }) => (
  <button style={overrideStyle} className="btn" type={btnType} onClick={onClick}>
    {btnText}
  </button>
));


export default StyledButton;
