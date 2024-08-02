import React, {Dispatch} from "react";
import {addNewSkiImg, setNewSkiImg} from "../redux/skisSlice";
import {UnknownAction} from "@reduxjs/toolkit";
import {addNewSkiPoleImg, setNewSkiPoleImg} from "../redux/skiPolesSlice";
import {addNewAccessoryImg, setNewAccessoryImg} from "../redux/accessoriesSlice";

export function convertToBase64(event: React.ChangeEvent<HTMLInputElement>,
                                callBackType: "ski" | "skiPole" | "accessory",
                                dispatch: Dispatch<UnknownAction>,
                                actionType?: "add" | "set",
                                index?: number
) {

    function skiSwitch(reader: FileReader) {
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
    }

    function skiPoleSwitch(reader: FileReader) {
        switch (actionType) {
            case "add":
                reader.onload = () => {
                    dispatch(addNewSkiPoleImg(reader.result))
                }
                break;
            case "set":
                reader.onload = () => {
                    dispatch(setNewSkiPoleImg({index: index, data: reader.result}))
                }
                break;
            default:
                reader.onload = () => {
                    dispatch(setNewSkiPoleImg({index: index, data: reader.result}))
                }
                break;
        }
    }

    function accessorySwitch(reader: FileReader) {
        switch (actionType) {
            case "add":
                reader.onload = () => {
                    dispatch(addNewAccessoryImg(reader.result))
                }
                break;
            case "set":
                reader.onload = () => {
                    dispatch(setNewAccessoryImg({index: index, data: reader.result}))
                }
                break;
            default:
                reader.onload = () => {
                    dispatch(setNewAccessoryImg({index: index, data: reader.result}))
                }
                break;
        }
    }

    if (event.target.files) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);

        switch (callBackType) {
            case "ski":
                skiSwitch(reader);
                break;
            case "skiPole":
                skiPoleSwitch(reader);
                break;
            case "accessory":
                accessorySwitch(reader);
                break;
        }

        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
    }
}