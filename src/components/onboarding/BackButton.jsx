import { useState } from "react";

export default function BackButton({
    onClick
}) {

    const [hover, setHover] = useState(false);

    return (

        <button

            onClick={onClick}

            onMouseEnter={() => setHover(true)}

            onMouseLeave={() => setHover(false)}

            style={{

                marginTop: "20px",

                width: "100%",

                padding: "16px",

                borderRadius: "16px",

                background: hover
                    ? "rgba(255,255,255,0.08)"
                    : "transparent",

                color: "#cbd5e1",

                border: "1px solid rgba(255,255,255,0.12)",

                cursor: "pointer",

                fontSize: "15px",

                fontWeight: "600",

                transition: "all 0.25s ease",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                gap: "10px"

            }}

        >

            <span
                style={{
                    fontSize: "18px"
                }}
            >
                ←
            </span>

            <span>

                Back

            </span>

        </button>

    );

}