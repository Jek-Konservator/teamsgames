import { createSlice } from "@reduxjs/toolkit";

const toolKitSlice = createSlice({
  name: "mainReducer",
  initialState: {
    userInfo: {},
    userType: "",
  },
  reducers: {
    setUserInfo(state, action) {
      if (action.payload.userType === "userGhost") {
        state.userType = "userGhost";
        state.userInfo = { _id: action.payload.userInfo };
      } else if (action.payload.userType === "userInfo") {
        state.userType = "userInfo";
        state.userInfo = action.payload.userInfo;
      } else {
        state.userType = "";
        state.userInfo = {};
      }
    },
  },
});

export default toolKitSlice.reducer;

export const { setUserInfo } = toolKitSlice.actions;
