import {
  SET_AUTHENTICATED_USER,
  REMOVE_AUTHENTICATED_USER,
} from "src/modules/auth/auth-action-types/index";
  
  const initialState = {
    authUser: null,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_AUTHENTICATED_USER:
        return { ...state, authUser: action.payload };
      case REMOVE_AUTHENTICATED_USER: 
          return {...state, authUser: action.payload};
      default:
          return state;
    }
  };
  