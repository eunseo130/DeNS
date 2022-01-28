<<<<<<< HEAD
import { apiInstance } from './index.js';

const api = apiInstance();
//localhost:8080/test22 -> 를 가져오고싶다.
function test22(param, success, fail) {
    api.get(`/test22`,param).then(success).catch(fail);
}

function signup(param, success, fail) {
    api.post(`/signup`,param).then(success).catch(fail);
}

function login(param, success, fail) {
    api.post(`/signin`,JSON.stringify(param)).then(success).catch(fail);
}

function dummytest(param, success, fail) {
    console.log("check keyword" + param);
    api.get(`/search/keyword/${param}`).then(success).catch(fail);
}
function dummytest2(param, success, fail) {
    api.get(`/search/user`, { params: {keyword: param}}).then(success).catch(fail);
}
function dummytest3(param, success, fail) {
    console.log("check team" + param);
    api.get(`/search/team`, { params: { keyword: param } }).then(success).catch(fail);
}


export { test22, signup,login,dummytest,dummytest2,dummytest3 };
=======
import { apiInstance } from "./index.js";

const api = apiInstance();

function team(param, success, fail) {
    api.get(`/team`,param).then(success).catch(fail);
}

export { team } ;
>>>>>>> 6b5ef2687990ae68e923ea43d76c20d6878c9b95
