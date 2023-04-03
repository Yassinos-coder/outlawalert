import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AxiosConfig from '../Helpers/AxiosConfig'

export const AddComment = createAsyncThunk('comments/AddComment', async({commentData}) => {
    try {
        const response = await AxiosConfig.post('/comments/AddComment', commentData)
        return response.data
    } catch (err) {
        console.warn(`Err in AddComment reducer ${err}`)
    }
})

export const getAllCommentsOfReport = createAsyncThunk('comments/getAllCommentsOfReport', async({reportID}) => {
    try {
        const response = await AxiosConfig.get(`/comments/getAllComments/${reportID}`)
        return response.data
    } catch (err) {
        console.warn(`Error in getAllCommentsOfReport Reducer ${err}`)
    }
})


const CommentsReducer = createSlice({
    name: 'commentsHandler',
    initialState: {
        CommentsOnPost : [],
        status: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddComment.fulfilled, (state, action) => {
                state.CommentsOnPost = [...state.CommentsOnPost, action.payload.comments]
                state.status = action.payload.message
            })
            .addCase(AddComment.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(AddComment.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(getAllCommentsOfReport.fulfilled, (state, action) => {
                state.CommentsOnPost = action.payload
                state.status = 'accepted'
            })
            .addCase(getAllCommentsOfReport.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getAllCommentsOfReport.rejected, (state) => {
                state.status = 'rejected'
            })

    }
})

export default CommentsReducer.reducer