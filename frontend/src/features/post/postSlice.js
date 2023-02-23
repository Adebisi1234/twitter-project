import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    [], []
]

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        newPost: (state, action) => {
            state[0].unshift(action.payload)
        },
        addComment: (state, action) => {
            state[1].unshift(action.payload)
        },
        update: (state, action) => {
            state[0] = []
            state[1] = []
            const comments = action.payload.filter(post => post.comment === true)
            const posts = action.payload.filter(post => post.comment === false)
            state[0].push(posts[0])
            state[0].push(...posts.reverse())
            state[0].pop()
            state[1].push(...comments.reverse())
        },
        like: (state, action) => {
            const { id } = action.payload
            const existing = state[0].find(posts => posts._id === id)
            if (existing) {
                existing.likes++
            }
        },
        retweet: (state, action) => {
            const { id } = action.payload
            const existing = state[0].find(posts => posts._id === id)
            if (existing) {
                if (!existing.retweet) {
                    existing.retweet = 0
                }
                existing.retweet++
            } else {
            }
        },
        dislike: (state, action) => {
            const { id } = action.payload
            const existing = state[0].find(posts => posts._id === id)
            if (existing) {
                existing.likes--
            }
        },
        untweet: (state, action) => {
            const { id } = action.payload
            const existing = state[0].find(posts => posts._id === id)
            if (existing) {
                if (!existing.retweet) {
                    existing.retweet = 0
                }
                existing.retweet--
            } else {
            }
        },
    }
})

export const { update, like, untweet, dislike, retweet, newPost, addComment } = postSlice.actions

export default postSlice.reducer