import "antd/dist/antd.min.css";
import { Table, Tag, Menu, Dropdown, Space } from "antd";
import React, { useEffect, useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { getUsers } from "../../../../api/UserAPI";
import ManageUserRoles from "./Manage/ManageUserRoles";
import ManageUserGroups from "./Manage/ManageUser";

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
                    <ManageUserGroups
                        user={currentUser}
                        setManageMenu={setManageMenu}
                        reloadUsers={fetchUsers}
                    />
                );
                break;
            case "2":
                setManageMenu(
                    <ManageUserRoles
                        user={currentUser}
                        setManageMenu={setManageMenu}
                        reloadUsers={fetchUsers}
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
                    label: "Manage role",
                },
            ]}
        />
    );

    const columns = [
        {
            title: "Username",
            dataIndex: "username",
            align: "center",
            key: "1",
        },
        {
            title: "Role",
            key: "2",
            dataIndex: "role",
            render: (tag) => (
                <>
                    {tag !== null ? (
                        <Tag color="blue" key={tag.name}>
                            {tag.name}
                        </Tag>
                    ) : null}
                </>
            ),
        },
        {
            title: "Groups",
            key: "3",
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
            key: "4",
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
            key: "5",
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
