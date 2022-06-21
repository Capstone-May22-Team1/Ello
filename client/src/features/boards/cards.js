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
      // console.log(action.payload)
      // console.log(action.payload.lists)

      let arrayCards = action.payload.lists.reduce((acc, comm) => {
        //eslint-disable-next-line
        const { cards, ...listWithoutCards } = comm;

        return acc.concat(cards);
      }, []);

      let correctCards = arrayCards.map(card => {
        if (state.length === 1 && card._id === state[0]._id) {
          return state[0]
        } else {
          return card
        }
      })

      return correctCards
    }),
    builder.addCase(createCard.fulfilled, (state, action) => {
      return state.concat(action.payload)
    }),
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      if (state.length === 0) {
        return [].concat(action.payload)
      } else {
        return state.map(card => card._id === action.payload._id ? action.payload : card)
      }
    })
  },
});

export default cardSlice.reducer;