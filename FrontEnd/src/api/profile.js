import { apiInstance } from './index.js'

const api = apiInstance()

function profileTest(param, success, fail) {
  console.log('profile get')
  api.get(`/profile/${param}`).then(success).catch(fail)
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
  console.log(id, keyword)
  api
    .post(`/profile/keyword/${id}`, null, { params: { content: keyword } })
    .then(success)
    .catch(fail)
}

export { profileTest, profileUpdate, putKeyword }
