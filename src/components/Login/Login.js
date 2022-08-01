import classes from "./Login.module.css";
import Card from "../UI/Card";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import "antd/dist/antd.css";
import { userLogin } from "../../api/UserAPI";

const Login = () => {
    const authCtx = useContext(AuthContext);
    const onFinish = (value) => {
        userLogin(value, authCtx);
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
