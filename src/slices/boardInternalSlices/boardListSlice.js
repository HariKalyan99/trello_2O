import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

let APIKey = import.meta.env.VITE_APIKEY;
let APIToken = import.meta.env.VITE_APITOKEN;


const initialState = {
    listsOfBoard: [],
    listsPending: false,
    listsError: false,
    deleteListsPending: false,
    deleteListOfBoard: false,
    addListPending: false,
    addListError: false,
    deleteCardPending: false,
    deleteCardError: false,
    addCardPending: false,
addCardError: false,
}

const getAllCards = createAsyncThunk('boards/list/cards/getAllCards', async(listId) => {
    const {data} = await axios.get(` https://api.trello.com/1/lists/${listId}/cards?key=${APIKey}&token=${APIToken}
`)
    return data;
}) 


export const getListsOfBoards = createAsyncThunk('board/lists/getAllLists', async(boardId, {dispatch}) => {
    const {data} = await axios.get(`https://api.trello.com/1/boards/${boardId}/lists?key=${APIKey}&token=${APIToken}`);
    return await Promise.all(data.map(async(list) => {
        const {id} = list;
        const cards = await dispatch(getAllCards(id));
        list.cardData = cards.payload || [];
        return list;
    }));
})


export const addList = createAsyncThunk('board/lists/addList', async({boardId, name}, _) => {
    const {data} = await axios.post(
        `https://api.trello.com/1/lists?name=${name}&idBoard=${boardId}&key=${APIKey}&token=${APIToken}`
      )
    return data
})


export const deleteCard = createAsyncThunk("board/lists/card/deleteListCard", async({cardId, listId}) => {
    await axios.delete(
        `https://api.trello.com/1/cards/${cardId}?key=${APIKey}&token=${APIToken}`
      );
    return {cardId, listId};
})

export const deleteList = createAsyncThunk("board/lists/deleteList", async(listId) => {
    await axios.put(`https://api.trello.com/1/lists/${listId}/closed?key=${APIKey}&token=${APIToken}&value=true`)
    return listId;
})

export const addCard = createAsyncThunk('board/lists/addCard', async({listId, name}, _) => {
    const { data } = await axios.post(
        `https://api.trello.com/1/cards?idList=${listId}&name=${name}&key=${APIKey}&token=${APIToken}`
      );
    return {listId, data}
})

 

const listsOfBoardSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getListsOfBoards.pending, (state) => {
            state.listsPending = true;
            state.listsError = false;
        }).addCase(getListsOfBoards.fulfilled, (state, action) => {
            state.listsOfBoard = action.payload;
            state.listsPending = false;
            state.listsError = false;
        }).addCase(getListsOfBoards.rejected, (state, _) => {
            state.listsPending = false;
            state.listsError = true;
        }),

        builder.addCase(deleteList.pending, (state) => {
            state.deleteListsPending = true;
            state.deleteListsError = false;
        }).addCase(deleteList.fulfilled, (state, {payload}) => {
            if(payload?.length > 0){
                state.listsOfBoard = state.listsOfBoard.filter(x => x.id !== payload);
                state.deleteListsPending = false;
                state.deleteListsError = false;
            }
        }).addCase(deleteList.rejected, (state, _) => {
            state.deleteListsPending = false;
            state.deleteListsError = true;
        }),

        builder.addCase(addList.pending, (state) => {
            state.addListPending = true;
            state.addListError = false;
        }).addCase(addList.fulfilled, (state, {payload}) => {
            state.listsOfBoard = [{...payload, cardData : []}, ...state.listsOfBoard]
            state.addListPending = false;
            state.addListError = false;
        }).addCase(addList.rejected, (state, _) => {
            state.addListPending = false;
            state.addListError = true;
        }),

        builder.addCase(deleteCard.pending, (state) => {
            state.deleteCardPending = true;
            state.deleteCardError = false;
        }).addCase(deleteCard.fulfilled, (state, {payload}) => {
            if (payload?.listId && payload?.cardId) {
                const list = state.listsOfBoard.find(x => x.id === payload.listId);
                if (list) {
                    list.cardData = list.cardData.filter(card => card.id !== payload.cardId);
                }
                state.deleteCardPending = false;
                state.deleteCardError = false;
            }
        }).addCase(deleteCard.rejected, (state, _) => {
            state.deleteCardPending = false;
            state.deleteCardError = true;
        }),

        builder.addCase(addCard.pending, (state) => {
            state.addCardPending = true;
            state.addCardError = false;
        }).addCase(addCard.fulfilled, (state, {payload}) => {
            if (payload?.listId && payload?.data) {
                const list = state.listsOfBoard.find(x => x.id === payload.listId);
                if (list) {
                    list.cardData = [...list.cardData, payload.data];
                }
                state.addCardPending = false;
                state.addCardError = false;
            }
        }).addCase(addCard.rejected, (state, _) => {
            state.addCardPending = false;
            state.addCardError = true;
        })
    }
})

export const listActions = listsOfBoardSlice.actions;
export default listsOfBoardSlice.reducer;





