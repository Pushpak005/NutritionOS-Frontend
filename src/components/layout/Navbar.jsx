import {
  FaBell,
  FaSearch,
  FaFire,
  FaUserCircle,
  FaBars
} from "react-icons/fa";

export default function Navbar({ onMenuClick }) {

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "short"
    }
  );

  return (

    <header
      style={{
        minHeight: "85px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 35px",
        borderBottom: "1px solid rgba(255,255,255,.08)",
        background: "rgba(15,23,42,.75)",
        backdropFilter: "blur(18px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxSizing: "border-box"
      }}
    >

      {/* Mobile Menu Button */}

      <button
        onClick={onMenuClick}
        className="mobile-menu-button"
        style={{
          display: "none",
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "22px",
          cursor: "pointer",
          padding: "8px"
        }}
      >
        <FaBars />
      </button>


      {/* Title */}

      <div>

        <h2
          style={{
            margin: 0,
            color: "white",
            fontWeight: "700"
          }}
        >
          Dashboard
        </h2>

        <p
          style={{
            color: "#94a3b8",
            marginTop: "5px",
            marginBottom: 0,
            fontSize: "14px"
          }}
        >
          {today}
        </p>

      </div>


      {/* Right Side */}

      <div
        className="navbar-right"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px"
        }}
      >

        {/* Search */}

        <div
          className="navbar-search"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "#111827",
            padding: "12px 18px",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,.08)",
            width: "280px",
            boxSizing: "border-box"
          }}
        >

          <FaSearch color="#94a3b8" />

          <input
            placeholder="Search meals, restaurants..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              width: "100%",
              minWidth: 0,
              fontSize: "14px"
            }}
          />

        </div>


        {/* Streak */}

        <div
          className="navbar-streak"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#111827",
            padding: "10px 16px",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,.08)"
          }}
        >

          <FaFire color="#f97316" />

          <span
            style={{
              color: "white",
              fontWeight: "700",
              whiteSpace: "nowrap"
            }}
          >
            11 Day Streak
          </span>

        </div>


        {/* Notifications */}

        <div
          style={{
            width: "48px",
            height: "48px",
            flexShrink: 0,
            borderRadius: "14px",
            background: "#111827",
            border: "1px solid rgba(255,255,255,.08)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >

          <FaBell
            color="white"
            size={18}
          />

        </div>


        {/* User */}

        <div
          className="navbar-user"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "#111827",
            padding: "10px 14px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,.08)"
          }}
        >

          <FaUserCircle
            size={36}
            color="#8B5CF6"
          />

          <div>

            <div
              style={{
                color: "white",
                fontWeight: "700"
              }}
            >
              Welcome
            </div>

            <div
              style={{
                color: "#94a3b8",
                fontSize: "12px"
              }}
            >
              NutritionOS User
            </div>

          </div>

        </div>

      </div>


      {/* Responsive CSS */}

      <style>
        {`

          @media (max-width: 767px) {

            header {
              min-height: 70px !important;
              height: auto !important;
              padding: 10px 14px !important;
              gap: 10px;
            }

            .mobile-menu-button {
              display: flex !important;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            }

            .navbar-right {
              gap: 8px !important;
            }

            .navbar-search {
              display: none !important;
            }

            .navbar-streak {
              display: none !important;
            }

            .navbar-user {
              display: none !important;
            }

          }

        `}
      </style>

    </header>

  );
}