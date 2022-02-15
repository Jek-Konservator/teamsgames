import styled from "styled-components";
import {Autocomplete} from "@mui/material";

export const GameAutocompleteStyled = styled(Autocomplete)`
  margin: 5px;
  border-radius: 5px;
  background-color: white;
  border: none;
  :hover:active{
    border-color: #5660C1;
  }
`