import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let APIKey = import.meta.env.VITE_APIKEY;
let APIToken = import.meta.env.VITE_APITOKEN;

const initialState = {
  checkList: [],
  checkListPending: false,
  checkListError: false,
  deleteCheckListPending: false,
  deleteCheckListError: false,
  postCheckListPending: false,
  postCheckListError: false,
  postCheckItemPending: false,
  postCheckItemError: false,
  deleteCheckItemPending: false,
  deleteCheckItemError: false,
  updateCheckItemPending: false,
  updateCheckItemError: false,
};
// check lists
export const getCardCheckList = createAsyncThunk(
  "card/checklist/getAllChecklists",
  async (cardId) => {
    const { data } = await axios.get(
      `https://api.trello.com/1/cards/${cardId}/checklists?key=${APIKey}&token=${APIToken}`
    );
    return data
  }
);

export const postCheckList = createAsyncThunk(
  "card/checklist/postNewChecklists",
  async ({ cardId, name }) => {
    const { data } = await axios.post(
      `https://api.trello.com/1/checklists?idCard=${cardId}&name=${name}&key=${APIKey}&token=${APIToken}`
    );
    return data;
  }
);

export const deleteCheckList = createAsyncThunk(
  "card/checklist/delChecklists",
  async (checkListId) => {
    await axios.delete(
      `https://api.trello.com/1/checklists/${checkListId}?key=${APIKey}&token=${APIToken}`
    );
    return checkListId;
  }
);
// check items
export const postCheckItem = createAsyncThunk(
  "card/checklist/checkitem/postCheckItem",
  async ({ checkListId, name }) => {
    const { data } = await axios.post(
      `https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${name}&key=${APIKey}&token=${APIToken}`
    );
    return { checkListId, data };
  }
);

export const deleteCheckItem = createAsyncThunk(
  "card/checklist/checkItem/deleteCheckItem",
  async ({ idCheckItem, checkListId }) => {
    await axios.delete(
      `https://api.trello.com/1/checklists/${checkListId}/checkItems/${idCheckItem}?key=${APIKey}&token=${APIToken}`
    );
    return { idCheckItem, checkListId };
  }
);

export const updateCheckItem = createAsyncThunk(
  "card/checklist/checkitem/updateCheckItem",
  async ({ cardId, checkItemId, checkListId, state }) => {
    const { data } = await axios.put(
      `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?key=${APIKey}&token=${APIToken}&state=${state}`
    );
    return { data, checkListId, checkItemId };
  }
);

const checkListSlice = createSlice({
  name: "checklist",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCardCheckList.pending, (state) => {
        state.checkListPending = true;
        state.checkListError = false;
      })
      .addCase(getCardCheckList.fulfilled, (state, { payload }) => {
        state.checkList = payload;
        state.checkListPending = false;
        state.checkListError = false;
      })
      .addCase(getCardCheckList.rejected, (state, _) => {
        state.checkListPending = false;
        state.checkListError = true;
      });
    builder
      .addCase(postCheckList.pending, (state) => {
        state.postCheckListPending = true;
        state.postCheckListError = false;
      })
      .addCase(postCheckList.fulfilled, (state, { payload }) => {
        state.checkList = [...state.checkList, payload];
        state.postCheckListPending = false;
        state.postCheckListError = false;
      })
      .addCase(postCheckList.rejected, (state, _) => {
        state.postCheckListPending = false;
        state.postCheckListError = true;
      });
    builder
      .addCase(deleteCheckList.pending, (state) => {
        state.deleteCheckListPending = true;
        state.deleteCheckListError = false;
      })
      .addCase(deleteCheckList.fulfilled, (state, { payload }) => {
        state.checkList = state.checkList.filter((x) => x.id !== payload);
        state.deleteCheckListPending = false;
        state.deleteCheckListError = false;
      })
      .addCase(deleteCheckList.rejected, (state, _) => {
        state.deleteCheckListPending = false;
        state.deleteCheckListError = true;
      });
    builder
      .addCase(postCheckItem.pending, (state) => {
        state.postCheckItemPending = true;
        state.postCheckItemError = false;
      })
      .addCase(postCheckItem.fulfilled, (state, { payload }) => {
        let check = state.checkList.find((x) => x.id === payload.checkListId);
        if (check) {
          check.checkItems = [...check.checkItems, payload.data];
          
        }
        state.postCheckItemPending = false;
        state.postCheckItemError = false;
      })
      .addCase(postCheckItem.rejected, (state, _) => {
        state.postCheckItemPending = false;
        state.postCheckItemError = true;
      });

    builder
      .addCase(deleteCheckItem.pending, (state) => {
        state.deleteCheckItemPending = true;
        state.deleteCheckItemError = false;
      })
      .addCase(deleteCheckItem.fulfilled, (state, { payload }) => {
        let check = state.checkList.find((x) => x.id === payload.checkListId);
        if (check) {
          check.checkItems = check.checkItems.filter(
            (x) => x.id !== payload.idCheckItem
          );
        }
        state.deleteCheckItemPending = false;
        state.deleteCheckItemError = false;
      })
      .addCase(deleteCheckItem.rejected, (state, _) => {
        state.deleteCheckItemPending = false;
        state.deleteCheckItemError = true;
      });

    builder
      .addCase(updateCheckItem.pending, (state) => {
        state.updateCheckItemPending = true;
        state.updateCheckItemError = false;
      })
      .addCase(updateCheckItem.fulfilled, (state, { payload }) => {
        let check = state.checkList?.find((x) => x.id === payload?.checkListId);
        if (check) {
          let index = check.checkItems.findIndex(
            (x) => x.id === payload.checkItemId
          );
          check.checkItems[index] = payload.data;
        }
        state.updateCheckItemPending = false;
        state.updateCheckItemError = false;
      })
      .addCase(updateCheckItem.rejected, (state, _) => {
        state.updateCheckItemPending = false;
        state.updateCheckItemError = true;
      });
  },
});

export const cardCheckListActions = checkListSlice.actions;
export default checkListSlice.reducer;
