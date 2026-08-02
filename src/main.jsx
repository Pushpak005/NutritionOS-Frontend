import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./styles/theme.css";
import "./styles/cards.css";
import "./styles/dashboard.css";

import "./index.css";
import { Toaster } from "react-hot-toast";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
<BrowserRouter>

    <Toaster

        toastOptions={{

            style:{

                background:"#18181B",

                color:"#fff",

                border:"1px solid #2D2D35"

            }

        }}

    />

    <App />

</BrowserRouter>
  </React.StrictMode>
);