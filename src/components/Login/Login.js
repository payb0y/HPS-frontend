import classes from "./Login.module.css";
import Card from "../UI/Card";
import { useState, useContext } from "react";
import AuthContext from "../../store/auth-context";

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const authCtx = useContext(AuthContext);
    const formSubmitHandler = (e) => {
        e.preventDefault();
        const url = "http://localhost:8080/login";
        fetch(url, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded",
            }),
            body: `username=${username}&password=${password}`,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                if (response.status == 403) {
                    props.msgHandler("403 : FORBIDDEN");
                }
            })
            .then((data) => {
                authCtx.login(data.access_token);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const usernameHandler = (e) => {
        setUsername(e.target.value);
    };
    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };
    return (
        <form onSubmit={formSubmitHandler}>
            <Card>
                <input
                    className={classes.input}
                    onChange={usernameHandler}
                    type="text"
                    placeholder="Username"
                />
                <input
                    className={classes.input}
                    onChange={passwordHandler}
                    type="password"
                    placeholder="Password"
                />
                <button className={classes.button}>Log in</button>
            </Card>
        </form>
    );
};

export default Login;