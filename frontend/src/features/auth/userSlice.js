import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "john",
    password: "doe"
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.username = action.payload.username
            state.password = action.payload.password
        },
        logout: (state) => {
            state.user = null
        }
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer