import {createSlice} from '@reduxjs/toolkit';

export const navSlice = createSlice({
    initialState : {
        tabs : ["Events" ,"About us"],
        username : "",
    },
    name: "navbar",
    reducers :{
        admin: (state)=>{
            state.tabs.unshift("Create");
        },
        setUsername : (state,action)=>{
            state.username = action.payload;
        }
    }
});

export const {admin,setUsername} = navSlice.actions;
export default navSlice.reducer;