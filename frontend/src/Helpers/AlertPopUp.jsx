import React, { useEffect, useState } from 'react'
import '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faCircleInfo, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

const AlertPopUp = (props) => {
    const [alertType, setAlertType] = useState(faCircleInfo)
    const [alertColor, setAlertColor] = useState('normal')
    const [isVisible, setVisible] = useState(false)
    /* Props List To PASS
        alertTitle
        alertMsg
        alertType
        alertVisible
    */

    useEffect(() => {
        setVisible(props.alertVisible)
        if (props.alertType === 'normal') {
            setAlertType(faCircleInfo)
        } else if (props.alertType === 'warning') {
            setAlertType(faTriangleExclamation)
        } else {
            setAlertType(faCircleExclamation)
        }
        if (props.alertType === 'normal') {
            setAlertColor('black')
        } else if (props.alertType === 'warning') {
            setAlertColor('yellow')
        } else {
            setAlertColor('red')
        }
        setInterval(() => {
            setVisible(false)
        }, 3000);

    }, [props.alertType, props.alertVisible])

  return (
    <div className={`alertpopup ${isVisible ===false ? 'alertHidden': ''}`} >
        <div className="alertBox">
            <div className="alertTitle">
                <FontAwesomeIcon style={{paddingRight:'5px', color: alertColor, fontSize:'1.2rem'}} icon={alertType} />
                {props.alertTitle}
            </div>
            <div className="alertMsg">
                <p> {props.alertMsg} </p>
            </div>
        </div>
    </div>
  )
}

export default AlertPopUp
