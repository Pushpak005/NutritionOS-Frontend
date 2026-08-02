export default function BackButton({
    onClick
}) {

    return (

        <button

            onClick={onClick}

            style={{

                marginTop: "20px",

                background: "transparent",

                color: "white",

                border: "1px solid var(--border)",

                padding: "12px 18px",

                borderRadius: "12px",

                cursor: "pointer"

            }}

        >

            ← Back

        </button>

    );

}