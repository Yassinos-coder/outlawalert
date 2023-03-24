/* eslint-disable react-hooks/exhaustive-deps */
import './ShowOtherReports.css'
import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../Helpers/Loader'
import { getAllReports } from '../../Redux/ReportReducer'


const ShowOtherReports = () => {
    const dispatch = useDispatch()
    const pendingStatus = useSelector((state) => state.ReportReducer.status)
    const AllReports = useSelector((state) => state.ReportReducer.AllReports)

    
    useEffect(() => {
        dispatch(getAllReports())
    },[])

  return (
    <>
      <div className="showotherreports">
        <Loader loadVisible={pendingStatus === 'pending' ? true : false} />
        <div className="cmpTitle">
            Other Reports
        </div>
        <div className="reports">
            {
                AllReports.map((report, index) => (
                    <div key={index} className={`reportsDIV report${index}`}>
                        <p className='reportTitle'> {report.reportTitle} { report.isReportAnonyme ? (<p style={{ position:'absolute', top:'21px', left:'65px',fontSize:'15px', color:'grey'}}>Private Report</p>) : (<p>Public Report</p>)} </p>
                        <p className='reportSubject'> {report.reportSubject}, {report.reportDate}, à {report.reportLocationCoords}  </p>
                        <div className='reportMessageDIV'>
                            <p className='reportMessage'> {report.reportMessage} </p>
                            {
                                report.reportMediaAttachement.map((mediaFile, index) => (
                                    <img className='reportMediaAttachement' key={index} src={`http://192.168.4.4:8009/${mediaFile}`} alt="" />
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
      </div>
    </>
  )
}

export default ShowOtherReports
