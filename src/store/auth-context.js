import React, { useState } from "react";
import jwt from "jwt-decode";

const AuthContext = React.createContext({
    token: "",
    roles: [],
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem("token");
    const [token, setToken] = useState(initialToken);
    const [roles, setRoles] = useState([]);
    const userIsLoggedIn = !!token;
    const loginHandler = (token) => {
        setRoles(jwt(token).roles);
        setToken(token);
        localStorage.setItem("token", token);
    };
    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem("token");
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
