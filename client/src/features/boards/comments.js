import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCard } from "./cards";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const createComment = createAsyncThunk(
  "cards/createComment", 
  async ({ newComment, callback }) => {
    const data = await apiClient.createComment(newComment)
    if (callback) {
      callback()
    }
    return data
  }
)

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      const { comments } = action.payload
      return comments
    }),
    builder.addCase(createComment.fulfilled, (state, action) =>{
      return state.concat(action.payload)
    })
  },
});

export default commentSlice.reducer