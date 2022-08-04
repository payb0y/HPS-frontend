import "antd/dist/antd.min.css";
import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { getRoles } from "../../../../api/UserAPI";

const Roles = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchGroups();
    }, []);
    const fetchGroups = async () => {
        setLoading(true);
        const res = await getRoles();
        if (res.status === 200) {
            const data = await res.data.map((d) => {
                return { key: d.name, ...d };
            });
            setDataSource(data);
            setLoading(false);
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            align: "center",
            key: "2",
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

export default Roles;
