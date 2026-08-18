import {
  FaHome,
  FaUtensils,
  FaClipboardList,
  FaUser,
  FaRobot,
  FaSignOutAlt,
  FaTimes
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import "../../styles/sidebar.css";

export default function Sidebar({ isOpen, onClose }) {

  const navigate = useNavigate();

  function logout() {

    localStorage.removeItem("access_token");

    navigate("/login");

    if (onClose) {
      onClose();
    }

  }

  const menuStyle = ({ isActive }) => ({

    display: "flex",

    alignItems: "center",

    gap: "14px",

    padding: "15px 18px",

    marginBottom: "10px",

    borderRadius: "14px",

    textDecoration: "none",

    fontWeight: "600",

    color: isActive ? "#ffffff" : "#cbd5e1",

    background: isActive
      ? "linear-gradient(135deg,#8B5CF6,#6D28D9)"
      : "transparent",

    transition: ".25s"

  });

  function handleNavigation() {

    if (onClose) {
      onClose();
    }

  }

  return (

    <aside

      className={`nutrition-sidebar ${
        isOpen ? "mobile-sidebar-open" : ""
      }`}

      style={{

        position: "fixed",

        left: 0,

        top: 0,

        width: "260px",

        height: "100vh",

        background: "#0f172a",

        borderRight: "1px solid rgba(255,255,255,.08)",

        display: "flex",

        flexDirection: "column",

        justifyContent: "space-between",

        padding: "28px",

        boxSizing: "border-box",

        zIndex: 999,

        overflowY: "auto"

      }}

    >

      {/* Mobile Close Button */}

      <button

        onClick={onClose}

        className="mobile-sidebar-close"

        style={{

          display: "none",

          position: "absolute",

          top: "16px",

          right: "16px",

          background: "transparent",

          border: "none",

          color: "white",

          fontSize: "20px",

          cursor: "pointer"

        }}

      >

        <FaTimes />

      </button>


      <div>

        <div

          style={{

            textAlign: "center",

            marginBottom: "40px"

          }}

        >

          <div

            style={{

              width: 70,

              height: 70,

              margin: "0 auto",

              borderRadius: "20px",

              background:
                "linear-gradient(135deg,#8B5CF6,#6D28D9)",

              display: "flex",

              justifyContent: "center",

              alignItems: "center",

              fontSize: "34px"

            }}

          >

            🥗

          </div>


          <h2

            style={{

              color: "white",

              marginTop: "16px"

            }}

          >

            NutritionOS

          </h2>


          <p

            style={{

              color: "#94a3b8",

              fontSize: "13px"

            }}

          >

            AI Nutrition Platform

          </p>

        </div>


        <nav>

          <NavLink
            to="/dashboard"
            style={menuStyle}
            onClick={handleNavigation}
          >

            <FaHome />

            Dashboard

          </NavLink>


          <NavLink
            to="/restaurants"
            style={menuStyle}
            onClick={handleNavigation}
          >

            <FaUtensils />

            Restaurants

          </NavLink>


          <NavLink
            to="/recommendations"
            style={menuStyle}
            onClick={handleNavigation}
          >

            <FaRobot />

            AI Picks

          </NavLink>


          <NavLink
            to="/my-meals"
            style={menuStyle}
            onClick={handleNavigation}
          >

            <FaClipboardList />

            My Meals

          </NavLink>


          <NavLink
            to="/profile"
            style={menuStyle}
            onClick={handleNavigation}
          >

            <FaUser />

            Profile

          </NavLink>

        </nav>

      </div>


      <div>

        <div

          style={{

            background: "#111827",

            borderRadius: "16px",

            padding: "16px",

            marginBottom: "20px",

            textAlign: "center",

            color: "white",

            border: "1px solid rgba(255,255,255,.08)"

          }}

        >

          <div

            style={{

              width: "54px",

              height: "54px",

              borderRadius: "50%",

              background: "#8B5CF6",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              margin: "0 auto 10px",

              fontSize: "22px"

            }}

          >

            👤

          </div>


          <strong>User</strong>


          <div

            style={{

              fontSize: "12px",

              color: "#94a3b8",

              marginTop: "5px"

            }}

          >

            NutritionOS Member

          </div>

        </div>


        <button

          onClick={logout}

          style={{

            width: "100%",

            border: "none",

            padding: "15px",

            borderRadius: "14px",

            cursor: "pointer",

            background: "#dc2626",

            color: "white",

            fontWeight: "700",

            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            gap: "10px"

          }}

        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>


      <style>

        {`

          @media (max-width: 767px) {

            .nutrition-sidebar {

              transform: translateX(-100%);

              transition: transform 0.25s ease;

              box-shadow: 10px 0 30px rgba(0,0,0,0.35);

            }

            .nutrition-sidebar.mobile-sidebar-open {

              transform: translateX(0);

            }

            .mobile-sidebar-close {

              display: block !important;

            }

          }

        `}

      </style>

    </aside>

  );

}