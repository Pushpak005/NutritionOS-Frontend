export default function NextButton({
    onClick,
    text
}) {

    return (

        <button

            onClick={onClick}

            style={{

                marginTop: "25px",

                width: "100%",

                padding: "16px",

                borderRadius: "14px",

                border: "none",

                background: "var(--purple)",

                color: "white",

                fontWeight: "bold",

                cursor: "pointer"

            }}

        >

            {text}

        </button>

    );

}