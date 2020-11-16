import { configureStore } from '@reduxjs/toolkit'

import messagesReducer from './slices/messagesSlice'



export default configureStore({
    reducer: {
        messages: messagesReducer,
    }
})
