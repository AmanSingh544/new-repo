import { SET_AUTHENTICATED_USER, REMOVE_AUTHENTICATED_USER } from "src/modules/auth/auth-action-types/index";

const setAuthenticatedUser = (user) => {
    return {
        type: SET_AUTHENTICATED_USER,
        payload: user
    }
}

const removeAuthenticatedUser = () => {
    return {
        type: REMOVE_AUTHENTICATED_USER,
        payload: null
    }
}

export const authActions = {
    setAuthenticatedUser,
    removeAuthenticatedUser
}