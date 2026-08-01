import { useNavigate } from "react-router-dom";

export default function QuickActionCard({

    title,

    route,

    emoji

}) {

    const navigate = useNavigate();

    return (

        <button

            onClick={() => navigate(route)}

            style={{

                width: "100%",

                padding: "18px",

                marginBottom: "15px",

                borderRadius: "12px",

                border: "none",

                background: "#7c3aed",

                color: "white",

                cursor: "pointer",

                fontSize: "18px"

            }}

        >

            {emoji} {title}

        </button>

    );

}