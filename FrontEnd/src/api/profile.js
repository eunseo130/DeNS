import { apiInstance } from './index.js'

const api = apiInstance()

function profileTest(param, success, fail) {
  console.log('profile get')
  api.get(`/profile/${param}`).then(success).catch(fail)
  // api.get(`/profile/image/${param}`).then(success).catch(fail)
}
function profileUpdate([id, position, stack, git_id], success, fail) {
  api
    .put(`/profile/${id}`, { position: position, stack: stack, git_id: git_id })
    .then(success)
    .catch(fail)
}
function putKeyword([id, keyword], success, fail) {
  api
    .post(`/profile/keyword/${id}`, null, { params: { content: keyword } })
    .then(success)
    .catch(fail)
}
function ImgUpload([id, formData], success, fail) {
  console.log('check0')
  api
    .post(`/profile/update/image/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(success)
    .catch(fail)
}
export { profileTest, profileUpdate, putKeyword, ImgUpload }
