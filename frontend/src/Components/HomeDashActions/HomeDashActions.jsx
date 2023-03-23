import './HomeDashActions.css'
import React from 'react'
import { Link } from 'react-router-dom'
import StyledButton2 from '../../Helpers/StyledButton2'

const HomeDashActions = () => {
  return (
    <div className='HomeDashActions'>
      <h2 className="p-text-HomeDashActions">
        Be a good citizen <br /> make your community safer !
      </h2>
      <div className="HomeDashActionsBody">
        <div className="itemButton1">
          <Link to="ShowOtherReports">
            <StyledButton2 btnType="submit" btnText="Show Other Reports" />
          </Link>
        </div>
        <div className="itemButton2">
          <Link to="SubmitPublicReport">
            <StyledButton2 btnType="submit" btnText="Submit A Public Report" />
          </Link>
        </div>
        <div className="itemButton3">
          <Link to="SubmitAnonymeReport">
            <StyledButton2
              btnType="submit"
              btnText="Submit An Anonymous Report"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomeDashActions
