import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Url_Routes from "./url_routes";

export const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Url_Routes />
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
