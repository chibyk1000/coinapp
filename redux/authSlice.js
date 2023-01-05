import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    login: false,
    isLoading: true
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.login = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})



export const { setLogin, setIsLoading } = authSlice.actions
export default authSlice.reducer