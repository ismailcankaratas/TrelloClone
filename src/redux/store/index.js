import { configureStore } from '@reduxjs/toolkit'
import listSlice from '../features/listSlice'

export const store = configureStore({
    reducer: {
        list: listSlice
    },
})