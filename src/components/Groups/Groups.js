import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../store/auth-context";

import "antd/dist/antd.css";
import { Table, Menu, Dropdown, Space, notification } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const Groups = () => {
    const url = "http://localhost:8080/api/groups";
    const authCtx = useContext(AuthContext);
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    let currentGroup;
    const fetchGroups = async () => {
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
                setLoading(false);
            });
    };
    useEffect(() => {
        fetchGroups();
    }, []);
    const manageGroup = async (action) => {
        await fetch(`http://localhost:8080/api/group/${action}`, {
            method: "POST",
            headers: new Headers({
                Authorization: "Bearer " + authCtx.token,
                "Content-Type": "application/x-www-form-urlencoded",
            }),
            body: "groupName=" + currentGroup.name,
        }).then((response) => {
            if (response.ok) {
                fetchGroups();
                notification.success({
                    message: "Operation done successfully",
                    placement: "top",
                    duration: 1.5,
                });
            } else {
                notification.error({
                    message: "Operation failed",
                    placement: "top",
                    duration: 1.5,
                });
            }
        });
    };
    const clickHandler = (item) => {
        console.log(currentGroup);
        switch (item.key) {
            case "1":
                console.log("test");
                manageGroup("delete");
                break;
            case "2":
                break;
        }
        console.log(currentGroup);
    };
    const menu = (
        <Menu
            onClick={clickHandler}
            items={[
                {
                    key: 1,
                    label: "delete group",
                },
                {
                    key: 2,
                    label: "rename group",
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
            title: "Name",
            dataIndex: "name",
            key: "2",
        },
        {
            title: "Action",
            key: "6",
            render: (record) => (
                <Space size="middle">
                    <Dropdown
                        overlay={menu}
                        onClick={() => {
                            currentGroup = record;
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
                dataSource={dataSource}
                columns={columns}
                loading={loading}
            />
        </>
    );
};

export default Groups;
