import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./features/settings/settingSlice";
import appStateReducer from "./features/app_state/appStateSlice";
import loginReducer from "./features/login/loginSlice";
import profileReducer from "./features/profile/profileSlice";
import friendReducer from "./features/friend/friendSlice";

export const store=configureStore({
    reducer:{
        settings:settingsReducer,
        app_state:appStateReducer,
        login_state:loginReducer,
        profile_state:profileReducer,
        friend:friendReducer
    }
})