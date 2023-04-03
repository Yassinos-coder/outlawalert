import {  configureStore  } from '@reduxjs/toolkit'
import UserReducer from './UserReducer'
import SystemsReducer from './SystemsReducer'
import ReportReducer from './ReportReducer'
import CommentsReducer from './CommentsReducer'

const Store = configureStore({
    reducer : {
        UserReducer: UserReducer,
        SystemsReducer: SystemsReducer,
        ReportReducer: ReportReducer,
        CommentsReducer: CommentsReducer,
    }
})

export default Store