import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBoard } from "./boards";


const initialState = [];

export const fetchCards = createAsyncThunk("cards/fetchCards", async () => {
});

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


    })
  },
});



export default cardSlice.reducer;
