import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import i18nInitialise from "src/utils/locales/index";

const root = ReactDOM.createRoot(document.getElementById("carbonX"));
const onBeforeLift = async () => {
  await i18nInitialise();
}
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} onBeforeLift={onBeforeLift}>
      <App />
    </PersistGate>
  </Provider>
);
