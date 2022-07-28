import "antd/dist/antd.css";
import { Table, Tag, Menu, Dropdown, Space } from "antd";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import ManageUserGroups from "./Manage/ManageUserGroups";

const Users = () => {
    const url = "http://localhost:8080/api/users";
    const authCtx = useContext(AuthContext);
    const [dataSource, setDataSource] = useState([]);
    const [manageMenu, setManageMenu] = useState();
    const [reloadData, setReloadData] = useState(false);
    let currentUser = {};
    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: new Headers({
                Authorization: "Bearer " + authCtx.token,
            }),
        })
            .then((response) => response.json())
            .then((data) =>
                setDataSource(
                    data.map((d) => {
                        return { key: d.id, ...d };
                    })
                )
            );
    }, [reloadData]);
    const clickHandler = (item) => {
        console.log(item);
        switch (item.key) {
            default:
                setManageMenu(
                    <ManageUserGroups
                        user={currentUser}
                        setManageMenu={setManageMenu}
                        setReloadData={setReloadData}
                    />
                );
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
            title: "Action",
            key: "5",
            render: (record) => (
                <Space size="middle">
                    <Dropdown
                        overlay={menu}
                        onClick={() => {
                            test(record);
                        }}
                    >
                        <a>Manage</a>
                    </Dropdown>
                </Space>
            ),
        },
    ];
    const test = (record) => {
        currentUser = record;
    };

    return (
        <>
            <Table dataSource={dataSource} columns={columns} />
            <>{manageMenu}</>
        </>
    );
};

export default Users;
