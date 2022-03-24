import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCookie, setCookies } from "cookies-next";
import { setUserInfo } from "../toolKitRedux/toolKitSlice";
import { v4 } from "uuid";
import { useRouter } from "next/router";

export const useCheckUser = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(({ mainReducer }) => mainReducer.userInfo);

  if (!getCookie("ghostId")) {
    return () => {
      axios("/api/socket-io");
      const ghostId = v4();
      setCookies("ghostId", ghostId);
      dispatch(
        setUserInfo({ userType: "userGhost", userInfo: { _id: ghostId } })
      );
    };
  } else if (userInfo._id !== getCookie("ghostId")) {
    return () => {
      axios("/api/socket-io");
      axios.get("/api/users/userInfo").then(({ data }) => {
        if (data.status !== "userUndefined") {
          dispatch(setUserInfo({ userType: data.status, userInfo: data.docs }));
        } else {
          const ghostId = v4();
          setCookies("ghostId", ghostId);
          dispatch(
            setUserInfo({ userType: "userGhost", userInfo: { _id: ghostId } })
          );
        }
      });
    };
  } else {
    return () => {
      axios("/api/socket-io");
      return null;
    };
  }
};

