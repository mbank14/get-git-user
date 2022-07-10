import { configureStore } from "@reduxjs/toolkit";
import userRepoSlice from "./reducers/repository";
import searchUserSlicer from "./reducers/search";


const store = configureStore({
    reducer: {
        search: searchUserSlicer.reducer,
        repo: userRepoSlice,
    },
})

export default store


