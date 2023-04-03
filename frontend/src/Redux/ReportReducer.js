import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AxiosConfig from '../Helpers/AxiosConfig'

export const getAllUserReports = createAsyncThunk('reports/getAllUserReports', async({uuid}) => {
    try {
        const response = await AxiosConfig.get(`/report/GetUserAllReport/${uuid}`)
        return response.data
    } catch (err) {
        console.warn(`Error in getAllUserReports reducer ${err}`)
    }
})

export const getAllReports = createAsyncThunk('reports/getAllReports', async() => {
    try {
        const response = await AxiosConfig.get('/report/getAllReport')
        return response.data
    } catch (err) {
        console.warn(`Error in getAllReports in reducer ${err}`)
    }
})

export const addReport = createAsyncThunk('reports/addReport', async({newReport}) => {
    try {
        const response = await AxiosConfig.post('/report/AddReport', newReport)
        return response.data
    } catch (err) {
        console.warn(`Error in addReport Reducer ${err}`)
    }
})

export const uploadMediaAttachement = createAsyncThunk('reports/uploadMediaAttachement', async({userid, files}) => {
    try {
        console.log(files)
        const response = await AxiosConfig.post(`/report/UploadMediaOfReports/${userid}`, files)
        return response.data
    } catch (err) {
        console.warn(`Error in FilesUpload Reducer ${err}`)
    }
})

export const deleteAllReports = createAsyncThunk('reports/deleteAllReports', async({uuid}) => {
    try {
        const response = await AxiosConfig.post(`/report/DeleteAllReports/${uuid}`)
        return response.data
    } catch (err) {
        console.warn(`Error in deleteAllReports ${err}`)
    }
})

const ReportReducer = createSlice({
    name:'ReportHandler',
    initialState : {
        UserReports: [],
        AllReports: [],
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
            .addCase(uploadMediaAttachement.fulfilled,  (state) => {
                state.status = 'accepted'
            })
            .addCase(uploadMediaAttachement.pending,  (state) => {
                state.status = 'pending'
            })
            .addCase(uploadMediaAttachement.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(getAllReports.fulfilled,  (state, action) => {
                state.status = 'accepted'
                state.AllReports = action.payload
            })
            .addCase(getAllReports.pending,  (state) => {
                state.status = 'pending'
            })
            .addCase(getAllReports.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(deleteAllReports.fulfilled,  (state, action) => {
                state.status = 'accepted'
                state.AllReports = action.payload.listAfterDelete
            })
            .addCase(deleteAllReports.pending,  (state) => {
                state.status = 'pending'
            })
            .addCase(deleteAllReports.rejected, (state) => {
                state.status = 'rejected'
            })
    },
})

export default ReportReducer.reducer