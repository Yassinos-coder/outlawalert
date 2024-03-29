import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import NotFound from './Pages/NotFound/NotFound'
import AboutUs from './Pages/AboutUs/AboutUs'
import SignUp from './Components/SignUp/SignUp'
import SignIn from './Components/SignIn/SignIn'
import PrivateRoute from './PrivateRoute'
import HomeDash from './Pages/HomeDash/HomeDash'
import ReportsHistory from './Pages/ReportsHistory/ReportsHistory'
import SubmitPublicReport from './Components/SubmitPublicReport/SubmitPublicReport'
import HomeDashActions from './Components/HomeDashActions/HomeDashActions'
import SubmitAnonymeReport from './Components/SubmitAnonymeReport/SubmitAnonymeReport'
import ShowOtherReports from './Components/ShowOtherReports/ShowOtherReports'
import Post from './Components/Post/Post'
import MyAccount from './Pages/MyAccount/MyAccount'
import ResetPassword from './Pages/ResetPassword/ResetPassword'


const App = () => {
  return (
    <div className='app'>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<NotFound />} />
            <Route index element={<HomePage />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/AboutUs' element={<AboutUs />} />
            <Route path="/resetCredentials/:userid/:userGenToken" element={<ResetPassword />}/>
            <Route element={<PrivateRoute/>}>
              <Route path="/ReportsHistory/:userid/" element={<ReportsHistory />} />
              <Route path='/Dashboard/:userid/' element={<HomeDash />}>
                <Route index element={<HomeDashActions />}/>
                <Route path="SubmitPublicReport" element={<SubmitPublicReport />}/>
                <Route path="SubmitAnonymeReport" element={<SubmitAnonymeReport />}/>
                <Route path="ShowOtherReports" element={<ShowOtherReports />}/>
              </Route>
              <Route path="Reports/:reportID" element={<Post />} />
              <Route path="/MyAccount/:uuid" element={<MyAccount />}/>
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App