import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "@modules/sign-in";
import PrivateRouter from "./privateRouter";
import PublicRouter from "./publicRouter";
import routeNames from "../constants/routeNames";
import Equivalence from "../components/dashboard/equivalence";
import ExecutiveSummary from "../components/dashboard/executive-summary";
import DataMappingLayer from "src/modules/data-mapping-layer";
import RawData from "src/modules/data-mapping-layer/rawData";
import { Computation } from "../components/dashboard/computation";
import { ScopePage } from "../components/dashboard/computation/scope-page/scope-page";
import SingleView from "../modules/dashboard/single-view";
import { VehicleMasterDashboard } from "src/components/dashboard/entityManagement/master-data/vehicle-master/VehicleMaster";
import { LocationMasterDashboard } from "src/components/dashboard/entityManagement/master-data/vehicle-master/locationMaster";
import {Scop1Entity1Dashboard}  from 'src/components/dashboard/entityManagement/transactional-data/scope/scope1.1/Scope1.1';
import {Scop1Entity2Dashboard}  from 'src/components/dashboard/entityManagement/transactional-data/scope/scope1.2/Scope1.2';
import {Scop1Entity3Dashboard}  from 'src/components/dashboard/entityManagement/transactional-data/scope/scope1.3/Scope1.3';
import { Scop2Entity0Dashboard} from 'src/components/dashboard/entityManagement/transactional-data/scope/scope2/Scope2';
import {Scop3Entity1Dashboard}  from 'src/components/dashboard/entityManagement/transactional-data/scope/scope3.1/Scope3.1';
import {Scop3Entity2Dashboard}  from 'src/components/dashboard/entityManagement/transactional-data/scope/scope3.2/Scope3.2';
import {Scop3Entity3Dashboard} from 'src/components/dashboard/entityManagement/transactional-data/scope/scope3.3/Scope3.3';
import {Scop3Entity4Dashboard} from 'src/components/dashboard/entityManagement/transactional-data/scope/scope3.4/Scope3.4';
import {Scop3Entity5Dashboard} from 'src/components/dashboard/entityManagement/transactional-data/scope/scope3.5/Scope3.5';
import {Scop3Entity6Dashboard} from 'src/components/dashboard/entityManagement/transactional-data/scope/scope3.6/Scope3.6';
import {Scop3Entity7Dashboard} from 'src/components/dashboard/entityManagement/transactional-data/scope/scope3.7/Scope3.7';
import {Scop3Entity8Dashboard} from 'src/components/dashboard/entityManagement/transactional-data/scope/scope3.8/Scope3.8';
import {Scop3Entity9Dashboard}  from 'src/components/dashboard/entityManagement/transactional-data/scope/scope3.9/scope3.9';
import {Scop3Entity10Dashboard}  from 'src/components/dashboard/entityManagement/transactional-data/scope/scope3.10/Scope3.10';
import {Scop3Entity11Dashboard} from 'src/components/dashboard/entityManagement/transactional-data/scope/scope3.11/Scope3.11';
import {Scop3Entity12Dashboard} from 'src/components/dashboard/entityManagement/transactional-data/scope/scope3.12/Scope3.12';
import {Scop3Entity13Dashboard} from 'src/components/dashboard/entityManagement/transactional-data/scope/scope3.13/Scope3.13';
import {Scop3Entity14Dashboard} from 'src/components/dashboard/entityManagement/transactional-data/scope/scope3.14/Scope3.14';
import {Scop3Entity15Dashboard} from 'src/components/dashboard/entityManagement/transactional-data/scope/scope3.15/Scope3.15';
import ViewRule from "src/modules/data-mapping-layer/viewRule";
import { SimulatorLayout } from "src/components/dashboard/Risk&Recommendation/Simulator/SimulatorLayout";

const MainRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path={routeNames.homePage} element={<PublicRouter />}>
            <Route path={routeNames.homePage} element={<SignIn />} />
            <Route path={routeNames.notFound} element={<Navigate to={routeNames.homePage} replace />} />
          </Route>
        </Routes>
        <Routes>
          <Route path={routeNames.homePage} element={<PrivateRouter />}>
            <Route path={routeNames.executive} element={<ExecutiveSummary />} />
            <Route path={routeNames.detailed} element={<ExecutiveSummary />} />
            <Route path={routeNames.equivalence} element={<Equivalence />} />
            <Route path={routeNames.scope} element={<ScopePage />} />
            <Route path={routeNames.computation} element={<Computation />} />
            <Route path={routeNames.singleView} element={<SingleView />} />
            <Route path={routeNames.dataMappingLayer} element={<DataMappingLayer />} />
            <Route path={routeNames.simulator} element={<SimulatorLayout />} />
            <Route path={routeNames.rawData} element={<RawData />} />
            <Route path={routeNames.viewRule} element={<ViewRule />} />
            <Route
              path={routeNames.homePage}
              element={<Navigate to={routeNames.detailed} replace />}
            />
            <Route path={routeNames.notFound} 
            element={<Navigate to={routeNames.detailed} replace />} />
            <Route
              path={routeNames.vehicleMaster}
              element={<VehicleMasterDashboard />}
            />
            <Route
              path={routeNames.locationMaster}
              element={<LocationMasterDashboard />}
            />
           <Route path={routeNames.scope11} element={<Scop1Entity1Dashboard />} />
           <Route path={routeNames.scope12} element={<Scop1Entity2Dashboard />} />
           <Route path={routeNames.scope13} element={<Scop1Entity3Dashboard />} />
           <Route path={routeNames.scope2} element={<Scop2Entity0Dashboard />} />
            <Route path={routeNames.scope31} element={<Scop3Entity1Dashboard />} />
            <Route path={routeNames.scope32} element={<Scop3Entity2Dashboard />} />
             <Route path={routeNames.scope33} element={<Scop3Entity3Dashboard />} />
           <Route path={routeNames.scope34} element={<Scop3Entity4Dashboard />} />
            <Route path={routeNames.scope35} element={<Scop3Entity5Dashboard />} />
            <Route path={routeNames.scope36} element={<Scop3Entity6Dashboard />} />
            <Route path={routeNames.scope37} element={<Scop3Entity7Dashboard />} />
            <Route path={routeNames.scope38} element={<Scop3Entity8Dashboard />} /> 
            <Route path={routeNames.scope39} element={<Scop3Entity9Dashboard />} />
            <Route path={routeNames.scope310} element={<Scop3Entity10Dashboard />} />
            <Route path={routeNames.scope311} element={<Scop3Entity11Dashboard />} />
            <Route path={routeNames.scope312} element={<Scop3Entity12Dashboard />} />
            <Route path={routeNames.scope313} element={<Scop3Entity13Dashboard />} />
            <Route path={routeNames.scope314} element={<Scop3Entity14Dashboard />} />
            <Route path={routeNames.scope315} element={<Scop3Entity15Dashboard />} /> 
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default MainRouter;
