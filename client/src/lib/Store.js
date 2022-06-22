import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "../features/boards/boards";
import listsReducer from "../features/boards/lists"
import cardsReducer from "../features/boards/cards"
import commentsReducer from "../features/boards/comments"

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    lists: listsReducer,
    cards: cardsReducer,
    comments: commentsReducer,
  },
});

export default store;
