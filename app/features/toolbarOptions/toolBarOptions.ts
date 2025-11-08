import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ToolbarComponents } from "~/routes/home";

interface ToolbarState{
    componentKey: ToolbarComponents
}
const initialState:ToolbarState = {
    componentKey:"default"
}

const toolbarOptions = createSlice({
    name:'toolbarBptions',
    initialState,
    reducers:{
        setToolbarOptions:(state,action:PayloadAction<ToolbarState>)=>{
            return action.payload
        }
    }
})

export const {setToolbarOptions} = toolbarOptions.actions

export default toolbarOptions.reducer