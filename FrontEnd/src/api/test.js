import { apiInstance } from "./index.js";

const api = apiInstance();

function team(param, success, fail) {
    api.get(`/team`,param).then(success).catch(fail);
}

export { team } ;