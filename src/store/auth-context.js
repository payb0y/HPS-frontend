import React, { useState } from "react";
import jwt from "jwt-decode";

const AuthContext = React.createContext({
    token: "",
    roles: [],
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});
const calcRemainingTime = (exp) => {
    return new Date(exp).getTime() - new Date().getTime();
};
export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem("token");
    const [token, setToken] = useState(initialToken);
    const [roles, setRoles] = useState([]);

    const userIsLoggedIn = !!token;

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    const loginHandler = (token) => {
        setRoles(jwt(token).roles);
        setToken(token);
        localStorage.setItem("token", token);

        const remainingTime = calcRemainingTime(jwt(token).exp);
        console.log(remainingTime);
        setTimeout(logoutHandler, remainingTime);
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
