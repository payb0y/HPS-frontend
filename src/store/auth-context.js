import React, { useState } from "react";
import jwt from "jwt-decode";
import roles from "./roles";

let logoutTimer;

const AuthContext = React.createContext({
    token: "",
    username: "",
    role: "",
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem("token");
    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem("token");

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    };

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    };

    const contextValue = {
        token: token,
        role: token
            ? jwt(token).roles.includes(roles.SUPER_ADMIN)
                ? roles.SUPER_ADMIN
                : jwt(token).roles.includes(roles.ADMIN)
                ? roles.ADMIN
                : roles.USER
            : null,
        username: token ? jwt(token).sub : null,
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
