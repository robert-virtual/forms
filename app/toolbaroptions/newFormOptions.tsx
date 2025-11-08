import { Box, IconButton, Menu, MenuItem, Snackbar, styled, Typography } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addForm, setSnackbar } from "~/features/forms/formsSlice";
import type { RootState } from "~/store";


export function NewFormToolbarOptions() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const campos = useSelector((state:RootState)=>state.campos)
  const forms = useSelector((state:RootState)=>state.forms)
  function handleLogout(){
    setAnchorEl(null);
    navigate("/",{replace:true});
  }
  function handleClose(){
    setAnchorEl(null);
  }
  function handleMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget); 
  }
  function saveForm(event: React.MouseEvent<HTMLElement>) {
    if (forms.currentFormName.length == 0 || campos.length == 0) {
      dispatch(setSnackbar({message:"Formulario inválido",open:true}))
      return 
    }
    dispatch(addForm({campos,nombre:forms.currentFormName,createAt:new Date().toISOString(),active:false}))
    dispatch(setSnackbar({message:"Formulario guardado!",open:true}))
  }
   return (
          <>
          <Box sx={{flexGrow:1}}>
            <img src="/logo-tailwind.svg" alt="" width={30} className="mr-2" />
          </Box>
            <div>
              <IconButton
                size="large"
                aria-label=""
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={saveForm}
                color="inherit"
              >
                <SaveIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </>
   ) 
}