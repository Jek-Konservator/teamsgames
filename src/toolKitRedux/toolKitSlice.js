import { createSlice } from "@reduxjs/toolkit";

const toolKitSlice = createSlice({
  name: "mainReducer",
  initialState: {
    userInfo: {},
    userType: "",
  },
  reducers: {
    setUserInfo(state, {payload}) {
      if (payload.userType === "userGhost") {
        state.userType = "userGhost";
        state.userInfo = payload.userInfo;
      } else if (payload.userType === "userInfo") {
        state.userType = "userInfo";
        state.userInfo = payload.userInfo;
      } else {
        state.userType = "";
        state.userInfo = {};
      }
    },
    userRoomDelete(state) {
      state.userInfo = {...state.userInfo, idUserRoom:""};
    },
    userCreateRoom(state, {payload}) {
      console.log(payload)
      state.userInfo.idUserRoom = payload._id;
    },
  },
});

export default toolKitSlice.reducer;

export const { setUserInfo,userRoomDelete,userCreateRoom } = toolKitSlice.actions;
