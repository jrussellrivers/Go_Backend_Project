import { configureStore } from '@reduxjs/toolkit'

import messagesReducer from './slices/messagesSlice'
import userReducer from './slices/userSlice'



export default configureStore({
    reducer: {
        messages: messagesReducer,
        user: userReducer
    }
})
