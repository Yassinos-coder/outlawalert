import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AxiosConfig from '../Helpers/AxiosConfig'

export const getAllUserReports = createAsyncThunk('reports/getAllUserReports', async({uuid}) => {
    try {
        const response = await AxiosConfig.post('/report/GetUserAllReport', uuid)
        return response.data
    } catch (err) {
        console.error(`Error in getAllUserReports reducer ${err}`)
    }
})

export const addReport = createAsyncThunk('reports/addReport', async({newReport}) => {
    try {
        const response = await AxiosConfig.post('/report/AddReport', newReport)
        return response.data
    } catch (err) {
        console.error(`Error in addReport Reducer ${err}`)
    }
})


const ReportReducer = createSlice({
    name:'ReportHandler',
    initialState : {
        UserReports: [],
        status: null,
        error: null,
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(getAllUserReports.fulfilled,  (state, action) => {
                state.UserReports = action.payload
                state.status = 'accepted'
            })
            .addCase(getAllUserReports.pending,  (state) => {
                state.status = 'pending'
            })
            .addCase(getAllUserReports.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(addReport.fulfilled,  (state, action) => {
                state.UserReports = [...state.UserReports, action.payload]
                state.status = 'accepted'
            })
            .addCase(addReport.pending,  (state) => {
                state.status = 'pending'
            })
            .addCase(addReport.rejected, (state) => {
                state.status = 'rejected'
            })
    },
})

export default ReportReducer.reducer