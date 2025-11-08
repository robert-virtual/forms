import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, useNavigate, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { ThemeProvider, CssBaseline, useColorScheme, ToggleButtonGroup, ToggleButton, styled, useTheme, TextField, InputAdornment, IconButton, Button, Typography, Menu, MenuItem, Box, Toolbar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Card, CardContent, Divider, Select, CardActionArea, Snackbar } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useState, useEffect } from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import SunIcon from "@mui/icons-material/LightModeRounded";
import MoonIcon from "@mui/icons-material/DarkModeRounded";
import TuneIcon from "@mui/icons-material/TuneRounded";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SaveIcon from "@mui/icons-material/Save";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const tiposCampo = [
  { value: "texto", label: "Texto Corto" },
  { value: "textarea", label: "Texto Largo" },
  { value: "numero", label: "Numero" },
  { value: "fecha", label: "Fecha" },
  { value: "hora", label: "Hora" },
  { value: "checkbox", label: "Casillas" },
  { value: "radio", label: "Varias opciones" }
];
const defaultCampo = [{ nombre: "", tipo: tiposCampo[0].value, editing: true }];
const camposSlice = createSlice({
  name: "campos",
  initialState: defaultCampo,
  reducers: {
    addCampo: (state, action) => {
      state.push(action.payload);
    },
    setEditingCampo: (state, action) => {
      const { index } = action.payload;
      return state.map((campo, idx) => idx === index ? { ...campo, editing: true } : { ...campo, editing: false });
    },
    updateCampo: (state, action) => {
      const { index, campo } = action.payload;
      state[index] = campo;
    },
    removeCampo: (state, action) => {
      state.splice(action.payload, 1);
    },
    setCampos: (state, action) => {
      return action.payload;
    }
  }
});
const { addCampo, updateCampo, removeCampo, setCampos, setEditingCampo } = camposSlice.actions;
const camposReducer = camposSlice.reducer;
const initialState = {
  componentKey: "default"
};
const toolbarOptions = createSlice({
  name: "toolbarBptions",
  initialState,
  reducers: {
    setToolbarOptions: (state, action) => {
      return action.payload;
    }
  }
});
const { setToolbarOptions } = toolbarOptions.actions;
const toolbarOptionsReducer = toolbarOptions.reducer;
const formsSlice = createSlice({
  name: "forms",
  initialState: {
    currentFormName: "",
    snackbarOpen: false,
    snackbarMsg: "",
    forms: []
  },
  reducers: {
    setCurrentFormName: (state, action) => {
      state.currentFormName = action.payload;
    },
    addForm: (state, action) => {
      state.forms.push(action.payload);
    },
    setSnackbar: (state, action) => {
      state.snackbarMsg = action.payload.message;
      state.snackbarOpen = action.payload.open;
    }
  }
});
const { addForm, setCurrentFormName, setSnackbar } = formsSlice.actions;
const formsReducer = formsSlice.reducer;
const store = configureStore({
  reducer: {
    campos: camposReducer,
    toolbarOptions: toolbarOptionsReducer,
    forms: formsReducer
  }
});
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: "#1976d2"
        }
      }
    }
  }
});
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsxs(ThemeProvider, {
    theme,
    children: [/* @__PURE__ */ jsx(CssBaseline, {}), /* @__PURE__ */ jsx(Provider, {
      store,
      children: /* @__PURE__ */ jsx(Outlet, {})
    })]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function ThemeSwitch() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    ToggleButtonGroup,
    {
      value: mode,
      exclusive: true,
      onChange: (event, newMode) => {
        setMode(newMode);
      },
      children: [
        /* @__PURE__ */ jsx(ToggleButton, { value: "light", children: /* @__PURE__ */ jsx(SunIcon, {}) }),
        /* @__PURE__ */ jsx(ToggleButton, { value: "dark", children: /* @__PURE__ */ jsx(MoonIcon, {}) })
      ]
    }
  );
}
const Div = styled("div")(({
  theme: theme2
}) => ({
  border: `1px solid ${theme2.palette.divider}`,
  borderRadius: theme2.shape.borderRadius,
  padding: theme2.spacing(10),
  boxShadow: theme2.shadows[2],
  minWidth: "300px"
}));
const login = UNSAFE_withComponentProps(function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  useTheme();
  function login2() {
    navigate("/home");
  }
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("div", {
      className: "flex justify-end p-4 sticky top-0",
      children: /* @__PURE__ */ jsx(ThemeSwitch, {})
    }), /* @__PURE__ */ jsx("div", {
      className: "grid place-items-center  h-[90vh] ",
      children: /* @__PURE__ */ jsxs(Div, {
        children: [/* @__PURE__ */ jsx("img", {
          src: "/logo-tailwind.svg",
          alt: "",
          width: 200
        }), /* @__PURE__ */ jsx("h1", {
          className: "text-center",
          children: "Your Company"
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col gap-4 mt-4",
          children: [/* @__PURE__ */ jsx(TextField, {
            variant: "outlined",
            label: "Username",
            placeholder: "Enter your username",
            onChange: ({
              target
            }) => setUsername(target.value),
            value: username
          }), /* @__PURE__ */ jsx(TextField, {
            variant: "outlined",
            label: "Password",
            placeholder: "Enter your password",
            onChange: ({
              target
            }) => setPassword(target.value),
            type: showPassword ? "text" : "password",
            slotProps: {
              input: {
                endAdornment: /* @__PURE__ */ jsx(InputAdornment, {
                  position: "end",
                  children: /* @__PURE__ */ jsx(IconButton, {
                    "aria-label": showPassword ? "hide the password" : "display the password",
                    onClick: handleClickShowPassword,
                    edge: "end",
                    children: showPassword ? /* @__PURE__ */ jsx(VisibilityOff, {}) : /* @__PURE__ */ jsx(Visibility, {})
                  })
                })
              }
            },
            value: password
          }), /* @__PURE__ */ jsx(Button, {
            variant: "contained",
            disabled: username.length < 3 && password.length < 3,
            onClick: login2,
            type: "submit",
            sx: {
              mt: 2
            },
            children: "Login"
          }), /* @__PURE__ */ jsx(Button, {
            variant: "text",
            children: "Forgot Password?"
          })]
        })]
      })
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: login
}, Symbol.toStringTag, { value: "Module" }));
function DefaultToolbarOptions() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  function handleLogout() {
    setAnchorEl(null);
    navigate("/", { replace: true });
  }
  function handleClose() {
    setAnchorEl(null);
  }
  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("img", { src: "/logo-tailwind.svg", alt: "", width: 30, className: "mr-2" }),
    /* @__PURE__ */ jsx(Link, { to: "/home", children: /* @__PURE__ */ jsx(Typography, { variant: "h6", noWrap: true, component: "div", sx: { flexGrow: 1 }, children: "Your Company" }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        IconButton,
        {
          size: "large",
          "aria-label": "account of current user",
          "aria-controls": "menu-appbar",
          "aria-haspopup": "true",
          onClick: handleMenu,
          color: "inherit",
          children: /* @__PURE__ */ jsx(AccountCircle, {})
        }
      ),
      /* @__PURE__ */ jsxs(
        Menu,
        {
          id: "menu-appbar",
          anchorEl,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          },
          keepMounted: true,
          transformOrigin: {
            vertical: "top",
            horizontal: "right"
          },
          open: Boolean(anchorEl),
          onClose: handleClose,
          children: [
            /* @__PURE__ */ jsx(MenuItem, { onClick: handleClose, children: "Profile" }),
            /* @__PURE__ */ jsx(MenuItem, { onClick: handleLogout, children: "Logout" })
          ]
        }
      )
    ] })
  ] });
}
function NewFormToolbarOptions() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const campos = useSelector((state) => state.campos);
  const forms2 = useSelector((state) => state.forms);
  function handleLogout() {
    setAnchorEl(null);
    navigate("/", { replace: true });
  }
  function handleClose() {
    setAnchorEl(null);
  }
  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }
  function saveForm(event) {
    if (forms2.currentFormName.length == 0 || campos.length == 0) {
      dispatch(setSnackbar({ message: "Formulario inválido", open: true }));
      return;
    }
    dispatch(addForm({ campos, nombre: forms2.currentFormName, createAt: (/* @__PURE__ */ new Date()).toISOString(), active: false }));
    dispatch(setSnackbar({ message: "Formulario guardado!", open: true }));
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Box, { sx: { flexGrow: 1 }, children: /* @__PURE__ */ jsx("img", { src: "/logo-tailwind.svg", alt: "", width: 30, className: "mr-2" }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        IconButton,
        {
          size: "large",
          "aria-label": "",
          "aria-controls": "menu-appbar",
          "aria-haspopup": "true",
          onClick: saveForm,
          color: "inherit",
          children: /* @__PURE__ */ jsx(SaveIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(
        IconButton,
        {
          size: "large",
          "aria-label": "account of current user",
          "aria-controls": "menu-appbar",
          "aria-haspopup": "true",
          onClick: handleMenu,
          color: "inherit",
          children: /* @__PURE__ */ jsx(AccountCircle, {})
        }
      ),
      /* @__PURE__ */ jsxs(
        Menu,
        {
          id: "menu-appbar",
          anchorEl,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          },
          keepMounted: true,
          transformOrigin: {
            vertical: "top",
            horizontal: "right"
          },
          open: Boolean(anchorEl),
          onClose: handleClose,
          children: [
            /* @__PURE__ */ jsx(MenuItem, { onClick: handleClose, children: "Profile" }),
            /* @__PURE__ */ jsx(MenuItem, { onClick: handleLogout, children: "Logout" })
          ]
        }
      )
    ] })
  ] });
}
function meta({}) {
  return [{
    title: "Forms"
  }, {
    name: "description",
    content: "Aplicacion para gestion de informacion"
  }];
}
const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open"
})(({
  theme: theme2
}) => ({
  flexGrow: 1,
  padding: theme2.spacing(3),
  transition: theme2.transitions.create("margin", {
    easing: theme2.transitions.easing.sharp,
    duration: theme2.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [{
    props: ({
      open
    }) => open,
    style: {
      transition: theme2.transitions.create("margin", {
        easing: theme2.transitions.easing.easeOut,
        duration: theme2.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    }
  }]
}));
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({
  theme: theme2
}) => ({
  transition: theme2.transitions.create(["margin", "width"], {
    easing: theme2.transitions.easing.sharp,
    duration: theme2.transitions.duration.leavingScreen
  }),
  variants: [{
    props: ({
      open
    }) => open,
    style: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme2.transitions.create(["margin", "width"], {
        easing: theme2.transitions.easing.easeOut,
        duration: theme2.transitions.duration.enteringScreen
      })
    }
  }]
}));
const DrawerHeader = styled("div")(({
  theme: theme2
}) => ({
  display: "flex",
  alignItems: "center",
  padding: theme2.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme2.mixins.toolbar,
  justifyContent: "flex-end"
}));
const toolbarComponents = {
  default: /* @__PURE__ */ jsx(DefaultToolbarOptions, {}),
  newFormOptions: /* @__PURE__ */ jsx(NewFormToolbarOptions, {}),
  empty: /* @__PURE__ */ jsx(Fragment, {})
};
const home = UNSAFE_withComponentProps(function home2() {
  const [open, setOpen] = useState(false);
  const {
    forms: forms2
  } = useSelector((state) => state.forms);
  const [auth, setAuth] = useState(true);
  const theme2 = useTheme();
  function handleDrawerOpen() {
    setOpen(true);
  }
  const toolbarOptions2 = useSelector((state) => state.toolbarOptions);
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  function ToolbarOptions() {
    return toolbarComponents[toolbarOptions2.componentKey];
  }
  return /* @__PURE__ */ jsxs(Box, {
    sx: {
      display: "flex"
    },
    children: [/* @__PURE__ */ jsx(CssBaseline, {}), /* @__PURE__ */ jsx(AppBar, {
      position: "fixed",
      sx: {
        backdropFilter: "blur(10px)"
      },
      open,
      color: "transparent",
      enableColorOnDark: true,
      children: /* @__PURE__ */ jsxs(Toolbar, {
        children: [/* @__PURE__ */ jsx(IconButton, {
          color: "inherit",
          "aria-label": "open drawer",
          onClick: handleDrawerOpen,
          edge: "start",
          sx: [{
            mr: 2
          }, open && {
            display: "none"
          }],
          children: /* @__PURE__ */ jsx(MenuIcon, {})
        }), /* @__PURE__ */ jsx(ToolbarOptions, {})]
      })
    }), /* @__PURE__ */ jsxs(Drawer, {
      sx: {
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box"
        }
      },
      variant: "persistent",
      anchor: "left",
      open,
      children: [/* @__PURE__ */ jsx(DrawerHeader, {
        sx: {
          position: "sticky",
          top: 0,
          backgroundColor: theme2.palette.background.default,
          zIndex: theme2.zIndex.appBar,
          borderBottom: `1px solid ${theme2.palette.divider}`
        },
        children: /* @__PURE__ */ jsx(IconButton, {
          onClick: handleDrawerClose,
          children: theme2.direction === "ltr" ? /* @__PURE__ */ jsx(ChevronLeftIcon, {}) : /* @__PURE__ */ jsx(ChevronRightIcon, {})
        })
      }), /* @__PURE__ */ jsx(List, {
        sx: {
          flexGrow: 1
        },
        children: forms2.length ? forms2.map((form, index) => /* @__PURE__ */ jsx(ListItem, {
          disablePadding: true,
          children: /* @__PURE__ */ jsxs(ListItemButton, {
            children: [/* @__PURE__ */ jsx(ListItemIcon, {
              children: index % 2 === 0 ? /* @__PURE__ */ jsx(InboxIcon, {}) : /* @__PURE__ */ jsx(MailIcon, {})
            }), /* @__PURE__ */ jsx(ListItemText, {
              primary: form.nombre
            })]
          })
        }, index.toString())) : /* @__PURE__ */ jsx(ListItemButton, {
          children: /* @__PURE__ */ jsx(ListItemText, {
            primary: "Aún no tienes formularios"
          })
        })
      }), /* @__PURE__ */ jsxs(Box, {
        sx: {
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
          p: 1.5,
          pb: 2,
          borderTop: "1px solid",
          position: "sticky",
          bottom: 0,
          backgroundColor: theme2.palette.background.default,
          borderColor: theme2.palette.divider
        },
        children: [/* @__PURE__ */ jsx(IconButton, {
          onClick: () => navigate("settings", {
            replace: true
          }),
          children: /* @__PURE__ */ jsx(TuneIcon, {})
        }), /* @__PURE__ */ jsx(ThemeSwitch, {})]
      })]
    }), /* @__PURE__ */ jsx(Main, {
      open,
      children: /* @__PURE__ */ jsx(Outlet, {})
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const forms = UNSAFE_withComponentProps(function Forms() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setToolbarOptions({
      componentKey: "default"
    }));
  }, []);
  return /* @__PURE__ */ jsx("section", {
    className: "grid h-screen w-full place-items-center ",
    children: /* @__PURE__ */ jsx(Button, {
      variant: "outlined",
      onClick: () => navigate("newForm"),
      children: "Agregar nuevo formulario"
    })
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: forms
}, Symbol.toStringTag, { value: "Module" }));
const settings = UNSAFE_withComponentProps(function Settings() {
  return /* @__PURE__ */ jsx("section", {
    className: "grid h-screen w-full place-items-center ",
    children: /* @__PURE__ */ jsx("div", {
      children: "Settings Page"
    })
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: settings
}, Symbol.toStringTag, { value: "Module" }));
const newForm = UNSAFE_withComponentProps(function NewForm() {
  const campos = useSelector((value) => value.campos);
  const forms2 = useSelector((value) => value.forms);
  const dispatch = useDispatch();
  const [nombreCampo, setNombreCampo] = useState("");
  const [tipoCampo, setTipoCampo] = useState("");
  const [editingIndex, setEditigIndex] = useState(0);
  useEffect(() => {
    dispatch(setToolbarOptions({
      componentKey: "newFormOptions"
    }));
    return () => {
      dispatch(setToolbarOptions({
        componentKey: "default"
      }));
    };
  }, []);
  useEffect(() => {
    console.log(campos);
  }, [campos]);
  function handleCloseSnackbar() {
    dispatch(setSnackbar({
      message: "",
      open: false
    }));
  }
  return /* @__PURE__ */ jsxs("section", {
    className: "mt-15  ",
    children: [/* @__PURE__ */ jsx("h2", {
      className: "my-5",
      children: "Nuevo formulario"
    }), /* @__PURE__ */ jsx(Card, {
      children: /* @__PURE__ */ jsx(CardContent, {
        children: /* @__PURE__ */ jsx(TextField, {
          value: forms2.currentFormName,
          onChange: ({
            target
          }) => {
            dispatch(setCurrentFormName(target.value));
          },
          label: "Nombre del formulario",
          variant: "standard"
        })
      })
    }), /* @__PURE__ */ jsx(Divider, {}), /* @__PURE__ */ jsx("h2", {
      className: "my-5",
      children: "Campos"
    }), campos.map((campo, idx) => /* @__PURE__ */ jsx(Card, {
      sx: {
        marginTop: "1rem"
      },
      children: campo.editing ? /* @__PURE__ */ jsxs(CardContent, {
        sx: {
          display: "flex",
          justifyContent: "space-between"
        },
        children: [/* @__PURE__ */ jsx(TextField, {
          label: "Nombre del campo",
          variant: "standard",
          value: nombreCampo,
          onChange: ({
            target
          }) => {
            setNombreCampo(target.value);
            dispatch(updateCampo({
              index: idx,
              campo: {
                ...campo,
                nombre: target.value
              }
            }));
          },
          sx: {
            mr: 2
          }
        }), /* @__PURE__ */ jsxs(Select, {
          label: campo.nombre,
          value: tipoCampo,
          onChange: (e) => {
            setTipoCampo(e.target.value);
            dispatch(updateCampo({
              index: idx,
              campo: {
                ...campo,
                tipo: e.target.value
              }
            }));
          },
          children: [/* @__PURE__ */ jsx(MenuItem, {
            disabled: true,
            selected: true,
            children: "Tipo Campo"
          }), tiposCampo.map((campoOption, idxOption) => /* @__PURE__ */ jsx(MenuItem, {
            value: campoOption.value,
            children: campoOption.label
          }, idxOption.toString()))]
        })]
      }) : /* @__PURE__ */ jsx(CardActionArea, {
        onClick: () => {
          setNombreCampo(campo.nombre);
          setTipoCampo(campo.tipo);
          setEditigIndex(idx);
          dispatch(setEditingCampo({
            index: idx
          }));
        },
        children: /* @__PURE__ */ jsxs(CardContent, {
          children: [/* @__PURE__ */ jsx(Typography, {
            children: campo.nombre
          }), /* @__PURE__ */ jsx(Typography, {
            children: campo.tipo
          })]
        })
      })
    }, idx.toString())), /* @__PURE__ */ jsx(Box, {
      sx: {
        display: "flex",
        flexDirection: "column"
      },
      children: /* @__PURE__ */ jsx(Button, {
        sx: {
          marginTop: "1rem"
        },
        variant: "outlined",
        onClick: () => {
          dispatch(addCampo({
            nombre: "",
            tipo: tiposCampo[0].value,
            editing: true
          }));
          dispatch(setEditingCampo({
            index: editingIndex + 1
          }));
          setEditigIndex((value) => value + 1);
          setNombreCampo("");
          setTipoCampo("");
        },
        children: "Agregar campo"
      })
    }), /* @__PURE__ */ jsx(Snackbar, {
      open: forms2.snackbarOpen,
      autoHideDuration: 6e3,
      onClose: handleCloseSnackbar,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center"
      },
      message: forms2.snackbarMsg
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: newForm
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/forms/assets/entry.client-n03dOwoo.js", "imports": ["/forms/assets/chunk-UIGDSWPH-CevmENRL.js", "/forms/assets/index-CZt6JbnG.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/forms/assets/root-BDPZ58uG.js", "imports": ["/forms/assets/chunk-UIGDSWPH-CevmENRL.js", "/forms/assets/index-CZt6JbnG.js", "/forms/assets/redux-toolkit.modern-BPXhqYy6.js", "/forms/assets/CamposSlice-BewhHeAK.js", "/forms/assets/toolBarOptions-B6_3i0w7.js", "/forms/assets/formsSlice-WaY9feyq.js", "/forms/assets/DefaultPropsProvider-TPUK0YnM.js", "/forms/assets/ThemeProviderWithVars-lKgYgIi8.js", "/forms/assets/CssBaseline-D9H2_NJf.js", "/forms/assets/index-Cfl8NVvP.js"], "css": ["/forms/assets/root-B--42r5m.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login": { "id": "routes/login", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/forms/assets/login-BfX0jeU3.js", "imports": ["/forms/assets/chunk-UIGDSWPH-CevmENRL.js", "/forms/assets/Menu-WlWiYHAz.js", "/forms/assets/ThemeSwitch-oNzzChPc.js", "/forms/assets/CircularProgress-DdD6td7B.js", "/forms/assets/TextField-ByzNk8v3.js", "/forms/assets/DefaultPropsProvider-TPUK0YnM.js", "/forms/assets/Button-aVSiiZ13.js", "/forms/assets/index-Cfl8NVvP.js", "/forms/assets/index-CZt6JbnG.js", "/forms/assets/ThemeProviderWithVars-lKgYgIi8.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": "home", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/forms/assets/home-BleOC7Ms.js", "imports": ["/forms/assets/chunk-UIGDSWPH-CevmENRL.js", "/forms/assets/ThemeSwitch-oNzzChPc.js", "/forms/assets/Menu-WlWiYHAz.js", "/forms/assets/redux-toolkit.modern-BPXhqYy6.js", "/forms/assets/MenuItem-CmjEgGJS.js", "/forms/assets/formsSlice-WaY9feyq.js", "/forms/assets/CircularProgress-DdD6td7B.js", "/forms/assets/DefaultPropsProvider-TPUK0YnM.js", "/forms/assets/CssBaseline-D9H2_NJf.js", "/forms/assets/index-Cfl8NVvP.js", "/forms/assets/ThemeProviderWithVars-lKgYgIi8.js", "/forms/assets/index-CZt6JbnG.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/forms": { "id": "routes/forms", "parentId": "routes/home", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/forms/assets/forms-C8NVojSW.js", "imports": ["/forms/assets/chunk-UIGDSWPH-CevmENRL.js", "/forms/assets/redux-toolkit.modern-BPXhqYy6.js", "/forms/assets/toolBarOptions-B6_3i0w7.js", "/forms/assets/Button-aVSiiZ13.js", "/forms/assets/DefaultPropsProvider-TPUK0YnM.js", "/forms/assets/CircularProgress-DdD6td7B.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/settings": { "id": "routes/settings", "parentId": "routes/home", "path": "settings", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/forms/assets/settings-CCovoDNs.js", "imports": ["/forms/assets/chunk-UIGDSWPH-CevmENRL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/newForm": { "id": "routes/newForm", "parentId": "routes/home", "path": "newForm", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/forms/assets/newForm-DmBQ7D7U.js", "imports": ["/forms/assets/chunk-UIGDSWPH-CevmENRL.js", "/forms/assets/redux-toolkit.modern-BPXhqYy6.js", "/forms/assets/CamposSlice-BewhHeAK.js", "/forms/assets/formsSlice-WaY9feyq.js", "/forms/assets/toolBarOptions-B6_3i0w7.js", "/forms/assets/DefaultPropsProvider-TPUK0YnM.js", "/forms/assets/CircularProgress-DdD6td7B.js", "/forms/assets/Menu-WlWiYHAz.js", "/forms/assets/TextField-ByzNk8v3.js", "/forms/assets/MenuItem-CmjEgGJS.js", "/forms/assets/Button-aVSiiZ13.js", "/forms/assets/index-Cfl8NVvP.js", "/forms/assets/index-CZt6JbnG.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/forms/assets/manifest-145e19d4.js", "version": "145e19d4", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/forms/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/forms/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: "home",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/forms": {
    id: "routes/forms",
    parentId: "routes/home",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "routes/settings": {
    id: "routes/settings",
    parentId: "routes/home",
    path: "settings",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/newForm": {
    id: "routes/newForm",
    parentId: "routes/home",
    path: "newForm",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
