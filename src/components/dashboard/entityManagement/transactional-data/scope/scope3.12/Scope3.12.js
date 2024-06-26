import React from "react";
import { ScopeRecordsDashboard } from "src/components/dashboard/entityManagement/transactional-data/scope/scope-records-dashboard/ScopeRecordsDashboard";
import {columnsScope3entity12Records} from 'src/components/dashboard/entityManagement/entity-management-common/table/constant';
export const Scop3Entity12Dashboard = ({scope, entity}) => {
return(
    <ScopeRecordsDashboard scope={3} entity={12} dataColumns={columnsScope3entity12Records} entityName="End-of-life treatment of sold products" />
)
}