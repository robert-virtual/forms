import { Button, FormControl, FormLabel, Input, styled, TextField } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router";
import { ThemeSwitch } from "~/ThemeSwitch/ThemeSwitch";

const Div = styled('div')(({theme})=>({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  boxShadow: theme.shadows[2],
  minWidth: '300px',
}))

export default function Login() {
    let navigate = useNavigate();
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    function login() {
        navigate("/home");    
    }
  return (
    <div >
      <div className="flex justify-end p-4 sticky top-0">
        <ThemeSwitch />
      </div>
      <div className="grid place-items-center  h-[90vh] ">
      <Div  >
        <img src="/logo-tailwind.svg" alt="" width={200} />
        <h1 className="text-center">Your Company</h1>
        <div  className="flex flex-col gap-4 mt-4">
            <TextField 
              variant="outlined" 
              label="Username" 
              placeholder="Enter your username" 
              onChange={({target})=> setUsername(target.value)} 
              value={username} />
            <TextField 
              variant="outlined" 
              label="Password" 
              placeholder="Enter your password" 
              type="password" 
              onChange={({target})=> setPassword(target.value)} 
              value={password}  />
            <Button variant="contained" onClick={login} type="submit" sx={{mt:2}}>Login</Button>
            <Button variant="text">Forgot Password?</Button>
        </div>
      </Div>
      </div>
    </div>
  );
}   