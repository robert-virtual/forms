import { configureStore } from "@reduxjs/toolkit";
import camposReducer from "./features/campos/CamposSlice";
import toolbarOptionsReducer from "./features/toolbarOptions/toolBarOptions";
import sessionReducer from "./features/sesion/sesionSlice";
import formsReducer from "./features/forms/formsSlice";
import { imagesApi } from "./features/images/imageApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        campos: camposReducer,
        toolbarOptions: toolbarOptionsReducer,
        forms: formsReducer,
        session: sessionReducer,
        [imagesApi.reducerPath]: imagesApi.reducer,
    },
    middleware: (getDefaultMidleware) => getDefaultMidleware().concat(imagesApi.middleware)
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;