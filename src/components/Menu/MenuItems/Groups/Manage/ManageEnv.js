import "antd/dist/antd.min.css";
import React, { useState, useEffect } from "react";
import { Modal, Transfer, notification } from "antd";
import {
    addEnvironmentsToGroup,
    getAvailableEnvironments,
    getEnvironments,
} from "../../../../../api/UserAPI";

const ManageEnv = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [envData, setEnvData] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);
    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        const res = await getEnvironments();
        const res1 = await getAvailableEnvironments();
        if (res.status === 200 && res1.status === 200) {
            const available = await res1.data;
            const data = [...props.group.environments, ...available].map(
                (d) => {
                    return { key: d.name, ...d };
                }
            );
            setEnvData(data);
            setTargetKeys(available.map((env) => env.name));
        }
    };

    const handleOk = async () => {
        const res = await addEnvironmentsToGroup(
            props.group.name,
            envData
                .filter((group) => targetKeys.indexOf(group.name) < 0)
                .map((group) => group.name)
        );
        if (res.status === 200) {
            notification.success({
                message: "Operation done successfully",
                placement: "top",
                duration: 1.5,
            });
            setIsModalVisible(false);
            props.reloadGroups();
            props.setManageMenu();
        }
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        props.setManageMenu();
    };
    const filterOption = (inputValue, option) =>
        option.name.indexOf(inputValue) > -1;

    const handleChange = (newTargetKeys) => {
        setTargetKeys(newTargetKeys);
    };

    return (
        <Modal
            title={props.title}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            closable={true}
            style={{ display: "flex" }}
        >
            <Transfer
                titles={["Joined", "Available"]}
                dataSource={envData}
                showSearch
                filterOption={filterOption}
                targetKeys={targetKeys}
                onChange={handleChange}
                render={(item) => item.name}
                listStyle={{ height: 300 }}
            />
        </Modal>
    );
};

export default ManageEnv;
