import { DASH_EXECUTIVE_TYPES } from "src/modules/dash-executive/dash-executive-types/dash-executive-types";
const initialState = {
    ghgEmissions: [],
    visibleChartsThroughShowHide: [],
    visibleChartsThroughDetailedShowHide: [],
    VISIBLE_CHARTS_DETAILED_SHOW_HIDE: "VISIBLE_CHARTS_DETAILED_SHOW_HIDE",
    VISIBLE_CHARTS_DETAILED_SUMMARY: "VISIBLE_CHARTS_DETAILED_SUMMARY",
    VISIBLE_CHARTS_EXECUTIVE_SUMMARY : "VISIBLE_CHARTS_EXECUTIVE_SUMMARY"

};
const dashExecutiveReducer = (state = initialState, action) => {
    switch (action.type) {
        case DASH_EXECUTIVE_TYPES.GHG_EMISSIONS:
            return Object.assign({}, state, { ghgEmissions: action.ghgEmissions ?? [] });
        case DASH_EXECUTIVE_TYPES.VISIBLE_CHARTS_SHOW_HIDE:
            return Object.assign({}, state, { visibleChartsThroughShowHide: action.visibleChartsThroughShowHide ?? [] });
        case DASH_EXECUTIVE_TYPES.VISIBLE_CHARTS_DETAILED_SHOW_HIDE:
            return Object.assign({}, state, { visibleChartsThroughDetailedShowHide: action.visibleChartsThroughDetailedShowHide ?? [] });
        case DASH_EXECUTIVE_TYPES.VISIBLE_CHARTS_DETAILED_SUMMARY:
            return Object.assign({}, state, { visibleChartsThroughDetailedSummary: action.visibleChartsThroughDetailedSummary ?? [] });
        case DASH_EXECUTIVE_TYPES.VISIBLE_CHARTS_EXECUTIVE_SUMMARY:
            return Object.assign({}, state, { visibleChartsThroughExecutiveSummary: action.visibleChartsThroughExecutiveSummary ?? [] });

        default:
            return state
    }
}
export default dashExecutiveReducer;