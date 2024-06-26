import React from "react";
import { ScopeRecordsDashboard } from "src/components/dashboard/entityManagement/transactional-data/scope/scope-records-dashboard/ScopeRecordsDashboard";
import {columnsScope3entity6Records} from 'src/components/dashboard/entityManagement/entity-management-common/table/constant';

export const Scop3Entity6Dashboard = ({scope, entity}) => {
return(
    <ScopeRecordsDashboard scope={3} entity={6} dataColumns={columnsScope3entity6Records} entityName="Business travel" />
)
}