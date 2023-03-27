import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AxiosConfig from '../Helpers/AxiosConfig'

const AddComment = createAsyncThunk('commes/AddComment', async({commentData}) => {
    try {
        const response = await AxiosConfig.post('/comments/AddComment', commentData)
        return response.data
    } catch (err) {
        console.warn(`Err in AddComment reducer ${err}`)
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
                state.CommentsOnPost = action.payload.comments
                state.status = action.payload.message
            })
            .addCase(AddComment.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(AddComment.rejected, (state, action) => {
                state.status = 'rejected'
            })

    }
})

export default CommentsReducer.reducer