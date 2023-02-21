import { createSlice } from "@reduxjs/toolkit";

const initialState = []
export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        getMessages: (state, action) => {
            state.message.push({ ...action.payload })
        },
        updateMessage: (state, action) => {
            const { index, ...others } = action.payload
            state.message[index].content.push(others)
        },
        newMessage: (state, action) => {
            state.message.push(action.payload)

        }
    }
})

export const { getMessages, newMessage, updateMessage } = messageSlice.actions

export default messageSlice.reducer