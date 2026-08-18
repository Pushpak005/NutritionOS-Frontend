import { useState } from "react";

export default function NextButton({
    onClick,
    text
}) {

    const [hover, setHover] = useState(false);

    return (

        <button

            onClick={onClick}

            onMouseEnter={() => setHover(true)}

            onMouseLeave={() => setHover(false)}

            style={{

                marginTop: "30px",

                width: "100%",

                padding: "18px",

                borderRadius: "16px",

                border: "none",

                background:
                    "linear-gradient(135deg,#8b5cf6,#6366f1)",

                color: "white",

                fontWeight: "700",

                fontSize: "16px",

                cursor: "pointer",

                transition: "all 0.25s ease",

                transform: hover
                    ? "translateY(-3px)"
                    : "translateY(0px)",

                boxShadow: hover
                    ? "0 15px 35px rgba(99,102,241,0.45)"
                    : "0 8px 18px rgba(99,102,241,0.25)",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                gap: "10px"

            }}

        >

            <span>{text}</span>

            <span
                style={{
                    fontSize: "18px"
                }}
            >
                →
            </span>

        </button>

    );

}
