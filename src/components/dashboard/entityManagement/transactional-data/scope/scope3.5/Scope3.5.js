import React from "react";
import { ScopeRecordsDashboard } from "src/components/dashboard/entityManagement/transactional-data/scope/scope-records-dashboard/ScopeRecordsDashboard";
import {columnsScope3entity5Records} from 'src/components/dashboard/entityManagement/entity-management-common/table/constant';

export const Scop3Entity5Dashboard = ({scope, entity}) => {
return(
    <ScopeRecordsDashboard scope={3} entity={5} dataColumns={columnsScope3entity5Records} entityName={" Waste generated in operations"} />
)
}