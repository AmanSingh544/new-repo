import React from "react";
import { ScopeRecordsDashboard } from "src/components/dashboard/entityManagement/transactional-data/scope/scope-records-dashboard/ScopeRecordsDashboard";
import {columnsScope3entity1Records} from 'src/components/dashboard/entityManagement/entity-management-common/table/constant';
export const Scop3Entity1Dashboard = ({scope, entity}) => {
return(
    <ScopeRecordsDashboard scope={3} entity={1} dataColumns={columnsScope3entity1Records} entityName={"Purchased Goods and Services"} />
)
}