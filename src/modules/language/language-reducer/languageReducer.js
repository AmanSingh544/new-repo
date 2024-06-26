import { languageTypes } from "src/modules/language/language-types/languageTypes";
const initialState = {
    language: "en",
};
export const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case languageTypes.CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.language
            }
        default:
            return state;
    }
};