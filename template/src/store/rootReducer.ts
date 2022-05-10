import { combineReducers } from 'redux'
import settingSlice from "./slice/settingSlice";
import authSlice from "./slice/authSlice";

const rootReducer = combineReducers({
  setting: settingSlice.reducer,
  auth: authSlice.reducer
})

export default rootReducer
