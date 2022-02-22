import styled from "styled-components";

export const GoGameRoomComponentStyled = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GoGameRoomComponentContentStyled = styled("div")`
  min-width: 350px;
  min-height: 450px;
  padding: 10px;
  background-color: #9de2f1;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const GoGameRoomComponentInfoStyled = styled("div")`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-bottom: 10px;
  color: #5660c1;
`;

export const GoGameRoomComponentNumberUsersStyled = styled("div")`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
  margin-bottom: 10px;
  color: #5660c1;
  user-select: none;
`;
export const GoGameRoomComponentUsersStyled = styled("div")`
  display: flex;
  flex-direction: column;
  background-color: white;
  color: black;
  border-radius: 10px;
`;
export const GoGameRoomComponentUsersInfoStyled = styled("div")`
  display: flex;
  border-bottom: solid 1px gray;
  padding: 5px;
  color:#5660C1;
  :last-child {
    border-bottom: none;
`;

export const GoGameRoomComponentMessageToConnectStyled = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin: 60px;
  font-size: 20px;
`;
export const GoGameRoomComponentControlButtonsStyled = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;
