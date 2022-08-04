import "antd/dist/antd.min.css";
import React, { useState, useEffect } from "react";
import { Table, Menu, Dropdown, Space, notification } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { getGroups, deleteGroup } from "../../../../api/UserAPI";

const Groups = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    let currentGroup;
    useEffect(() => {
        fetchGroups();
    }, []);
    const fetchGroups = async () => {
        setLoading(true);
        const res = await getGroups();
        if (res.status === 200) {
            const data = await res.data.map((d) => {
                return { key: d.name, ...d };
            });
            setDataSource(data);
            setLoading(false);
        }
    };

    const manageGroup = async (action) => {
        switch (action) {
            case "delete":
                const res = await deleteGroup(currentGroup.name);
                if (res.status === 200) {
                    notification.success({
                        message: "Operation done successfully",
                        placement: "top",
                        duration: 1.5,
                    });
                }
                break;
            default:
                return;
        }
    };
    const clickHandler = (item) => {
        switch (item.key) {
            case "1":
                manageGroup("delete");
                break;
            case "2":
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
                    label: "delete group",
                },
            ]}
        />
    );
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            align: "center",
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