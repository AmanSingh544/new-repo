import React from "react";
import { ScopeRecordsDashboard } from "src/components/dashboard/entityManagement/transactional-data/scope/scope-records-dashboard/ScopeRecordsDashboard";
import { columnsScope3entity4Records } from 'src/components/dashboard/entityManagement/entity-management-common/table/constant';

export const Scop3Entity4Dashboard = ({ scope, entity }) => {
    return (
        <ScopeRecordsDashboard scope={3} entity={4} dataColumns={columnsScope3entity4Records} entityName={"Upstream Transportation and Distribution"} />
    )
}