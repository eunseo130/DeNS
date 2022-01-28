import axios from "axios";

<<<<<<< HEAD
import { API_BASE_URL } from "../config";

=======
const API_BASE_URL = "http://localhost:8080";
>>>>>>> 6b5ef2687990ae68e923ea43d76c20d6878c9b95
function apiInstance() {
    const instance = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            "Content-type": "application/json",
<<<<<<< HEAD
            "Access-Control-Allow-Origin":"*",
        }
=======
        },
>>>>>>> 6b5ef2687990ae68e923ea43d76c20d6878c9b95
    });
    return instance;
}
export { apiInstance };