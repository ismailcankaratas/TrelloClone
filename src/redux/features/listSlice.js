import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid';

const initialState = {
    lists: [
        {
            title: "Yapılacaklar",
            id: `list-${uuid()}`,
            tasks: []
        },
        {
            title: "Yapılıyor",
            id: `list-${uuid()}`,
            tasks: []
        },
        {
            title: "Tamamlandı",
            id: `list-${uuid()}`,
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
        },
        dragHappened: (state, action) => {
            const { droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId, type } = action.payload;

            if (type === "list") {
                const list = state.lists.splice(droppableIndexStart, 1);
                state.lists.splice(droppableIndexEnd, 0, ...list)
                localStorage.setItem("localList", JSON.stringify(state.lists))
                return
            }


            if (droppableIdStart === droppableIdEnd) {
                const newList = state.lists.find(list => droppableIdStart == list.id);
                const task = newList.tasks.splice(droppableIndexStart, 1);
                newList.tasks.splice(droppableIndexEnd, 0, ...task);
                const localList = [...state.lists];

                const newLocalList = localList.map(list => {
                    if (list.id == droppableIdStart) {
                        return newList
                    } else {
                        return {
                            ...list
                        }
                    }
                })
                setList(newLocalList);
                localStorage.setItem("localList", JSON.stringify(newLocalList))
            }

            if (droppableIdStart !== droppableIdEnd) {
                const listStart = state.lists.find(list => droppableIdStart === list.id);

                const task = listStart.tasks.splice(droppableIndexStart, 1);

                const listEnd = state.lists.find(list => droppableIdEnd === list.id);

                listEnd.tasks.splice(droppableIndexEnd, 0, ...task);

                const localList = [...state.lists];

                const newLocalList = localList.map(list => {
                    if (list.id == droppableIdStart) {
                        return listStart;
                    } else if (list.id == droppableIdEnd) {
                        return listEnd;
                    }
                    else {
                        return {
                            ...list
                        }
                    }
                })

                setList(JSON.stringify(newLocalList));
                localStorage.setItem("localList", JSON.stringify(newLocalList))
            }

        }
    },
})


export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type
) => (dispatch) => {
    dispatch(dragHappened(
        {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId,
            type
        }
    ))
}

export const { setList, dragHappened } = listSlice.actions

export default listSlice.reducer