import {  configureStore  } from '@reduxjs/toolkit'
import UserReducer from './UserReducer'
import SystemsReducer from './SystemsReducer'

const Store = configureStore({
    reducer : {
        UserReducer: UserReducer,
        SystemsReducer: SystemsReducer,
    }
})

export default Store