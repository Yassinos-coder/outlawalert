import {  configureStore  } from '@reduxjs/toolkit'
import UserReducer from './UserReducer'
import SystemsReducer from './SystemsReducer'
import ReportReducer from './ReportReducer'

const Store = configureStore({
    reducer : {
        UserReducer: UserReducer,
        SystemsReducer: SystemsReducer,
        ReportReducer: ReportReducer,
    }
})

export default Store