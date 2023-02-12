import { Routes, Route } from "react-router-dom";
import FirstPage from "./screens/FirstPage";
import SecondPage from "./screens/SecondPage";

const url_routes = () => {
  return (
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="/firstpage" element={<FirstPage />} />
      <Route path="/secondpage" element={<SecondPage />} />
    </Routes>
  );
};
export default url_routes;
