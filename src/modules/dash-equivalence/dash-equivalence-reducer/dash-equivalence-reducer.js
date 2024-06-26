import { DASH_EQUIVALENCE_TYPES } from "src/modules/dash-equivalence/dash-equivalence-types/dash-equivalence-types";
const initialState = {
    potentialEmissions: []
};
const dashEquivalenceReducer = (state = initialState, action) => {

    if (action.type === DASH_EQUIVALENCE_TYPES.POTENTIAL_EMISSIONS) {
        return Object.assign({}, state, { potentialEmissions: action.potentialEmissions ?? [] });
    }
    else {
        return state
    }
}
export default dashEquivalenceReducer;