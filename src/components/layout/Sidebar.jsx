import {
    FaHome,
    FaUtensils,
    FaClipboardList,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

import "../../styles/sidebar.css";

export default function Sidebar() {

    return (

        <div className="sidebar">

            <h2 className="logo">

                🍏 NutritionOS

            </h2>

            <nav>

                <NavLink to="/dashboard">

                    <FaHome />

                    Dashboard

                </NavLink>

                <NavLink to="/restaurants">

                    <FaUtensils />

                    Restaurants

                </NavLink>

                <NavLink to="/my-meals">

                    <FaClipboardList />

                    My Meals

                </NavLink>

                <NavLink to="/profile">

                    <FaUser />

                    Profile

                </NavLink>

                <NavLink to="/login">

                    <FaSignOutAlt />

                    Logout

                </NavLink>

            </nav>

        </div>

    );

}