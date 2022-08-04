import "antd/dist/antd.min.css";
import React, { useState, useEffect } from "react";
import { Table, Dropdown, Space, Menu, notification } from "antd";
import { deleteEnvironment, getEnvironments } from "../../../../api/UserAPI";
import { SettingOutlined } from "@ant-design/icons";
import AddItem from "../../../AddItem/AddItem";

const Environments = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    let currentEnv;
    useEffect(() => {
        fetchEnvironments();
    }, []);
    const fetchEnvironments = async () => {
        setLoading(true);
        const res = await getEnvironments();
        if (res.status === 200) {
            const data = await res.data.map((d) => {
                return { key: d.name, ...d };
            });
            setDataSource(data);
            setLoading(false);
        }
    };
    const clickHandler = async (item) => {
        switch (item.key) {
            case "1":
                const res = await deleteEnvironment(currentEnv.name);
                if (res.status === 200) {
                    fetchEnvironments();
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
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            align: "center",
            key: "1",
        },
        {
            title: "Action",
            key: "2",
            align: "center",
            render: (record) => (
                <Space size="middle">
                    <Dropdown
                        overlay={menu}
                        onClick={() => {
                            currentEnv = record;
                        }}
                    >
                        <a>{React.createElement(SettingOutlined)}</a>
                    </Dropdown>
                </Space>
            ),
        },
    ];
    const menu = (
        <Menu
            onClick={clickHandler}
            items={[
                {
                    key: 1,
                    label: "Delete environment",
                },
            ]}
        />
    );

    return (
        <>
            <Table
                dataSource={dataSource}
                columns={columns}
                loading={loading}
                pagination={{ pageSize: 8 }}
            />
            <AddItem type="Environment" reloadData={fetchEnvironments} />
        </>
    );
};

export default Environments;
