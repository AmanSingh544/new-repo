import React from "react";
import { ScopeRecordsDashboard } from "src/components/dashboard/entityManagement/transactional-data/scope/scope-records-dashboard/ScopeRecordsDashboard";
import {columnsScope2Records} from 'src/components/dashboard/entityManagement/entity-management-common/table/constant';
export const Scop2Entity0Dashboard = ({scope, entity}) => {
return(
    <ScopeRecordsDashboard scope={2} entity={0} dataColumns={columnsScope2Records} entityName={"Purchased Electricity"} />
)
}