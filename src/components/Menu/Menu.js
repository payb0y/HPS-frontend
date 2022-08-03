import React, { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import "antd/dist/antd.min.css";
import { Layout, Menu } from "antd";
import { UserOutlined, LogoutOutlined, TeamOutlined } from "@ant-design/icons";

import Users from "../Users/Users";
import Groups from "../Groups/Groups";
import roles from "../../store/roles";
const Menue = () => {
    const [activeMenu, setActiveMenu] = useState();
    const authCtx = useContext(AuthContext);
    const { Content, Sider } = Layout;
    const clickHandler = (item) => {
        switch (item.key) {
            case "users":
                setActiveMenu(<Users />);
                break;
            case "groups":
                setActiveMenu(<Groups />);
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
        const role = authCtx.roles.includes(roles.SUPER_ADMIN)
            ? roles.SUPER_ADMIN
            : authCtx.roles.includes(roles.ADMIN)
            ? roles.ADMIN
            : roles.USER;

        switch (role) {
            case roles.USER:
                return items.filter((item) => item.role === roles.USER);
            case roles.ADMIN:
                return items.filter((item) => item.role === roles.ADMIN);
            case roles.SUPER_ADMIN:
                return items;
        }
        return [];
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
                    {activeMenu}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Menue;
