import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setToolbarOptions } from "~/features/toolbarOptions/toolBarOptions";
import type { RootState } from "~/store";
import { DefaultToolbarOptions } from "~/toolbaroptions/defaultOptions";

export default function Forms() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setToolbarOptions({componentKey:"default"}))
    },[])
   return (
        <section className="grid h-screen w-full place-items-center ">
            <Button variant="outlined" onClick={()=>navigate('newForm')} >Agregar nuevo formulario</Button>
        </section>
   ) 
}