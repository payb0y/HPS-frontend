import { notification } from "antd";

export const getGroupsOrRoles = (props, authCtx, setUsergroups) => {
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
};
export const userLogin = async (value, authCtx) => {
    fetch("http://localhost:8080/login", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: `username=${value.username}&password=${value.password}`,
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                notification.error({
                    message: "Login failed",
                    placement: "top",
                    duration: 1,
                });
            }
        })
        .then((data) => {
            if (data) {
                authCtx.login(data.access_token);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

export const fetchUsers = async (authCtx, setDataSource, setLoading) => {
    setLoading(true);
    await fetch("http://localhost:8080/api/users", {
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
};

export const addGroupOrRoleToUser = async (props, authCtx, userGroups) => {
    await fetch(props.postUrl, {
        method: "POST",
        headers: new Headers({
            Authorization: "Bearer " + authCtx.token,
            "Content-Type": "application/json",
        }),
        body: JSON.stringify({
            username: props.username,
            names: userGroups,
        }),
    }).then((response) => responseCheck(response));
};
const responseCheck = (response) => {
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
};
