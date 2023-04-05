import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const friend_state={
    isSearchingUsers:false,
    searchedUsers:[],
}

export const getFriends=createAsyncThunk("friend/getUsers",async({type,searchFriendTerm},{rejectWithValue})=>{
    try{
        console.log("Lets see")
        let users=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/getUsers`,{
            searchTerm:searchFriendTerm,
            type
        },{withCredentials:true});
        if(users && users.data.users.length>0){
            console.log(users.data.users);
            return users.data.users;
        }
        else
            return rejectWithValue("No Users")
    }
    catch(err){
        
        //****** in REDUX-THUNK error handling, rejectwithValue is used as used *//
        return rejectWithValue("No Users");
    }
  })

const friendSlice=createSlice({
    name:"friend",
    initialState:friend_state,
    reducers:{
        clearSearchedUser:(state)=>{
            state.isSearchingUsers=false;
            state.searchedUsers=[];
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getFriends.pending,(state)=>{
            state.isSearchingUsers=true;
        })
        builder.addCase(getFriends.fulfilled, (state,action)=>{
            state.isSearchingUsers=false;
            state.searchedUsers=action.payload;
        })
        builder.addCase(getFriends.rejected, (state,action)=>{
            state.isSearchingUsers=false;
        })
    }

})

export const {clearSearchedUser}=friendSlice.actions;
export default friendSlice.reducer;