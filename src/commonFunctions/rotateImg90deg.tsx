import React from "react";

export function rotateImg90deg(base64string: string) {
    return <img src={base64string} style={{transform: "rotate(90deg)"}} alt={'rotated ski'}/>
}