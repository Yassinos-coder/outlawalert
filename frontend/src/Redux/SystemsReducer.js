import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import AxiosConfig from '../Helpers/AxiosConfig'


export const GetSystemHealth = createAsyncThunk('sys/GetSystemHealth', async() => {
    try {
        const response = await AxiosConfig.get('/backStatus')
        return response.data
    } catch (err) {
        console.error(`Error in GetSystemHealth ${err}`)
    }
})


const SystemReducer = createSlice({
    name:'SystemHandler', 
    initialState : {
        SystemStatus:[],
        status: '',
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder 
            .addCase(GetSystemHealth.fulfilled, (state, action) => {
                state.SystemStatus = action.payload
                state.status = 'accepted'
            })
            .addCase(GetSystemHealth.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(GetSystemHealth.rejected, (state, action) => {
                state.error = action.payload
                state.status = 'rejected'
            })
    },
})

export default SystemReducer.reducer