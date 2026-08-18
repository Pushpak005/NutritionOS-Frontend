import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  function openSidebar() {
    setSidebarOpen(true);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (

    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(180deg,#0B1120 0%,#111827 100%)",
        overflowX: "clip"
      }}
    >

      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      <div
        className="main-layout-content"
        style={{
          marginLeft: "260px",
          width: "calc(100% - 260px)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          minWidth: 0
        }}
      >

        <Navbar
          onMenuClick={openSidebar}
        />

        <main
          className="main-layout-main"
          style={{
            flex: 1,
            width: "100%",
            minWidth: 0,
            boxSizing: "border-box",
            padding: "28px"
          }}
        >

          {children}

        </main>

      </div>


      {sidebarOpen && (

        <div
          onClick={closeSidebar}
          className="mobile-sidebar-overlay"
        />

      )}


      <style>
        {`

          .mobile-sidebar-overlay {
            display: none;
          }

          @media (max-width: 767px) {

            .main-layout-content {
              margin-left: 0 !important;
              width: 100% !important;
              min-width: 0 !important;
            }

            .main-layout-main {
              width: 100% !important;
              max-width: none !important;
              min-width: 0 !important;
              padding: 10px !important;
            }

            .mobile-sidebar-overlay {
              display: block;
              position: fixed;
              inset: 0;
              background: rgba(0, 0, 0, 0.55);
              z-index: 998;
            }

          }

          @media (min-width: 768px) and (max-width: 1100px) {

            .main-layout-main {
              padding: 20px !important;
            }

          }

        `}
      </style>

    </div>

  );
}