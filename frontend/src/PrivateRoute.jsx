import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {

    let accessChecker = localStorage.getItem('bigKey') ? localStorage.bigKey : 'false'

    return (accessChecker === 'true' ? <Outlet /> : <Navigate to='/SignIn' />)
}

export default PrivateRoute