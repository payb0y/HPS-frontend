import axios from "axios";

const baseURL = "http://localhost:8080/api/";

const Request = axios.create({
    baseURL,
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
});

export default Request;
