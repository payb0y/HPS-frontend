import { useContext } from "react";
import Card from "../UI/Card";
import AuthContext from "../../store/auth-context";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import { userLogin } from "../../api/UserAPI";
import "antd/dist/antd.min.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const authCtx = useContext(AuthContext);
    let navigate = useNavigate();
    const onFinish = async (value) => {
        const response = await userLogin(value, authCtx);
        if (response) {
            const data = await response.json();
            authCtx.login(data.access_token);
            navigate("/");
        }
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
                    <Button htmlType="submit">Login</Button>
                </Form.Item>
            </Card>
        </Form>
    );
};

export default Login;
