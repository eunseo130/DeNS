import axios from "axios";
import { apiInstance } from "./index";



const api = apiInstance();
// 팀 만들기
function makeMyTeam(param, data, success, fail){
    api.post(`/team/create/${param}`, JSON.stringify(data)).then(success).catch(fail);
}
// 전체 팀 정보 가져오기
function team(success, fail) {
    api.get(`/team`).then(success).catch(fail);
}
// 내 팀 정보 가져오기
function myteam(param, success, fail) {
    api.get(`/team/myteam/${param}`).then(success).catch(fail);
}
// 팀 소개 가져오기
function detail(param, success, fail) {
    api.get(`/team/showteam/${param}`).then(success).catch(fail);
}
// 팀 소개 가져오기
function bringTeamMembers(param, success, fail) {
    api.get(`/teammember/${param}`).then(success).catch(fail);
}
// Feed 불러오기(team id값)
function teamFeed(param,success, fail) {
    api.get(`/teamfeed/ourteamfeed/${param}`).then(success).catch(fail);
}
// Feed 작성
function makeTeamFeed(team_id, profile_id, [content, imgfiles, generalfiles], success, fail) {
    api.post(`teamfeed/${team_id}/${profile_id}`,
      { content : content, imgfiles: null, generalfiles: null})
    .then(success)
    .catch(fail);
    console.log(team_id, profile_id, [content, imgfiles, generalfiles], success, fail)
}

function teamBreakup(param, success, fail){
    api.delete(`/team/${param}`).then(success).catch(fail);
}
function searchMyteam(param, success, fail){
    api.delete(`/team/${param}`).then(success).catch(fail);
}

export {
    teamBreakup,searchMyteam, makeMyTeam, team, myteam, detail, teamFeed, makeTeamFeed, bringTeamMembers
}