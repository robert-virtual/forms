import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export function DefaultToolbarOptions() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate()
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
   return (
          <>
          <img src="logo-tailwind.svg" alt="" width={30} className="mr-2" />
          <Link to={"/home"}>
            <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
            Your Company
            </Typography>
          </Link>
            <div>
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