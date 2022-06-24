import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  const data = await apiClient.getBoards();
  return data;
});

export const fetchBoard = createAsyncThunk(
  "boards/fetchBoard",
  async(id, callback) => {
    const data = await apiClient.getBoard(id);
    if (callback) {
      callback;
    }
    return data
  }
)

export const updateBoard = createAsyncThunk(
  "boards/updateBoard",
  async({ boardId, updatedBoard, callback }) => {
    const data = await apiClient.updateBoard(boardId, updatedBoard);
    if (callback) {
      callback;
    }
    return data
  }
)

export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async (newBoard, callback) => {
    const data = await apiClient.createBoard(newBoard);
    if (callback) {
      callback;
    }
    return data;
  }
);

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      return action.payload.reduce((acc, comm) => {
        //eslint-disable-next-line
        const { lists, ...boardWithoutLists } = comm; 
        return acc.concat(boardWithoutLists);
      }, []);
    }),
    builder.addCase(createBoard.fulfilled, (state, action) => {
      state.push(action.payload);
    }),
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      if (state.length === 0) {
        const { lists, ...boardWithoutLists } = action.payload
        return [ boardWithoutLists ]
      } else {
        const { lists, ...boardWithoutLists } = action.payload

        return state.map(board => {
          return board._id === action.payload._id ? boardWithoutLists : board
        })
      }
    }),
    builder.addCase(updateBoard.fulfilled, (state, action) => {
      state.map(board => board._id === action.payload._id ? action.payload : board);
    })
  },
});



export default boardSlice.reducer;
