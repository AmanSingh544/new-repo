import { useState } from "react";
import DashboardView from "src/layouts/dashboard/layout-dashboard-view";

const defaultState = {
  open: true
};

const Dashboard = ({ listItems = [], children = <></> }) => {
  const [state, setState] = useState(defaultState);

  const toggleDrawer = () => {
    setState((prevState) => ({
      ...prevState,
      open: !prevState.open
    }));
  };

  return (
    <DashboardView
      open={state.open}
      children={children}
      toggleDrawer={toggleDrawer}
      listItems={listItems}
    />
  );
};

export default Dashboard;
