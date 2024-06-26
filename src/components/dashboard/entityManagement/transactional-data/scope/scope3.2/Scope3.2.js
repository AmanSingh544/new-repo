import React from "react";
import { ScopeRecordsDashboard } from "src/components/dashboard/entityManagement/transactional-data/scope/scope-records-dashboard/ScopeRecordsDashboard";
import {columnsScope3entity2Records} from 'src/components/dashboard/entityManagement/entity-management-common/table/constant';
export const Scop3Entity2Dashboard = ({scope, entity}) => {
return(
    <ScopeRecordsDashboard scope={3} entity={2} dataColumns={columnsScope3entity2Records} entityName={"Capital goods"} />
)
}