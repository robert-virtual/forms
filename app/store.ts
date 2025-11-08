import { configureStore } from "@reduxjs/toolkit";
import camposReducer from "./features/campos/CamposSlice";
import toolbarOptionsReducer from "./features/toolbarOptions/toolBarOptions";
import formsReducer from "./features/forms/formsSlice";

const store = configureStore({
    reducer: {
        campos: camposReducer,
        toolbarOptions: toolbarOptionsReducer,
        forms: formsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;