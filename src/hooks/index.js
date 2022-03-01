import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import { setUserInfo } from "../toolKitRedux/toolKitSlice";

export const useCheckUser = () => {
  const dispatch = useDispatch();
  const  userInfo  = useSelector(({ mainReducer }) => mainReducer.userInfo);

  if (userInfo._id !== getCookie("ghostId")) {
    return () => {
      axios.get("/api/users/userInfo").then(({ data }) => {
        if (data.status !== "userUndefined") {
          dispatch(setUserInfo({ userType: data.status, userInfo: data.docs }));
        }
      });
    };
  } else {
    return ()=>{return null};
  }
};
