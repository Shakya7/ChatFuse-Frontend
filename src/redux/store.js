import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./features/settings/settingSlice";
import appStateReducer from "./features/app_state/appStateSlice";

export const store=configureStore({
    reducer:{
        settings:settingsReducer,
        app_state:appStateReducer
    }
})