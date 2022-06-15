import { createSlice } from "@reduxjs/toolkit";
import { fetchBoard } from "./boards";

const initialState = [];

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      let lists = action.payload.lists.reduce((acc, comm) => {
        //eslint-disable-next-line
        const { cards, ...listWithoutCards } = comm; 
        return acc.concat(listWithoutCards);
      }, []);
      console.log(lists)
      return lists
    })
  },
});

export default listSlice.reducer;
