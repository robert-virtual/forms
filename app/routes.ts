import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
index("routes/login.tsx"),
route("home", "routes/home.tsx",[
    index("routes/forms.tsx"),
    route("settings", "routes/settings.tsx"),
    route("newForm", "routes/newForm.tsx"),
]),
] satisfies RouteConfig;
