import React from "react";
import { useAppDispatch } from "./context";



export const handleLogout = (dispatch) => {
    dispatch({ type: "REQUEST_LOGOUT" });
    dispatch({ type: "LOGOUT_SUCCESS" });
};
