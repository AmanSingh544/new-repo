import { DASH_EXECUTIVE_TYPES } from 'src/modules/dash-executive/dash-executive-types/dash-executive-types';

export const storeGhgEmissions = (payload) => {
    return function (dispatch) {
        dispatch({
            type: DASH_EXECUTIVE_TYPES.GHG_EMISSIONS,
            ghgEmissions: payload
        })
    }
}


export const storeVisibleChartsShowHide = (payload) => {
    return function (dispatch) {
        dispatch({
            type: DASH_EXECUTIVE_TYPES.VISIBLE_CHARTS_SHOW_HIDE,
            visibleChartsThroughShowHide: payload
        })
    }
}

export const storeVisibleChartsDetailedShowHide = (payload) => {
    return function (dispatch) {
        dispatch({
            type: DASH_EXECUTIVE_TYPES.VISIBLE_CHARTS_DETAILED_SHOW_HIDE,
            visibleChartsThroughDetailedShowHide: payload
        })
    }
}

export const storeVisibleChartsDetailedSummary = (payload) => {
    return function (dispatch) {
        dispatch({
            type: DASH_EXECUTIVE_TYPES.VISIBLE_CHARTS_DETAILED_SUMMARY,
            visibleChartsThroughDetailedSummary: payload
        })
    }
}
export const storeVisibleChartsExecutiveSummary = (payload) => {
    return function (dispatch) {
        dispatch({
            type: DASH_EXECUTIVE_TYPES.VISIBLE_CHARTS_EXECUTIVE_SUMMARY,
            visibleChartsThroughExecutiveSummary: payload
        })
    }
}