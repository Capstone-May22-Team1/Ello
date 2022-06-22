import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBoard } from "./boards";
import apiClient from "../../lib/ApiClient";


const initialState = [];

export const fetchCard = createAsyncThunk(
  "cards/fetchCard", 
  async ({ id, callback}) => {
    const data = await apiClient.getCard(id)

    if (callback) {
      callback()
    }

    return data
  }
);

export const createCard = createAsyncThunk(
  "cards/createCard", 
  async ({ newCard, callback }) => {
    const data = await apiClient.createCard(newCard)
    if (callback) {
      callback()
    }
    return data
  }
)

export const updateCard = createAsyncThunk(
  "cards/updateCard", 
  async ({ cardId, updatedCard, callback }) => {
    const data = await apiClient.editCard(cardId, updatedCard)

    if (callback) {
      callback()
    }
    return data
  }
)

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      return action.payload.lists.reduce((acc, comm) => {
        //eslint-disable-next-line
        const { cards, ...listWithoutCards } = comm;

        return acc.concat(cards);
      }, []);
    }),
    builder.addCase(createCard.fulfilled, (state, action) => {
      return state.concat(action.payload)
    }),
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      const { comments, ...cardWithoutComments } = action.payload

      if (state.length === 0) {
        return [].concat(cardWithoutComments)
      } else {
        return state.map(card => card._id === action.payload._id ? cardWithoutComments : card)
      }
    }),
    builder.addCase(updateCard.fulfilled, (state, action) => {
      const { comments, ...cardWithoutComments } = action.payload
      console.log('within the reducer')
      console.log(cardWithoutComments)
      return state.map(card => card._id === action.payload._id ? cardWithoutComments : card)
    })
  },
});

export default cardSlice.reducer;