import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../store/auth-context";

import "antd/dist/antd.css";
import { Table } from "antd";

const Groups = () => {
    const url = "http://localhost:8080/api/groups";
    const authCtx = useContext(AuthContext);
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(url, {
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
    }, []);
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
