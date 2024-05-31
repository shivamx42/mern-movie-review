import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser: null
}

const userSlice= createSlice({
    name: "user",
    initialState,
    reducers:{
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload
        },
        updateUser:(state,action)=>{
            state.currentUser=action.payload
        },
        deleteOrLogoutUser:(state)=>{
            state.currentUser=null;
        }
        
    }
})

export const{signInSuccess,updateUser,deleteOrLogoutUser}=userSlice.actions;

export default userSlice.reducer