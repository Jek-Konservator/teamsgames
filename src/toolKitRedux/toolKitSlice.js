import { createSlice } from "@reduxjs/toolkit";

const toolKitSlice = createSlice({
  name: "mainReducer",
  initialState: {
    userInfo: {},
    userType: "",
    gameSelected: "",
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
      state.userInfo.idUserRoom = payload._id;
    },
    gameSelect(state, {payload}) {
      state.gameSelected =payload;
    },
  },
});

export default toolKitSlice.reducer;

export const { setUserInfo,userRoomDelete,userCreateRoom,gameSelect } = toolKitSlice.actions;
