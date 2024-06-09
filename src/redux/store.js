import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import userReducerJob from './userSliceJob'
const store = configureStore({
    reducer: {
        users: userReducer,
        usersJob:userReducerJob
    }
})

export default store