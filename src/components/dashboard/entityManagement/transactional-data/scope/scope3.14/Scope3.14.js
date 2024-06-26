import React from "react";
import { ScopeRecordsDashboard } from "src/components/dashboard/entityManagement/transactional-data/scope/scope-records-dashboard/ScopeRecordsDashboard";
import {columnsScope3entity14Records} from 'src/components/dashboard/entityManagement/entity-management-common/table/constant';
export const Scop3Entity14Dashboard = ({scope, entity}) => {
return(
    <ScopeRecordsDashboard scope={3} entity={14} dataColumns={columnsScope3entity14Records} entityName="Franchises" />
)
}