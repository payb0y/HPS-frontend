import classes from "./Login.module.css";
import Card from "../UI/Card";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { notification, Form, Input } from "antd";
import "antd/dist/antd.css";
const Login = () => {
    const authCtx = useContext(AuthContext);
    const onFinish = (value) => {
        const url = "http://localhost:8080/login";
        fetch(url, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded",
            }),
            body: `username=${value.username}&password=${value.password}`,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                if (response.status === 403) {
                    notification.error({
                        message: "403 : FORBIDDEN",
                        placement: "top",
                        duration: 1,
                    });
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
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
            <Card>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <button className={classes.button}>Log in</button>
                </Form.Item>
            </Card>
        </Form>
    );
};

export default Login;
