import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import NotFound from './Pages/NotFound/NotFound'
import AboutUs from './Pages/AboutUs/AboutUs'
import SignUp from './Components/SignUp/SignUp'
import SignIn from './Components/SignIn/SignIn'


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
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App