import { Button, Dropdown, Menu } from "antd";
import "antd/dist/antd.min.css";
import { useEffect, useState, useContext } from "react";
import { getUserEnvironments } from "../../../../api/UserAPI";
import AuthContext from "../../../../store/auth-context";

const UserEnvironments = () => {
    const authCtx = useContext(AuthContext);
    const [menuData, setMenuData] = useState([]);
    const [activeEnv, setactiveEnv] = useState();
    useEffect(() => {
        getEnv();
    }, []);
    const getEnv = async () => {
        const response = await getUserEnvironments(authCtx.username);
        if (response.status === 200) {
            const data = await response.data.map((d) => {
                return { key: d.name, label: d.name };
            });
            setMenuData(data);
        }
    };
    const clickHandler = (item) => {
        setactiveEnv(item.key);
    };
    const menu = <Menu onClick={clickHandler} items={menuData} />;
    return (
        <>
            <Dropdown overlay={menu} placement="bottom" arrow>
                <Button>My environments</Button>
            </Dropdown>
            {activeEnv}
        </>
    );
};

export default UserEnvironments;
