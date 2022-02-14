//action
const REGISTER_USER = 'REGISTER_USER';
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const AUTH_USER = 'AUTH_USER';


//action creater
export const loginUser = (data) => ({ type:LOGIN_USER, token:data, auth:true});

export const logoutUser = () => ({ type: LOGOUT_USER });

export const authUser = () => ({ type: AUTH_USER });

//store
const initState = {
    token: '',
    auth: false
}

//reducer
const user = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return {
            token: action.token,
            auth : true
            };        
        case "LOGOUT_USER":
            console.log("logout");
            return {
                token: '',
                auth: false
            };
        case "AUTH_USER":
            return state.auth;
        default:
            console.log("default");
        return state
    }
}
export { user };