import { Button, FormControl, FormLabel, IconButton, Input, InputAdornment, styled, TextField, useTheme } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { ThemeSwitch } from "~/ThemeSwitch/ThemeSwitch";
import supabase from "~/utils/supabase";

const Div = styled('div')(({theme})=>({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(10),
  boxShadow: theme.shadows[2],
  minWidth: '300px',
}))

export default function Login() {
    let navigate = useNavigate();
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const theme = useTheme();
  async function login() {
    console.log("login...")
    if (!username.length || !password.length) {
        console
        return 
    }
    const {data,error}  = await supabase.auth.signInWithPassword({email:username,password}) 
    console.log({data,error})
    if (data.session?.access_token) {
        
    }
  }
  return (
    <div >
      <div className="flex justify-end p-4 sticky top-0">
        <ThemeSwitch />
      </div>
      <div className="grid place-items-center  h-[90vh] border-2 border-red-500 ">
      <Div>
        <img src="logo-tailwind.svg" alt="" width={200} />
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
              onChange={({target})=> setPassword(target.value)} 
              type={showPassword ? 'text' : 'password'}
              slotProps={{
                input: {
                  endAdornment:(
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
                  )
                },
              }}
              value={password}  />
            <Button variant="contained" disabled={username.length < 3 && password.length < 3} onClick={login} type="submit" sx={{mt:2}}>Login</Button>
            <Button variant="text">Forgot Password?</Button>
        </div>
      </Div>
      </div>
    </div>
  );
}   