import { useState } from "react";

export default function Button({

    children,

    onClick,

    type = "button",

    variant = "primary",

    disabled = false,

    style = {},

    ...props

}) {

    const [hover, setHover] = useState(false);

    const variants = {

        primary: {

            background:
                "linear-gradient(135deg,#8b5cf6,#6366f1)",

            color: "white",

            border: "none"

        },

        secondary: {

            background: "transparent",

            color: "#cbd5e1",

            border: "1px solid rgba(255,255,255,.15)"

        },

        success: {

            background:
                "linear-gradient(135deg,#22c55e,#16a34a)",

            color: "white",

            border: "none"

        },

        danger: {

            background:
                "linear-gradient(135deg,#ef4444,#dc2626)",

            color: "white",

            border: "none"

        }

    };

    return (

        <button

            type={type}

            onClick={onClick}

            disabled={disabled}

            onMouseEnter={() => setHover(true)}

            onMouseLeave={() => setHover(false)}

            style={{

                width: "100%",

                padding: "16px",

                borderRadius: "16px",

                fontSize: "15px",

                fontWeight: "700",

                cursor: disabled
                    ? "not-allowed"
                    : "pointer",

                transition: ".25s",

                opacity: disabled ? .6 : 1,

                transform:
                    hover && !disabled
                        ? "translateY(-2px)"
                        : "translateY(0)",

                boxShadow:
                    hover && !disabled
                        ? "0 12px 28px rgba(99,102,241,.35)"
                        : "0 4px 12px rgba(0,0,0,.18)",

                ...variants[variant],

                ...style

            }}

            {...props}

        >

            {children}

        </button>

    );

}