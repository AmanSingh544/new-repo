import React from "react";
import { ScopeRecordsDashboard } from "src/components/dashboard/entityManagement/transactional-data/scope/scope-records-dashboard/ScopeRecordsDashboard";
import {columnsScope3entity7Records} from 'src/components/dashboard/entityManagement/entity-management-common/table/constant';

export const Scop3Entity7Dashboard = ({scope, entity}) => {
return(
    <ScopeRecordsDashboard scope={3} entity={7} dataColumns={columnsScope3entity7Records} entityName={"Employee commuting"} />
)
}