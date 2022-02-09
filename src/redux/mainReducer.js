
const defaultState = {
  visibleGoGameModal: false,
  visibleNewRoomModal: false,
  visibleUserRoomModal: false,
  visibleLoginModal: false,
  userLogin: "",
  idUserRoom: "",
  gameSelected: "",
};

export const mainReducer = (
  state = defaultState,
  actions = { type: "", data: "" }
) => {
  switch (actions.type) {
    case "closeModal": {
      return { ...state, [actions.data]: false };
    }
    case "closeModals": {
      return {
        ...state,
        visibleGoGameModal: false,
        visibleNewRoomModal: false,
        visibleUserRoomModal: false,
      };
    }
    case "openModal": {
      return { ...state, [actions.data]: true };
    }
    case "userLogIn": {
      return {
        ...state,
        userLogin: actions.data.login,
        idUserRoom: actions.data.userRoom,
        visibleLoginModal: false,
      };
    }
    case "newUserRoom": {
      console.log(actions.data, 222)
      return {
        ...state,
        userLogin: actions.data.login,
        idUserRoom: actions.data.userRoom,
      };
    }
    case "deleteRoom": {
      return {
        ...state,
        idUserRoom: "",
      };
    }
    case "gameSelected": {
      console.log(actions.data)
      return {
        ...state,
        gameSelected: actions.data,
      };
    }

    default:
      return state;
  }
};
