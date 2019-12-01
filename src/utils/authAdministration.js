
// schema: {
//  user: [user]
// }
const INITIAL_STATE_AUTH = "{}";
const AUTH_STORAGE_KEY = 'auth_info';

/* --------------------------- Methods */

export const getAuthInfo =
    () => JSON.parse( localStorage.getItem(AUTH_STORAGE_KEY) || INITIAL_STATE_AUTH );

const setAuthInfo = (authInfo) => localStorage.setItem(AUTH_STORAGE_KEY, authInfo);

export const getLoggedUser = () => getAuthInfo().user;
export const isUserLogged = () => !!getLoggedUser();
export const getNameOfLoggedUser = () => getLoggedUser().username;

const _logout = () => {
    const authInfo = getAuthInfo();
    const loggedUser = getLoggedUser();

    if (loggedUser) delete authInfo.user;

    return authInfo;
};

/* --------------------------- Types of Actions */

export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

/* --------------------------- Reducers */

const authReducer = (action) => {
    const state = getAuthInfo();

    switch (action.type)
    {
        case AUTH_LOGIN:
            const authInfo = _logout();
            authInfo.user = action.user;
            return authInfo;

        case AUTH_LOGOUT:
            return _logout();

        default:
            return state;
    }
};

export default (action) => setAuthInfo( JSON.stringify( authReducer(action) ) );

/* --------------------------- Actions */

export const login = (user) => { return {type: AUTH_LOGIN, user} };
export const logout = () => { return {type: AUTH_LOGOUT} };
