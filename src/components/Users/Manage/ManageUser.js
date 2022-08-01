import React, { useState, useEffect, useContext } from "react";
import "antd/dist/antd.css";
import AuthContext from "../../../store/auth-context";
import { Modal, Transfer } from "antd";
import differenceBy from "lodash/differenceBy";
import { addGroupOrRoleToUser, getGroupsOrRoles } from "../../../api/UserAPI";

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
        getGroupsOrRoles(props, authCtx, setUsergroups);
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
        addGroupOrRoleToUser(
            props,
            authCtx,
            userGroups
                .filter((group) => targetKeys.indexOf(group.id) < 0)
                .map((group) => group.name)
        );
        props.setReload(Math.random());
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
