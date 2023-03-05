import React from 'react'
import logo from '../assets/img/logo.png'

const Loader = (props) => {
    /* Props TO PASS
        loadVisible
    */
  return (
    <div className="loaderDiv" style={props.loadVisible === true ? {} : {display:'none'}}>
        <div className="loaderSpin">
            <img className='logoLoader' src={logo} alt="Loader" />
        </div>
    </div>
  )
}

export default Loader
