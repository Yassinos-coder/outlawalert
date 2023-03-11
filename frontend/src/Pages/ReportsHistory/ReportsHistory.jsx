import './ReportsHistory.css'
import React from 'react'
import Header from '../../Components/Header/Header'
import { useSelector } from 'react-redux'

const ReportsHistory = () => {
  const AllUserReports = useSelector((state) => state.ReportReducer.UserReports)
  return (
    <>
        <div className="reportHistory">
          <Header /> 
          <div className="reportBody">
            <button className='clearAllReports'>Clear All Reports</button>
            <table className='tableMaster'>
              <thead className='tableMasterHead'>
                <tr>
                  <td># ID</td>
                  <td>Report Date</td>
                  <td>Report Context</td>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>   
        </div> 
    </>
  )
}

export default ReportsHistory
