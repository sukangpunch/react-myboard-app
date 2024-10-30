import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "./services/ApiService";

// 게시글 목록 가져오기 thunk
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (boardId) => {
    const response = await ApiService.fetchPostsByBoardId(boardId);
    return response.data;
  }
);

// 게시글 상세 정보 가져오기 thunk
export const fetchPostDetails = createAsyncThunk(
  "posts/fetchPostDetails",
  async ({ id, password }) => {
    const response = await ApiService.fetchPostDetails(id, password);
    return response.data;
  }
);

// 게시글 비밀번호 인증 thunk
export const authorizePost = createAsyncThunk(
  "posts/authorizePost",
  async ({ postId, password }, { rejectWithValue }) => {
    try {
      await ApiService.fetchPostDetails(postId, password);
      return { postId, password };
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return rejectWithValue("비밀번호가 잘못되었습니다. 다시 시도해주세요.");
      }
      return rejectWithValue("오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    currentPost: null,
    isAuthorized: false,
    errorMessage: "",
  },
  reducers: {
    addPost(state, action) {
      state.posts.push(action.payload);
    },
    clearAuthorization(state) {
      state.isAuthorized = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(fetchPostDetails.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      })
      .addCase(authorizePost.rejected, (state, action) => {
        state.isAuthorized = false;
        state.errorMessage = action.payload;
      });
  },
});

export const { addPost, clearAuthorization } = postSlice.actions;
export default postSlice.reducer;
