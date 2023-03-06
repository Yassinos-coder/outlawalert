import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import NotFound from './Pages/NotFound/NotFound'
import AboutUs from './Pages/AboutUs/AboutUs'
import SignUp from './Components/SignUp/SignUp'
import SignIn from './Components/SignIn/SignIn'
import PrivateRoute from './PrivateRoute'
import HomeDash from './Pages/HomeDash/HomeDash'
import AccountVerif from './Pages/AccountVerif/AccountVerif'


const App = () => {
  return (
    <div className='app'>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<NotFound />} />
            <Route index element={<HomePage />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/AccountVerification' element={<AccountVerif />} />
            <Route path='/AboutUs' element={<AboutUs />} />
            <Route element={<PrivateRoute/>}>
              <Route path='/Dashboard/:userid/' element={<HomeDash />}>
                
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App