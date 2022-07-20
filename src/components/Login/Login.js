import classes from "./Login.module.css";
import Card from "../UI/Card";
import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";

const Login = (props) => {
    const authCtx = useContext(AuthContext);
    const usernameRef = useRef();
    const passwordRef = useRef();
    const formSubmitHandler = (e) => {
        e.preventDefault();
        const url = "http://localhost:8080/login";
        fetch(url, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded",
            }),
            body: `username=${usernameRef.current.value}&password=${passwordRef.current.value}`,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                if (response.status === 403) {
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
    return (
        <form onSubmit={formSubmitHandler}>
            <Card>
                <input
                    className={classes.input}
                    ref={usernameRef}
                    type="text"
                    placeholder="Username"
                />
                <input
                    className={classes.input}
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                />
                <button className={classes.button}>Log in</button>
            </Card>
        </form>
    );
};

export default Login;
