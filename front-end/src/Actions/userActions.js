import api from "../Utils/api";

export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";
export const LOGIN_START = "LOGIN_START";

export const fetchLogin = (user) => dispatch => {
    dispatch({type: LOGIN_START });
    if (user) {
        dispatch({type: LOGIN, payload: user });
    };
};

export const fetchLogout = () => dispatch => {
    localStorage.removeItem("token");
    dispatch({type: LOGOUT})
};

export default fetchLogin;