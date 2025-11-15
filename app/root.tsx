import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "react-router";
import '@fontsource/inter';

import type { Route } from "./+types/root";
import "./app.css";
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { type AppDispatch, type RootState } from "./store";
import { useEffect, useState } from "react";
import supabase from "./utils/supabase";
import { setSesion } from "./features/sesion/sesionSlice";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
        {children}
        </Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const theme = createTheme({
  colorSchemes: {
    dark:{
      palette:{
        mode: 'dark',
        primary: { main: '#1976d2' },
      }
    } 
  },
});
export default function App() {
    const session = useSelector((state:RootState)=>state.session)
    const dispatch = useDispatch<AppDispatch>()
    const [isLoading,setIsLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(()=>{
        supabase.auth.getSession().then(({data})=>{
            dispatch(setSesion(data.session))
            setIsLoading(false)
        })
        const {data:{subscription}}  = supabase.auth.onAuthStateChange((_event,sesion)=>{
          console.log("auth changed")
          dispatch(setSesion(sesion))
          if (Object.keys(session)) {
            console.log("navigating to home")
            navigate('/home',{replace:true}) 
          }
          if (!Object.keys(session)) {
            navigate('/',{replace:true}) 
          }
        })
        return ()=> {
          console.log("subcription remove")
          subscription.unsubscribe()
        }
    },[])
    if (isLoading) {
        return (
            <div className="grid place-content-center h-screen ">
                <CircularProgress/>
            </div>
        )     
    }
  return (
  <ThemeProvider theme={theme}>
    <CssBaseline/>
      <Outlet />
  </ThemeProvider>
  ) ;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
