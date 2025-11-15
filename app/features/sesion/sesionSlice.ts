import { createSlice } from "@reduxjs/toolkit";
import type { Session } from "@supabase/supabase-js";



const sesionSlice = createSlice({
    name:'sesion',
    initialState:{} as Session,
    reducers:{
        setSesion(state,action){
            state = action.payload
        }
    }
})


export const {setSesion} = sesionSlice.actions
export default sesionSlice.reducer