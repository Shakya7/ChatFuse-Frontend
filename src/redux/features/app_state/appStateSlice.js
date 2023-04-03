import { createSlice } from "@reduxjs/toolkit";


const initialState={
    current_section:"",
}

const appStateSlice=createSlice({
    name:"app_state",
    initialState,
    reducers:{
        setSection:(state,action)=>{state.current_section=action.payload}
    }
})

export const {setSection}=appStateSlice.actions;
export default appStateSlice.reducer;