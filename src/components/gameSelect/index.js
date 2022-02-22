import React from "react";
import "./gameSelectStyle.module";
import { GameAutocompleteStyled } from "./gameSelectStyle.module";
import {TextFieldKit} from "../../UIKit/textField";
export const GameSelect = (props) => {
    return (
        <>
            <GameAutocompleteStyled
                {...props}
                options={GAMES}
                renderOption={(props, option) => (
                    <li style={{ color: "#5660C1"}} {...props}>{option}</li>
                )}
                renderInput={(params) => <TextFieldKit sx={{margin:"0px !important"}} {...params} placeholder="Игра" />}
            />
        </>
    );
};

const GAMES = ["Apex Legends", "Dota 2", "PUBG", "Genshin Impact"];
