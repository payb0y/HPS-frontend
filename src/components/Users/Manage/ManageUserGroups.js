import React, { useState, useEffect, useContext } from "react";
import "antd/dist/antd.css";
import AuthContext from "../../../store/auth-context";
import { Modal, Transfer } from "antd";

const ManageUserGroups = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const authCtx = useContext(AuthContext);
    const [userGroups, setUsergroups] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);
    const url = "http://localhost:8080/api/groups";

    const handleCancel = () => {
        setIsModalVisible(false);
        props.setManageMenu();
    };

    useEffect(() => {
        fetch(url, {
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
            userGroups
                .filter(
                    ({ id: id1 }) =>
                        !props.user.groupes.some(({ id: id2 }) => id2 === id1)
                )
                .map((group) => group.id)
        );
    }, [userGroups]);
    const filterOption = (inputValue, option) =>
        option.name.indexOf(inputValue) > -1;

    const handleChange = (newTargetKeys) => {
        setTargetKeys(newTargetKeys);
    };
    const handleOk = () => {
        fetch("http://localhost:8080/api/user/addUserToGroups", {
            method: "POST",
            headers: new Headers({
                Authorization: "Bearer " + authCtx.token,
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                username: props.user.username,
                groupNames: userGroups
                    .filter((group) => targetKeys.indexOf(group.id) < 0)
                    .map((group) => group.name),
            }),
        });
        props.setReloadData(Math.random());
    };
    return (
        <Modal
            title="Manage groups"
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
