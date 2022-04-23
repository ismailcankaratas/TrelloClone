import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    lists: [
        {
            title: "Yapılacaklar",
            id: 0,
            tasks: []
        },
        {
            title: "Yapılıyor",
            id: 1,
            tasks: []
        },
        {
            title: "Tamamlandı",
            id: 2,
            tasks: []
        },
    ]
}

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        setList: (state, action) => {
            state.lists = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setList } = listSlice.actions

export default listSlice.reducer