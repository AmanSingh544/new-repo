import { DASH_EQUIVALENCE_TYPES } from 'src/modules/dash-equivalence/dash-equivalence-types/dash-equivalence-types';

export const storePotentialEmissions = (payload) => {
    return function (dispatch) {
        dispatch({
            type: DASH_EQUIVALENCE_TYPES.POTENTIAL_EMISSIONS,
            potentialEmissions: payload
        })
    }
}
