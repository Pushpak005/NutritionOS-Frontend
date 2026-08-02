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
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {

    return (

        <Routes>

            {/* ---------- Public Routes ---------- */}

            <Route path="/" element={<Login />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />



            {/* ---------- Protected Routes ---------- */}

            <Route

                path="/dashboard"

                element={

                    <ProtectedRoute>

                        <MainLayout>

                            <Dashboard />

                        </MainLayout>

                    </ProtectedRoute>

                }

            />



            <Route

                path="/recommendations"

                element={

                    <ProtectedRoute>

                        <MainLayout>

                            <Recommendations />

                        </MainLayout>

                    </ProtectedRoute>

                }

            />



            <Route

                path="/meal-log"

                element={

                    <ProtectedRoute>

                        <MainLayout>

                            <MealLog />

                        </MainLayout>

                    </ProtectedRoute>

                }

            />



            <Route

                path="/profile"

                element={

                    <ProtectedRoute>

                        <MainLayout>

                            <Profile />

                        </MainLayout>

                    </ProtectedRoute>

                }

            />



            <Route

                path="/restaurants"

                element={

                    <ProtectedRoute>

                        <MainLayout>

                            <Restaurants />

                        </MainLayout>

                    </ProtectedRoute>

                }

            />



            <Route

                path="/restaurants/:id/menu"

                element={

                    <ProtectedRoute>

                        <MainLayout>

                            <Menu />

                        </MainLayout>

                    </ProtectedRoute>

                }

            />



            <Route

                path="/my-meals"

                element={

                    <ProtectedRoute>

                        <MainLayout>

                            <MyMeals />

                        </MainLayout>

                    </ProtectedRoute>

                }

            />

        </Routes>

    );

}

export default App;