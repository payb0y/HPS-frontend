import "antd/dist/antd.min.css";
import { Table, Tag, Menu, Dropdown, Space } from "antd";
import React, { useEffect, useState } from "react";
import ManageUser from "./Manage/ManageUser";
import { SettingOutlined } from "@ant-design/icons";
import {
    getGroups,
    getUsers,
    getRoles,
    addUserToGroups,
    addRolesToUser,
} from "../../../../api/UserAPI";

const Users = () => {
    const [dataSource, setDataSource] = useState([]);
    const [manageMenu, setManageMenu] = useState();
    const [loading, setLoading] = useState(false);
    let currentUser;

    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = async () => {
        setLoading(true);
        const res = await getUsers();
        if (res.status === 200) {
            setDataSource(res.data);
            setLoading(false);
        }
    };
    const clickHandler = (item) => {
        switch (item.key) {
            case "1":
                setManageMenu(
                    <ManageUser
                        username={currentUser.username}
                        entity={currentUser.groups}
                        setManageMenu={setManageMenu}
                        fetchUsers={fetchUsers}
                        fetch={getGroups}
                        post={addUserToGroups}
                        title="Manage groups"
                    />
                );
                break;
            case "2":
                setManageMenu(
                    <ManageUser
                        username={currentUser.username}
                        entity={currentUser.roles}
                        setManageMenu={setManageMenu}
                        fetchUsers={fetchUsers}
                        fetch={getRoles}
                        post={addRolesToUser}
                        title="Manage roles"
                    />
                );
                break;
            default:
                return;
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
            title: "Username",
            dataIndex: "username",
            align: "center",
            key: "2",
        },
        {
            title: "Roles",
            key: "3",
            dataIndex: "roles",
            render: (tags) => (
                <>
                    {tags.map((tag) => (
                        <Tag color="blue" key={tag.name}>
                            {tag.name}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: "Groups",
            key: "4",
            dataIndex: "groups",
            render: (tags) => (
                <>
                    {tags.map((tag) => (
                        <Tag color="blue" key={tag.name}>
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
                        <Tag color="blue" key={tag.name}>
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
