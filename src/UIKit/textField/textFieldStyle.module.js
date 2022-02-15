import styled from "styled-components";
import {TextField} from "@mui/material";

export const TextFieldStyled = styled(TextField)`
  margin: 5px;
  border: none;
  border-radius: 5px;
  background-color: white;

  .MuiTextField-root.Mui-focused{
    border-color: red;
  }
`