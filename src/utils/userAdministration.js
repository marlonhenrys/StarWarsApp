
// schema: {
//  [username]: [user],
//  [username]: [user],
//  ...
// }
const INITIAL_STATE_USERS = "{}";
const USERS_STORAGE_KEY = 'users';

/* --------------------------- Methods */

export const getUsers =
    () => JSON.parse( localStorage.getItem(USERS_STORAGE_KEY) || INITIAL_STATE_USERS );

const setUsers = (users) => localStorage.setItem(USERS_STORAGE_KEY, users);

/* --------------------------- Types of Actions */

export const ADD_USER = "ADD_USER";
// export const CHANGE_USER = "CHANGE_USER";
// export const DELETE_USER = "DELETE_USER";
export const CHECK_USER = "CHECK_USER";

/* --------------------------- Reducers */

const userReducer = (action) => {
    const state = getUsers();

    switch (action.type)
    {
        case ADD_USER:
            delete action.user['password-confirm'];
            return {...state, [action.user.username]: action.user};

        /*case CHANGE_USER:
            delete action.user['password-confirm'];
            return {...state, [action.user.username]: action.user};

        case DELETE_USER:
            const newState = {...state};
            delete newState[action.user.username];
            return newState;*/

        case CHECK_USER:
            // Adds the property exists to the user
            action.user.exists = state[action.user.username];
            return state;

        default:
            return state;
    }
};

export default (action) => setUsers( JSON.stringify( userReducer(action) ) );

/* --------------------------- Actions */

export const addUser = (user) => { return {type: ADD_USER, user} };
// export const changeUser = (user) => { return {type: CHANGE_USER, user} };
// export const deleteUser = (user) => { return {type: DELETE_USER, user} };
export const checkUser = (user) => { return {type: CHECK_USER, user} };
