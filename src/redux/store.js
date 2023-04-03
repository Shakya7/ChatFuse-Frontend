import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./features/settings/settingSlice";
import appStateReducer from "./features/app_state/appStateSlice";
import loginReducer from "./features/login/loginSlice";

export const store=configureStore({
    reducer:{
        settings:settingsReducer,
        app_state:appStateReducer,
        login_state:loginReducer
    }
})