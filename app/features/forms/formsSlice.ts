import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Campo } from "../campos/CamposSlice";


interface FormState{
    currentFormName:string,
    snackbarOpen:boolean,
    snackbarMsg:string,
    forms:Form[]
}

interface Form{
   nombre:string,
   campos:Campo[],
   active:boolean
   createAt:string
   upatedAt?:string
}


const formsSlice = createSlice({
    name:'forms',
    initialState: {
        currentFormName:'',
        snackbarOpen:false,
        snackbarMsg:'',
        forms:[]
    } as FormState,
    reducers:{
        setCurrentFormName:(state,action:PayloadAction<string>)=>{
            state.currentFormName = action.payload
        },
        addForm:(state,action:PayloadAction<Form>)=>{
           state.forms.push(action.payload) 
        },
        setSnackbar:(state,action:PayloadAction<{message:string,open:boolean}>)=>{
            state.snackbarMsg = action.payload.message
            state.snackbarOpen = action.payload.open
        }
    }
})



export const {addForm,setCurrentFormName,setSnackbar} = formsSlice.actions

export default formsSlice.reducer