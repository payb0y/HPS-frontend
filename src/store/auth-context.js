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
    const [token, setToken] = useState(null);
    const [roles, setRoles] = useState([]);
    const userIsLoggedIn = !!token;
    const loginHandler = (token) => {
        setRoles(jwt(token).roles);
        setToken(token);
    };
    const logoutHandler = () => {
        setToken(null);
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
