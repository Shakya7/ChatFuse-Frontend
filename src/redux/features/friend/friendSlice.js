import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const friend_state={
    isSearchingUsers:false,
    searchedUsers:[],
    friendRequestedUsers:[],
    isLoading:false,
    friendRequestsFromUsers:[]

}

export const getFriends=createAsyncThunk("friend/getUsers",async({type,searchFriendTerm},{rejectWithValue})=>{
    try{
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

export const getFriendRequestedUsers=createAsyncThunk("friend/getFriendRequestedUsers",async(profileID,{rejectWithValue})=>{
    try{
        let users=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/getFriendRequestedUsers`,{
            profileID
        },{withCredentials:true})
        return users.data.users;

    }
    catch(err){
        
        //****** in REDUX-THUNK error handling, rejectwithValue is used as used *//
        return rejectWithValue("No Users");
    }
});


export const getUsersWhoSentRequests=createAsyncThunk("friend/getUsersWhoSentRequests",async(profileID,{rejectWithValue})=>{
    try{
        let users=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/getUsersWhoSentRequests`,{
            profileID
        },{withCredentials:true})
        return users.data.users;

    }
    catch(err){
        
        //****** in REDUX-THUNK error handling, rejectwithValue is used as used *//
        return rejectWithValue("No Users");
    }
});


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

        //set friend-request friends to store
        builder.addCase(getFriendRequestedUsers.pending, (state)=>{
            state.isLoading=true;
        }).addCase(getFriendRequestedUsers.fulfilled, (state,action)=>{
            state.isLoading=false;
            state.friendRequestedUsers=action.payload;
        }).addCase(getFriendRequestedUsers.rejected, (state)=>{
            state.isLoading=false;
        })


        builder.addCase(getUsersWhoSentRequests.pending, (state)=>{
            state.isLoading=true;
        }).addCase(getUsersWhoSentRequests.fulfilled, (state,action)=>{
            state.isLoading=false;
            state.friendRequestsFromUsers=action.payload;
        }).addCase(getUsersWhoSentRequests.rejected, (state)=>{
            state.isLoading=false;
        })
    }

})

export const {clearSearchedUser}=friendSlice.actions;
export default friendSlice.reducer;