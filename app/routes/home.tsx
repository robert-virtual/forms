import type { Route } from "./+types/home";
import { use, useEffect, useState } from "react";
import {  Avatar, Box, Button, DialogContent, DialogTitle, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, SvgIcon, Typography, useTheme } from "@mui/material";
import { ThemeSwitch } from "~/ThemeSwitch/ThemeSwitch";
import TuneIcon from '@mui/icons-material/TuneRounded';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import MenuIcon from '@mui/icons-material/Menu';
import { CssBaseline, styled, Toolbar } from "@mui/material";
import MuiAppBar from '@mui/material/AppBar';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Link, Outlet, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";
import { DefaultToolbarOptions } from "~/toolbaroptions/defaultOptions";
import { NewFormToolbarOptions } from "~/toolbaroptions/newFormOptions";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Forms" },
    { name: "description", content: "Aplicacion para gestion de informacion" },
  ];
}
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const toolbarComponents = {
  default: <DefaultToolbarOptions />,
  newFormOptions: <NewFormToolbarOptions/>,
  empty: <></>,
};
export type ToolbarComponents = keyof typeof toolbarComponents

export default function home() {
  const [open,setOpen] = useState(false)
  const {forms} = useSelector((state:RootState)=>state.forms)
  const [auth, setAuth] = useState(true);
  const theme = useTheme();
  function handleDrawerOpen() {
     setOpen(true);
  };

  const toolbarOptions = useSelector((state:RootState)=>state.toolbarOptions)
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate()
  function gotoSettings(){
    // navigate to settings page
  }
  function ToolbarOptions() {
    return toolbarComponents[toolbarOptions.componentKey] 
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        sx={{
          backdropFilter: 'blur(10px)',
        }}
        open={open}  
        color="transparent" 
        enableColorOnDark>
        <Toolbar
        
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <ToolbarOptions/>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{position:'sticky',top:0,backgroundColor:theme.palette.background.default,zIndex:theme.zIndex.appBar, borderBottom:`1px solid ${theme.palette.divider}`}}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <List sx={{flexGrow: 1}} >
            <Link to={"/home"}>
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Lotes"} />
              </ListItemButton>
            </ListItem>
            </Link>
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Usuarios"} />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider/>
        <List sx={{flexGrow: 1}} >
          {forms.length &&  forms.map((form, index) => (
            <ListItem key={index.toString()} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={form.nombre} />
              </ListItemButton>
            </ListItem>
          ))
        }
        </List>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 1,
            p: 1.5,
            pb: 2,
            borderTop: '1px solid',
            position: 'sticky',
            bottom: 0,
            backgroundColor: theme.palette.background.default,
            borderColor: theme.palette.divider,
          }}
        >
          
      <IconButton
        onClick={() => navigate('settings',{replace:true})}
      >
        <TuneIcon />
      </IconButton>
          <ThemeSwitch />
        </Box>
      </Drawer>
      <Main open={open}>
        <Outlet></Outlet>
      </Main>
    </Box>
  );  
}

