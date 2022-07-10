import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../services/api";

export const getSearch = createAsyncThunk("searchUser/getSearchUser", 
    async (object, {getState, rejectWithValue}) => {
        // const searchVal = localStorage.getItem("searchVal");
    
        try {
            const { data } = await axios.get(`https://api.github.com/search/users`, { params: {
                q: object,
                per_page: "5",
            }})
            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const searchUserSlicer = createSlice({
    name: "searchUser",
    initialState : {
        data: [],
        loading: false,
        isSuccess: false,
        message: 'idle',
    },
    reducers: {},
    extraReducers: {
        [getSearch.pending]: (state, action) => {
            state.loading = true
        },
        [getSearch.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload
            state.isSuccess = true
        },
        [getSearch.rejected]: (state, action) => {
            state.loading =  false
            state.isSuccess = false
            state.message = 'gagal'
        },
    }
})

// export const getSearchAll = (state) => state.getState()
export default searchUserSlicer