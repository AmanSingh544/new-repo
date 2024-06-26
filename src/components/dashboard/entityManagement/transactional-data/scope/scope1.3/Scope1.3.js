import React from "react";
import { ScopeRecordsDashboard } from "src/components/dashboard/entityManagement/transactional-data/scope/scope-records-dashboard/ScopeRecordsDashboard";
import {columnsScope1Records} from 'src/components/dashboard/entityManagement/entity-management-common/table/constant';

export const Scop1Entity3Dashboard = ({scope, entity}) => {
return(
    <ScopeRecordsDashboard scope={1} entity={3} dataColumns={columnsScope1Records} entityName={"Mobile Combustion"} />
)
}