import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from '@reduxjs/toolkit'

const initialState = [
    { id: "1", name: "Tiago"},
    { id: "2", name: "Sofia"},
    { id: "3", name: "Luis"},
    { id: "4", name: "Ana"},
]

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        userAdded(state, action) {
            const newUser = {
                id: nanoid(),
                name: action.payload
            }
            state.push(newUser);
        }
    }
})

export const selectAllUsers = (state) => state.users;
export const { userAdded } = usersSlice.actions;

export default usersSlice.reducer;