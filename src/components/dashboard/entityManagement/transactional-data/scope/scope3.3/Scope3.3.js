import React from "react";
import { ScopeRecordsDashboard } from "src/components/dashboard/entityManagement/transactional-data/scope/scope-records-dashboard/ScopeRecordsDashboard";
import {columnsScope3entity3Records} from 'src/components/dashboard/entityManagement/entity-management-common/table/constant';
export const Scop3Entity3Dashboard = ({scope, entity}) => {
return(
    <ScopeRecordsDashboard scope={3} entity={3} dataColumns={columnsScope3entity3Records} entityName="Fuel and energy related activities" />
)
}