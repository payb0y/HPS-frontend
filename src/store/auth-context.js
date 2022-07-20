import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";

let logoutTimer;

const AuthContext = React.createContext({
    token: "",
    roles: [],
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});
const calcRemainingTime = (exp) => {
    return exp * 1000 - new Date().getTime();
};

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem("token");
    const [token, setToken] = useState(initialToken);
    const [roles, setRoles] = useState([]);

    const userIsLoggedIn = !!token;

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem("token");

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    };

    const loginHandler = (token) => {
        setRoles(jwt(token).roles);
        setToken(token);
        localStorage.setItem("token", token);
        logoutTimer = setTimeout(
            logoutHandler,
            calcRemainingTime(jwt(token).exp)
        );
    };

    const contextValue = {
        token: token,
        roles: roles,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
