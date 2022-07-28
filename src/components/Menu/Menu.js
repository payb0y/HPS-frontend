import React, { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";

import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import Users from "../Users/Users";

const Menue = () => {
    const [activeMenu, setActiveMenu] = useState();
    const authCtx = useContext(AuthContext);

    const clickHandler = (item) => {
        switch (item.key) {
            case "logout":
                authCtx.logout();
            case "users":
                setActiveMenu(<Users />);
        }
    };
    const { Content, Sider } = Layout;
    const items = [
        {
            key: "users",
            icon: React.createElement(UserOutlined),
            label: "Users",
        },
        {
            key: "logout",
            icon: React.createElement(LogoutOutlined),
            label: "Logout",
        },
    ];

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
                    items={items}
                    onClick={clickHandler}
                />
            </Sider>
            <Layout
                style={{
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
