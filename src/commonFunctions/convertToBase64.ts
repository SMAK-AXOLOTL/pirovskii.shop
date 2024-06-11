import React, {Dispatch} from "react";
import {addNewSkiImg, setNewSkiImg} from "../redux/skisSlice";
import {UnknownAction} from "@reduxjs/toolkit";
import {setNewSkiPoleImg} from "../redux/skiPolesSlice";

export function convertToBase64(event: React.ChangeEvent<HTMLInputElement>,
                                callBackType: "ski" | "skiPole",
                                dispatch: Dispatch<UnknownAction>,
                                actionType?: "add" | "set",
                                index?: number
) {
    if (event.target.files) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        if (callBackType === 'ski') {
            switch (actionType) {
                case "add":
                    reader.onload = () => {
                        dispatch(addNewSkiImg(reader.result))
                    }
                    break;
                case "set":
                    reader.onload = () => {
                        dispatch(setNewSkiImg({index: index, data: reader.result}))
                    }
                    break;
                default:
                    reader.onload = () => {
                        dispatch(setNewSkiImg({index: index, data: reader.result}))
                    }
                    break;
            }
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