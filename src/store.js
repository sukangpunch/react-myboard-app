import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice"; // 작성한 postSlice 리듀서 가져오기

const store = configureStore({
  reducer: {
    posts: postReducer, // 필요한 리듀서를 추가
    // 다른 리듀서가 있다면 추가 가능
  },
});

export default store;
