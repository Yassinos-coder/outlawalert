import React from 'react';
import './Helpers.css'

const StyledButton2 = React.memo(({ btnType, btnText, onClick, overrideStyleBtn2 }) => (
  <button style={overrideStyleBtn2} className="btn2" type={btnType} onClick={onClick}>
    {btnText}
  </button>
));


export default StyledButton2;
