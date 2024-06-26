import { combineReducers } from "redux";
import { authReducer } from "src/modules/auth/auth-reducers";
import { globalReducer } from "src/modules/global-states/global-state-reducers";
import { filterReducer } from "src/modules/filters/filter-reducers";
import { equivalenceFilterReducer } from 'src/components/dashboard/equivalence/equivalence-filters/equivalence-filter-reducers'
import {detailedFilterReducer} from "src/components/dashboard/detailed-summary/detailed-filters/detailed-filters-reducers"
import dashEquivalenceReducer from 'src/modules/dash-equivalence/dash-equivalence-reducer/dash-equivalence-reducer';
import dashExecutiveReducer from 'src/modules/dash-executive/dash-executive-reducer/dash-executive-reducer';
import { languageReducer } from 'src/modules/language/language-reducer/languageReducer';
import {dmlFilterReducer} from "src/modules/dml-filters/dml-filters-reducers";
import {dmlReducer} from "src/modules/dml/dml-reducers";
import { simulatorFilterReducer } from "src/components/dashboard/Risk&Recommendation/Simulator/SimulatorFilterLayout/simulator-filters-reducers";

export const rootReducer = combineReducers({
  authentication: authReducer,
  filters: filterReducer,
  detailedFilters: detailedFilterReducer,
  eqFilters: equivalenceFilterReducer,
  globalRed: globalReducer, 
  simulatorFilters:simulatorFilterReducer,
  dashEquivalenceReducer : dashEquivalenceReducer,
  dashExecutiveReducer: dashExecutiveReducer, 
  languageReducer: languageReducer,
  dmlFilterReducer:dmlFilterReducer,
  dmlReducer:dmlReducer
});
