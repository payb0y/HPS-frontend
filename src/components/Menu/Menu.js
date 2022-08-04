import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import "antd/dist/antd.min.css";
import { Layout, Menu } from "antd";
import { UserOutlined, LogoutOutlined, TeamOutlined } from "@ant-design/icons";

import roles from "../../store/roles";
import { useNavigate } from "react-router-dom";

const Menue = (props) => {
    const authCtx = useContext(AuthContext);
    const { Content, Sider } = Layout;
    const navigate = useNavigate();

    const clickHandler = (item) => {
        switch (item.key) {
            case "users":
                navigate("/users");
                break;
            case "groups":
                navigate("/groups");
                break;
            case "logout":
                authCtx.logout();
                break;
            default:
                return;
        }
    };
    const items = [
        {
            key: "users",
            icon: React.createElement(UserOutlined),
            label: "Users",
            role: roles.ADMIN,
        },
        {
            key: "groups",
            icon: React.createElement(TeamOutlined),
            label: "Groups",
            role: roles.ADMIN,
        },
        {
            key: "roles",
            icon: React.createElement(TeamOutlined),
            label: "Roles",
            role: roles.SUPER_ADMIN,
        },
    ];

    const rolesFilter = () => {
        switch (authCtx.role) {
            case roles.USER:
                return items.filter((item) => item.role === roles.USER);
            case roles.ADMIN:
                return items.filter((item) => item.role === roles.ADMIN);
            case roles.SUPER_ADMIN:
                return items;
            default:
                return [];
        }
    };
    return (
        <Layout
            style={{
                margin: "80px 40px",
                height: "fit-content",
            }}
        >
            <Sider width={200} className="site-layout-background">
                <Menu
                    mode="inline"
                    style={{
                        height: "100%",
                        borderRight: 0,
                    }}
                    items={[
                        ...rolesFilter(),
                        {
                            key: "logout",
                            icon: React.createElement(LogoutOutlined),
                            label: "Logout",
                        },
                    ]}
                    onClick={clickHandler}
                />
            </Sider>
            <Layout
                style={{
                    width: "fit-content",
                    padding: "0 24px 24px",
                }}
            >
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Menue;
