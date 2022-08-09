import "antd/dist/antd.min.css";
import React, { useState, useEffect } from "react";
import { Modal, Transfer, notification } from "antd";
import {
    addEnvironmentsToGroup,
    getAvailableEnvironments,
    getEnvironments,
} from "../../../../../api/UserAPI";
import { differenceBy } from "lodash";

const ManageEnv = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [envData, setEnvData] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);
    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        const res = await getEnvironments();
        if (res.status === 200) {
            const data = res.data.map((d) => {
                return { key: d.name, ...d };
            });
            setEnvData(data);
            setTargetKeys(
                differenceBy(data, props.group.environments, "name").map(
                    (data) => data.name
                )
            );
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
