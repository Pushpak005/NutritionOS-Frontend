import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Recommendations from "./pages/Recommendations/Recommendations";
import MealLog from "./pages/MealLog/MealLog";
import Profile from "./pages/Profile/Profile";
import Restaurants from "./pages/Restaurants/Restaurants";
import Menu from "./pages/Menu/Menu";
import MyMeals from "./pages/MyMeals/MyMeals";

import MainLayout from "./components/layout/MainLayout";

function App() {

    return (

        <Routes>

            {/* Public Routes */}

            <Route path="/" element={<Login />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />



            {/* Protected Layout */}

            <Route
                path="/dashboard"
                element={
                    <MainLayout>
                        <Dashboard />
                    </MainLayout>
                }
            />

            <Route
                path="/recommendations"
                element={
                    <MainLayout>
                        <Recommendations />
                    </MainLayout>
                }
            />

            <Route
                path="/meal-log"
                element={
                    <MainLayout>
                        <MealLog />
                    </MainLayout>
                }
            />

            <Route
                path="/profile"
                element={
                    <MainLayout>
                        <Profile />
                    </MainLayout>
                }
            />

            <Route
                path="/restaurants"
                element={
                    <MainLayout>
                        <Restaurants />
                    </MainLayout>
                }
            />

            <Route
                path="/restaurants/:id/menu"
                element={
                    <MainLayout>
                        <Menu />
                    </MainLayout>
                }
            />

            <Route
                path="/my-meals"
                element={
                    <MainLayout>
                        <MyMeals />
                    </MainLayout>
                }
            />

        </Routes>

    );

}

export default App;