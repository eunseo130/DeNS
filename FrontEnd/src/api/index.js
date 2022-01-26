import axios from "axios";

const API_BASE_URL = "http://localhost:8080";
function apiInstance() {
    const instance = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            "Content-type": "application/json",
        },
    });
    return instance;
}
export { apiInstance };