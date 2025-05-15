import { createSlice } from "@reduxjs/toolkit";

export const uiSlice=createSlice({name: "ui", 
    initialState:{
        isLoading:false
    }, 
    reducers:{
    StartLoading:(state)=>{
        state.isLoading=true;
    },
    StopLoading:(state)=>{
        state.isLoading=false;
    }
}});
export const {StartLoading, StopLoading} = uiSlice.actions;