import React, { useState, useEffect, useContext } from "react";
import "antd/dist/antd.css";
import AuthContext from "../../../store/auth-context";
import { notification, Modal, Transfer } from "antd";
import differenceBy from "lodash/differenceBy";

const ManageUserGroups = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const authCtx = useContext(AuthContext);
    const [userGroups, setUsergroups] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);
    const handleCancel = () => {
        setIsModalVisible(false);
        props.setManageMenu();
    };

    useEffect(() => {
        fetch(props.getUrl, {
            method: "GET",
            headers: new Headers({
                Authorization: "Bearer " + authCtx.token,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setUsergroups(
                    data.map((data) => {
                        return { key: data.id, ...data };
                    })
                );
            });
    }, []);
    useEffect(() => {
        setTargetKeys(
            differenceBy(userGroups, props.entity, "id").map(
                (group) => group.id
            )
        );
    }, [userGroups]);
    const filterOption = (inputValue, option) =>
        option.name.indexOf(inputValue) > -1;

    const handleChange = (newTargetKeys) => {
        setTargetKeys(newTargetKeys);
    };
    const handleOk = async () => {
        await fetch(props.postUrl, {
            method: "POST",
            headers: new Headers({
                Authorization: "Bearer " + authCtx.token,
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                username: props.username,
                names: userGroups
                    .filter((group) => targetKeys.indexOf(group.id) < 0)
                    .map((group) => group.name),
            }),
        }).then((response) => {
            if (response.ok) {
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
        props.fetchUsers();
        setIsModalVisible(false);
        props.setManageMenu();
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
                dataSource={userGroups}
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

export default ManageUserGroups;
