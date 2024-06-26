import React from "react";
import { ScopeRecordsDashboard } from "src/components/dashboard/entityManagement/transactional-data/scope/scope-records-dashboard/ScopeRecordsDashboard";
import {columnsScope3entity10Records} from 'src/components/dashboard/entityManagement/entity-management-common/table/constant';
export const Scop3Entity10Dashboard = ({scope, entity}) => {
return(
    <ScopeRecordsDashboard scope={3} entity={10} dataColumns={columnsScope3entity10Records} entityName="Processing of sold products" />
)
}