import { apiInstance } from "./index.js";

const api = apiInstance();

function test22(param, success, fail) {
    api.get(`/test22`,param).then(success).catch(fail);
}

export { test22 } ;