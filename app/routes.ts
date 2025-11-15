import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
index("routes/login.tsx"),
route("home", "routes/home.tsx",[
    index("routes/lotes.tsx"),
    route("forms","routes/forms.tsx"),
    route("lote/:loteId","routes/lote.tsx"),
    route("settings", "routes/settings.tsx"),
    route("newForm", "routes/newForm.tsx"),
]),
] satisfies RouteConfig;
