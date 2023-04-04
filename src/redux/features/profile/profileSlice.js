import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const profileState={
    isFetching:false,
    id:"",
    name:"",
    email:"",
    avatar:"",
    error:""
    
}


export const fetchAccountData=createAsyncThunk("/profile/fetchAccountData",async(profileID,{rejectWithValue})=>{
    try{
        const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/getProfileData/${profileID}`,{
            withCredentials:true
        });
        return data.data.data.user;
    }catch(err){
        return rejectWithValue(err.message);
    }
})

const profileSlice=createSlice({
    name:"profile",
    initialState:profileState,
    reducers:{
        resetData:(state)=>{
            state.isFetching=false;
            state.id="";
            state.email="";
            state.name="";
            state.avatar="";
            state.error="";
        }
    },
    extraReducers:(builder)=>{

        //fetch account data
        builder.addCase(fetchAccountData.pending,(state)=>{
            state.isFetching=true;
        });
        builder.addCase(fetchAccountData.fulfilled,(state,action)=>{
            state.id=action.payload._id;
            state.email=action.payload.email;
            state.name=action.payload.name;
            state.avatar=action.payload.avatar;
            state.isFetching=false;
            state.error="";
        });
        builder.addCase(fetchAccountData.rejected,(state)=>{
            state.error="Error in fetching data!!!";
            state.isFetching=false;
        });
    }
});

export const {resetData}=profileSlice.actions;
export default profileSlice.reducer;