import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const loginState={
    isLoading:false,
    isLogged:false,
    userID:"",
    error:"",
}
export const signupFunction=createAsyncThunk("/login/signupFunction",async({email,password,name},{rejectWithValue})=>{
    try{
        const data=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/connect/signup`,{
            email,
            password,
            name
        },{withCredentials:true});
        return data.data.data.user._id;
    }catch(err){
        //****** in REDUX-THUNK error handling, rejectwithValue is used as used *//
        return rejectWithValue(err.message);
    }
})

export const authenticate=createAsyncThunk("/login/authenticate",async(_,{rejectWithValue})=>{
    try{
        const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/connect/authenticate`,{
            withCredentials:true
        });
        return data.data.data.userID;
    }catch(err){
        return rejectWithValue(err.message);
    }
})


export const loginFunction=createAsyncThunk("/login/loginFunction",async({email,password},{rejectWithValue})=>{
    try{
        const data=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/connect/login`,{
            email,
            password
        },{withCredentials:true});
        return data.data.data.user._id;
    }catch(err){
        
        //****** in REDUX-THUNK error handling, rejectwithValue is used as used *//
        return rejectWithValue(err.message);
    }
})

export const logout=createAsyncThunk("/login/logout",async(_,{rejectWithValue})=>{
    try{
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/connect/logout`,{withCredentials:true});
    }catch(err){
        
        //****** in REDUX-THUNK error handling, rejectwithValue is used as used *//
        return rejectWithValue(err.message);
    }
})


const loginSlice=createSlice({
    name:"login",
    initialState:loginState,
    reducers:{
        // removeError:(state)=>{
        //     state.error=""
        // },
        // sessionPresent:(state)=>{
        //     state.isLogged=true;
        //     state.error="";
        //     state.isLoading=false;
        // },  
        // authenticate:(state,action)=>{
        //     state.isLogged=true;
        //     state.error="";
        //     state.isLoading=false;
        //     state.userID=action.payload;
        // }
    
    },
    extraReducers:(builder)=>{

        //LOGIN Part
        builder.addCase(loginFunction.pending, (state)=>{
            state.isLoading=true;
        });
        builder.addCase(loginFunction.fulfilled, (state,action)=>{
            state.isLogged=true;
            state.error="";
            state.isLoading=false;
            state.userID=action.payload;
        });
        builder.addCase(loginFunction.rejected, (state,action)=>{
            state.error=action.payload;
            state.isLogged=false;
            state.isLoading=false;
            state.userID="";
        });

        //SIGNUP Part
        builder.addCase(signupFunction.pending,(state)=>{
            state.isLoading=true;
        });
        builder.addCase(signupFunction.fulfilled,(state,action)=>{
            state.isLogged=true;
            state.error="";
            state.isLoading=false;
            state.userID=action.payload;
        });
        builder.addCase(signupFunction.rejected,(state,action)=>{
            state.error=action.payload;
            state.isLogged=false;
            state.isLoading=false;
            state.userID="";
        })

        //LOGOUT Part
        builder.addCase(logout.pending, (state)=>{
            state.isLoading=true;
        });
        builder.addCase(logout.fulfilled, (state)=>{
            state.isLogged=false;
            state.error="";
            state.isLoading=false;
            state.userID="";
        });
        builder.addCase(logout.rejected, (state,action)=>{
            state.error=action.payload;
            state.isLoading=false;
        })

        //AUTHENTICATE PART
        builder.addCase(authenticate.pending, (state)=>{
            state.isLoading=true;
        })
        builder.addCase(authenticate.fulfilled, (state,action)=>{
            state.isLogged=true;
            state.error="";
            state.isLoading=false;
            state.userID=action.payload;
        })
        builder.addCase(authenticate.rejected,(state,action)=>{
            state.error=action.payload;
            state.isLogged=false;
            state.isLoading=false;
            state.userID="";
        })
    }
})
//export const {removeError, sessionPresent, authenticate}=loginSlice.actions;
export default loginSlice.reducer;