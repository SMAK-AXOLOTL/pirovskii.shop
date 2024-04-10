import React, {Dispatch} from "react";
import {setNewSkiImg} from "../redux/skisSlice";
import {UnknownAction} from "@reduxjs/toolkit";
import {setNewSkiPoleImg} from "../redux/skiPolesSlice";

export function convertToBase64(event: React.ChangeEvent<HTMLInputElement>, callBackType: "ski" | "skiPole", dispatch: Dispatch<UnknownAction>) {
    if (event.target.files) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);

        if (callBackType === "ski") {
            reader.onload = () => {
                dispatch(setNewSkiImg(reader.result))
            };
        } else {
            reader.onload = () => {
                dispatch(setNewSkiPoleImg(reader.result))
            };
        }
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
    }
}