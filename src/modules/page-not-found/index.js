import { useState } from "react";
import PageNotFoundView from "./pageNotFound-view";

const defaultState = {
  title: "Page not found page"
};
const PageNotFound = () => {
  const [state] = useState(defaultState);

  return (
    <PageNotFoundView
      title={state.title}
    />
  );
};

export default PageNotFound;
