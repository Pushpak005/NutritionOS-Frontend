import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Recommendations from "./pages/Recommendations/Recommendations";
import MealLog from "./pages/MealLog/MealLog";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="/meal-log" element={<MealLog />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;