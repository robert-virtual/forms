import { Select, ToggleButton, ToggleButtonGroup, useColorScheme } from "@mui/material";
import { useEffect, useState } from "react";
import SunIcon from '@mui/icons-material/LightModeRounded';
import MoonIcon from '@mui/icons-material/DarkModeRounded';

export function ThemeSwitch() {
    const {mode,setMode} = useColorScheme()
    const [mounted,setMounted] = useState(false)
    useEffect(()=>{
        setMounted(true)
    },[])
    if(!mounted){
        return null
    }
   return (<ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(event,newMode)=>{
            setMode(newMode)
        }}
        >
        <ToggleButton value={"light"}>
            <SunIcon/>
        </ToggleButton>
        <ToggleButton value={"dark"}>
            <MoonIcon/>
        </ToggleButton>
      </ToggleButtonGroup>
   )
}