import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AxiosConfig from '../Helpers/AxiosConfig'

export const AddUser = createAsyncThunk('user/AddUser', async(newUserData) => {
    try {
        console.log(newUserData)
        const response = await AxiosConfig.post('/user/newUser', newUserData )
        return response.data
    } catch (err) {
        console.error(`AddUser Reducer ${err}`)
    }
})

export const LogIn = createAsyncThunk('/user/LogIn', async(logInCreds) => {
    try {
        const response = await AxiosConfig.post('/user/LogIn', logInCreds)
        return response.data
    } catch (err) {
        console.error(`Error in LogIn Reducer ${err}`)
    }
})


const UserReducer = createSlice({
    name:'UserHandler',
    initialState : {
        userData: [],
        userInfoForVerif: [],
        status: '',
        error: '',
    },
    reducer:{},
    extraReducers: (builder) => {
        builder
            .addCase(AddUser.fulfilled, (state, action ) => {
                state.userInfoForVerif = action.payload
                state.status = 'accepted'
            })
            .addCase(AddUser.pending, (state ) => {
                state.status = 'pending'
            })
            .addCase(AddUser.rejected, (state ) => {
                state.status = 'rejected'
            })
            .addCase(LogIn.fulfilled, (state, action) => {
                state.userData = action.payload
                state.status = 'accepted'
            })
            .addCase(LogIn.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(LogIn.rejected, (state ) => {
                state.status = 'rejected'
            })
    }
})

export default UserReducer.reducer