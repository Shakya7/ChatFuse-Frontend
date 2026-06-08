import { createSlice } from "@reduxjs/toolkit";

const settingState={
    darkMode:true,
    comicMode:false
}

const settingSlice=createSlice({
    name:"settings",
    initialState:settingState,
    reducers:{
       changeTheme:(state)=>{
        state.darkMode=!state.darkMode;
        // Comic mode only works in light mode — auto-disable when switching to dark
        if(state.darkMode) state.comicMode=false;
       },
       toggleComicMode:(state)=>{
        // Only allow comic mode in light mode
        if(!state.darkMode) state.comicMode=!state.comicMode;
       }
    }
})

export const {changeTheme, toggleComicMode}=settingSlice.actions;
export default settingSlice.reducer;