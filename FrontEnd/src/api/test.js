import axios from 'axios';
import { store } from '../index.js'
import { apiInstance } from './index.js'

const api = apiInstance();
//localhost:8080/test22 -> 를 가져오고싶다.
function test22(param, success, fail) {
  api.get(`/test22`, param).then(success).catch(fail)
}

function signup(param, success, fail) {
  api.post(`/signup`, param).then(success).catch(fail);
}

function signin(param, success, fail) {
  api.post(`/signin`, JSON.stringify(param)).then(success).catch(fail)
  // axios.defaults.headers.common['Authorization'] = `Bearer ${store.getState().user.token}`;
}

function profileTest(param, success, fail) {
  console.log('profile get')
  api.get(`/profile/${param}`).then(success).catch(fail)
}
function verify(param, success, fail) {
  console.log("verify test 2222");
  console.log(param);
  api.post(`/verify`,JSON.stringify(param)).then(success).catch(fail);
}
function verify22(param, success, fail) {
  console.log("verify test 2222");
  console.log(param);
  api.get(`/verify/${param}`).then(success).catch(fail);
}


function profileUpdate([id, position, stack], success, fail) {
  console.log('profile update')
  console.log(position)
  console.log(stack)
  api
    .put(`/profile/${id}`, { position: position, stack: stack })
    .then(success)
    .catch(fail)
}
function putKeyword([id, keyword], success, fail) {
  api.post(`/profile/keyword/${id}`, keyword).then(success).catch(fail)
}
function dummytest(param, success, fail) {
  console.log('check keyword' + param)
  api.get(`/search/keyword/${param}`).then(success).catch(fail)
}
function dummytest2(param, success, fail) {
  api
    .get(`/search/user`, { params: { keyword: param } })
    .then(success)
    .catch(fail)
}
function dummytest3(param, success, fail) {
  console.log('check team' + param)
  api
    .get(`/search/team`, { params: { keyword: param } })
    .then(success)
    .catch(fail)
}
function getMember(param, success, fail) {
  api
    .get(`/teammember/1`)
    .then(success)
    .catch(fail)
}
function test11(param,auth ,success, fail) {
  console.log("checkckkkkkkkkkkkkkkk");
  console.log(store.getState().user.token);

  api.get(`/test11`).then(success).catch(fail);
}


export {
  getMember,
  test11,
  test22,
  signup,
  signin,
  dummytest,
  dummytest2,
  dummytest3,
  profileTest,
  profileUpdate,
  putKeyword,
  verify,
  verify22
}
