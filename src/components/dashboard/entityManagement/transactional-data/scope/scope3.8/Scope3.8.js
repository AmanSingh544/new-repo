import React from "react";
import { ScopeRecordsDashboard } from "src/components/dashboard/entityManagement/transactional-data/scope/scope-records-dashboard/ScopeRecordsDashboard";
import {columnsScope3entity8Records} from 'src/components/dashboard/entityManagement/entity-management-common/table/constant';
export const Scop3Entity8Dashboard = ({scope, entity}) => {
return(
    <ScopeRecordsDashboard scope={3} entity={8} dataColumns={columnsScope3entity8Records} entityName={"Upstream leased assets"} />
)
}