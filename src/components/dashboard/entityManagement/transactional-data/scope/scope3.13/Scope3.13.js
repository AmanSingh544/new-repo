import React from "react";
import { ScopeRecordsDashboard } from "src/components/dashboard/entityManagement/transactional-data/scope/scope-records-dashboard/ScopeRecordsDashboard";
import {columnsScope3entity13Records} from 'src/components/dashboard/entityManagement/entity-management-common/table/constant';
export const Scop3Entity13Dashboard = ({scope, entity}) => {
return(
    <ScopeRecordsDashboard scope={3} entity={13} dataColumns={columnsScope3entity13Records} entityName={" Downstream Leased assets"} />
)
}