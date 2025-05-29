import { Routes, Route } from "react-router-dom";
import EmployerDashboardPage from "./page/page";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<EmployerDashboardPage />}>
      </Route>
    </Routes>
  );
}
