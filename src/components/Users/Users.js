import "antd/dist/antd.css";
import { Table, Tag, Menu, Dropdown, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import ManageUserGroups from "./Manage/ManageUser";
import { SettingOutlined } from "@ant-design/icons";

const Users = () => {
    const url = "http://localhost:8080/api/users";
    const authCtx = useContext(AuthContext);
    const [dataSource, setDataSource] = useState([]);
    const [manageMenu, setManageMenu] = useState();
    const [loading, setLoading] = useState(false);
    let currentUser = {};
    const fetchUsers = async () => {
        setLoading(true);
        await fetch(url, {
            method: "GET",
            headers: new Headers({
                Authorization: "Bearer " + authCtx.token,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setDataSource(
                    data.map((d) => {
                        return { key: d.id, ...d };
                    })
                );
                console.log(data);
                setLoading(false);
            });
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    const clickHandler = (item) => {
        switch (item.key) {
            case "1":
                setManageMenu(
                    <ManageUserGroups
                        username={currentUser.username}
                        entity={currentUser.groupes}
                        setManageMenu={setManageMenu}
                        fetchUsers={fetchUsers}
                        getUrl="http://localhost:8080/api/groups"
                        postUrl="http://localhost:8080/api/user/addUserToGroups"
                        title={"Manage groups"}
                    />
                );
                break;
            case "2":
                setManageMenu(
                    <ManageUserGroups
                        username={currentUser.username}
                        entity={currentUser.roles}
                        setManageMenu={setManageMenu}
                        fetchUsers={fetchUsers}
                        getUrl="http://localhost:8080/api/roles"
                        postUrl="http://localhost:8080/api/user/addRolesToUser"
                        title="Manage roles"
                    />
                );
                break;
        }
    };
    const menu = (
        <Menu
            onClick={clickHandler}
            items={[
                {
                    key: 1,
                    label: "Manage groups",
                },
                {
                    key: 2,
                    label: "Manage roles",
                },
            ]}
        />
    );

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "1",
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "2",
        },
        {
            title: "Roles",
            key: "3",
            dataIndex: "roles",
            render: (tags) => (
                <>
                    {tags.map((tag) => (
                        <Tag color="blue" key={tag.id}>
                            {tag.name}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: "Groups",
            key: "4",
            dataIndex: "groupes",
            render: (tags) => (
                <>
                    {tags.map((tag) => (
                        <Tag color="blue" key={tag.id}>
                            {tag.name}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: "LdapGroups",
            key: "5",
            dataIndex: "ldapGroups",
            render: (tags) => (
                <>
                    {tags.map((tag) => (
                        <Tag color="blue" key={Math.random()}>
                            {tag.name}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: "Action",
            key: "6",
            render: (record) => (
                <Space size="middle">
                    <Dropdown
                        overlay={menu}
                        onClick={() => {
                            currentUser = record;
                        }}
                    >
                        <a>{React.createElement(SettingOutlined)}</a>
                    </Dropdown>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                pagination={{ pageSize: 10 }}
                dataSource={dataSource}
                columns={columns}
                loading={loading}
            />
            <>{manageMenu}</>
        </>
    );
};

export default Users;
