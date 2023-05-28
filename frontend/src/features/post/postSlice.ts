import { Post } from "./../../types/Post";
import { ActionCreatorWithPayload, createSlice } from "@reduxjs/toolkit";
export type RootState = [Post[], Post[]];

const initialState: RootState = [[], []];

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    newPost: (state, action) => {
      state[0].unshift(action.payload);
    },
    addComment: (state, action) => {
      state[1].unshift(action.payload);
    },
    update: (state, action) => {
      state[0] = [];
      state[1] = [];
      const comments = action.payload.filter(
        (post: Post) => post.comment === true
      );
      const posts = action.payload.filter(
        (post: Post) => post.comment === false
      );
      state[0].push(posts[posts.length - 1]);
      state[0].push(...posts);
      state[0].pop();
      state[1].push(...comments);
    },
    like: (state, action) => {
      const { id } = action.payload;
      const existing = state[0].find((posts) => posts._id === id);
      if (existing) {
        if (!existing.likes) {
          existing.likes = 0;
        }
        existing.likes++;
      } else {
        const commentExisting = state[1].find(
          (comments) => comments._id === id
        )!;
        commentExisting.likes++;
      }
    },
    retweet: (state, action) => {
      const { id } = action.payload;
      const existing = state[0].find((posts) => posts._id === id);
      if (existing) {
        if (!existing.retweet) {
          existing.retweet = 0;
        }
        existing.retweet++;
      } else {
        const commentExisting = state[1].find(
          (comments) => comments._id === id
        )!;
        commentExisting.retweet++;
      }
    },
    dislike: (state, action) => {
      const { id } = action.payload;
      const existing = state[0].find((posts) => posts._id === id);
      if (existing) {
        if (!existing.likes) {
          existing.likes = 0;
        }
        existing.likes--;
      } else {
        const commentExisting = state[1].find(
          (comments) => comments._id === id
        )!;
        commentExisting.likes--;
      }
    },
    undoRetweet: (state, action) => {
      const { id } = action.payload;
      const existing = state[0].find((posts) => posts._id === id);
      if (existing) {
        if (!existing.retweet) {
          existing.retweet = 0;
        }
        existing.retweet--;
      } else {
        const commentExisting = state[1].find(
          (comments) => comments._id === id
        )!;
        commentExisting.retweet--;
      }
    },
  },
});

export const {
  update,
  like,
  undoRetweet,
  dislike,
  retweet,
  newPost,
  addComment,
}: {
  update: ActionCreatorWithPayload<any, "post/update">;
  like: ActionCreatorWithPayload<any, "post/like">;
  undoRetweet: ActionCreatorWithPayload<any, "post/undoRetweet">;
  dislike: ActionCreatorWithPayload<any, "post/dislike">;
  retweet: ActionCreatorWithPayload<any, "post/retweet">;
  newPost: ActionCreatorWithPayload<any, "post/newPost">;
  addComment: ActionCreatorWithPayload<any, "post/addComment">;
} = postSlice.actions;

export default postSlice.reducer;
