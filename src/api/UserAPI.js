import { notification } from "antd";
import Request from "./Request";

export async function getUsers() {
    return await Request.get("/users")
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error.response.data;
        });
}
export async function getGroups() {
    return await Request.get("/groups")
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error.response.data;
        });
}
export async function getRoles() {
    return await Request.get("/roles")
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error.response.data;
        });
}
export async function addUserToGroups(username, userGroups) {
    return await Request.post("/user/addUserToGroups", {
        username: username,
        names: userGroups,
    })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error.response.data;
        });
}
export async function addRolesToUser(username, userRoles) {
    return await Request.post("/user/addRolesToUser", {
        username: username,
        names: userRoles,
    })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error.response.data;
        });
}
export async function deleteGroup(name) {
    return await Request.post("/group/delete", {
        name: name,
    })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error.response.data;
        });
}

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
