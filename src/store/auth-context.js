import React, { useState } from "react";
import jwt from "jwt-decode";

let logoutTimer;

const AuthContext = React.createContext({
    token: "",
    username: "",
    roles: [],
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem("token");
    const [token, setToken] = useState(initialToken);
    const [roles, setRoles] = useState([]);
    const [username, setUsername] = useState("");

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
        setUsername(jwt(token).sub);
        localStorage.setItem("token", token);
    };

    const contextValue = {
        token: token,
        roles: roles,
        username: username,
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
