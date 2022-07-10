import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getUserRepo = createAsyncThunk("userRepo/getUserRepo", async (object, rejectWithValue) => {
    const userName = 'lamseboen'

    try {
        const res = await axios.get( `https://api.github.com/users/${userName}/repos`)
        return res.data

    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})


const userRepoSlice = createSlice({
    name: "userRepo",
    initialState: {
        data: [],
        userName: '',
        loading: false,
        isSuccess: false,
        message: '',
    },
    reducers: {},
    extraReducers: {
        [getUserRepo.pending]: (state, action) => {
            state.loading = true
        },
        [getUserRepo.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
            state.isSuccess = true
        },
        [getUserRepo.rejected]: (state, action) => {
            state.loading =  false
            state.isSuccess = false
            state.message = 'gagal'
        },
    }
})

// export const 
export default userRepoSlice.reducer