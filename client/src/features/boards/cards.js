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

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      let cards = action.payload.lists.reduce((acc, comm) => {
        //eslint-disable-next-line
        const { cards, ...listWithoutCards } = comm; 
        return acc.concat(cards);
      }, []);
      return cards
    }),
    builder.addCase(createCard.fulfilled, (state, action) => {
      return state.concat(action.payload)
    }),
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      return [].concat(action.payload)
    })
  },
});

export default cardSlice.reducer;