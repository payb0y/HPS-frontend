import { Select, Modal, notification } from "antd";
import "antd/dist/antd.min.css";
import { useEffect, useState } from "react";
import { addRoleToUser, getRoles } from "../../../../../api/UserAPI";

const ManageUserRoles = (props) => {
    const { Option } = Select;
    const [menuData, setMenuData] = useState([]);
    let chosenRole = props.user.role !== null ? props.user.role.name : "";
    useEffect(() => {
        fetchRoles();
    }, []);
    const fetchRoles = async () => {
        const response = await getRoles();
        if (response.status === 200) {
            const data = await response.data;
            setMenuData(data);
        }
    };
    const handleChange = (value) => {
        chosenRole = value;
    };
    const handleOk = async () => {
        if (props.user.role.name !== chosenRole) {
            const response = await addRoleToUser(
                props.user.username,
                chosenRole
            );
            if (response.status === 200) {
                notification.success({
                    message: "Operation done successfully",
                    placement: "top",
                    duration: 1.5,
                });
                props.reloadUsers();
            }
        }
        props.setManageMenu();
    };
    const handleCancel = () => {
        props.setManageMenu();
    };
    return (
        <Modal
            title={"Manage role"}
            visible={true}
            closable={false}
            onOk={handleOk}
            onCancel={handleCancel}
            style={{ display: "flex" }}
        >
            <Select
                defaultValue={
                    props.user.role !== null ? props.user.role.name : ""
                }
                style={{
                    width: 160,
                }}
                onChange={handleChange}
            >
                {menuData.map((d) => {
                    return (
                        <Option key={d.name} value={d.name}>
                            {d.name}
                        </Option>
                    );
                })}
            </Select>
        </Modal>
    );
};

export default ManageUserRoles;
