import React from "react";
import { ScopeRecordsDashboard } from "src/components/dashboard/entityManagement/transactional-data/scope/scope-records-dashboard/ScopeRecordsDashboard";
import {columnsScope3entity15Records} from 'src/components/dashboard/entityManagement/entity-management-common/table/constant';
export const Scop3Entity15Dashboard = ({scope, entity}) => {
return(
    <ScopeRecordsDashboard scope={3} entity={15} dataColumns={columnsScope3entity15Records} entityName="Investments"/>
)
}