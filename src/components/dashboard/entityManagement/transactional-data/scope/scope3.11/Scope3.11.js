import React from "react";
import { ScopeRecordsDashboard } from "src/components/dashboard/entityManagement/transactional-data/scope/scope-records-dashboard/ScopeRecordsDashboard";
import {columnsScope3entity11Records} from 'src/components/dashboard/entityManagement/entity-management-common/table/constant';

export const Scop3Entity11Dashboard = ({scope, entity}) => {
return(
    <ScopeRecordsDashboard scope={3} entity={11} dataColumns={columnsScope3entity11Records} entityName="Use of sold products" />
)
}