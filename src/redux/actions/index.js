import { authActions } from "src/modules/auth/auth-actions/index";
import { filterActions } from "src/modules/filters/filter-actions/index";
import { globalActions } from "src/modules/global-states/global-states-actions/index";
import { equivalenceFilterActions } from 'src/components/dashboard/equivalence/equivalence-filters/equivalence-filter-actions';
import { detailedFilterActions } from "src/components/dashboard/detailed-summary/detailed-filters/detailed-filter-actions";


export const actions = {
  authActions,
  filterActions,
  globalActions,
  equivalenceFilterActions,
  detailedFilterActions
};
