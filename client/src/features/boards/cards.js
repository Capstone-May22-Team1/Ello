import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBoard } from "./boards";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const fetchCards = createAsyncThunk("cards/fetchCards", async () => {
});

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
      const card = action.payload
      console.log(card)
      return state.concat(card)
    })
  },
});



export default cardSlice.reducer;
