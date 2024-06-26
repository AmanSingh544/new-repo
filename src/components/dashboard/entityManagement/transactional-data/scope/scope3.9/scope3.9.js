//Changed file name in small
import React from "react";
import { ScopeRecordsDashboard } from "src/components/dashboard/entityManagement/transactional-data/scope/scope-records-dashboard/ScopeRecordsDashboard";
import {columnsScope3entity9Records} from 'src/components/dashboard/entityManagement/entity-management-common/table/constant';
export const Scop3Entity9Dashboard = ({scope, entity}) => {
return(
    <ScopeRecordsDashboard scope={3} entity={9} dataColumns={columnsScope3entity9Records} entityName={"Downstream Transportation and Distribution"} />
)
}