import { apiInstance } from "./index";


const api = apiInstance();

function teamBreakup(param, success, fail){
    api.delete(`/team/${param}`).then(success).catch(fail);
}
function searchMyteam(param, success, fail){
    api.delete(`/team/${param}`).then(success).catch(fail);
}


export {
    teamBreakup,searchMyteam
}