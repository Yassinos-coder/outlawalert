import {  configureStore  } from '@reduxjs/toolkit'
import UserReducer from './UserReducer'

const Store = configureStore({
    reducer : {
        UserReducer: UserReducer,
    }
})

export default Store