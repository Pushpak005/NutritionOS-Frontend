import { FaBell, FaUserCircle } from "react-icons/fa";
import "../../styles/navbar.css";

export default function Navbar() {

    return (

        <div className="navbar">

            <div>

                <h2>NutritionOS</h2>

            </div>

            <div className="navbar-right">

                <FaBell size={22} />

                <FaUserCircle size={30} />

            </div>

        </div>

    );

}