import { apiInstance } from './index.js'

const api = apiInstance()
//localhost:8080/test22 -> 를 가져오고싶다.
function test22(param, success, fail) {
  api.get(`/test22`, param).then(success).catch(fail)
}

function signup(param, success, fail) {
  api.post(`/signup`, param).then(success).catch(fail)
}

function login(param, success, fail) {
  api.post(`/signin`, JSON.stringify(param)).then(success).catch(fail)
}

function profileTest(param, success, fail) {
  api.get(`/profile/${param}`).then(success).catch(fail)
}
function profileUpdate([url,data], success, fail) {
  api.post(`/profile/${url}`,null, JSON.stringify(data)).then(success).catch(fail)
}

export { test22, signup, login, profileTest, profileUpdate }
