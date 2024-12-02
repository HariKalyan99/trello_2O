import { configureStore } from "@reduxjs/toolkit";
import boardReducer, { getAllBoards } from '../slices/boardSlice.js';
import listReducer from '../slices/boardInternalSlices/boardListSlice.js'
import checkListReducer from '../slices/boardInternalSlices/cardInternalChecklist/cardCheckListSlice.js'

export const trelloStore = configureStore({
    reducer: {
        boards: boardReducer,
        lists: listReducer,
        checklist: checkListReducer
    }
})

// setInterval(() => {
    trelloStore.dispatch(getAllBoards());
// }, 2000)