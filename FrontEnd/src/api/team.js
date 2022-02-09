import { apiInstance } from "./index";

const api = apiInstance();

function makeMyTeam(param, data, success, fail){
    api.post(`/team/create/${param}`, JSON.stringify(data)).then(success).catch(fail);
}
function team(success, fail) {
    api.get(`/team`).then(success).catch(fail);
}
function detail(param, success, fail) {
    api.get(`/team/showteam/${param}`).then(success).catch(fail);
    // console.log(`/team/${param}`)
}
function myteam(param, success, fail) {
    api.get(`/team/myteam/${param}`).then(success).catch(fail);
    console.log('데이터 넘어간다', param)
}

function teamBreakup(param, success, fail){
    api.delete(`/team/${param}`).then(success).catch(fail);
}
function searchMyteam(param, success, fail){
    api.delete(`/team/${param}`).then(success).catch(fail);
}

export {
    teamBreakup,searchMyteam, makeMyTeam, team, myteam, detail
}