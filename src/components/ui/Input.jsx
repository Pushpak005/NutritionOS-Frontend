export default function Input({

    label,

    error,

    icon,

    style,

    ...props

}) {

    return (

        <div
            style={{
                width: "100%",
                marginBottom: "20px"
            }}
        >

            {

                label && (

                    <label

                        style={{

                            display: "block",

                            color: "#e5e7eb",

                            marginBottom: "8px",

                            fontWeight: "600",

                            fontSize: "14px"

                        }}

                    >

                        {label}

                    </label>

                )

            }

            <div
                style={{
                    position: "relative"
                }}
            >

                {

                    icon && (

                        <span

                            style={{

                                position: "absolute",

                                left: "16px",

                                top: "50%",

                                transform: "translateY(-50%)",

                                fontSize: "18px"

                            }}

                        >

                            {icon}

                        </span>

                    )

                }

                <input

                    {...props}

                    style={{

                        width: "100%",

                        padding: icon
                            ? "16px 16px 16px 50px"
                            : "16px",

                        background: "#111827",

                        color: "white",

                        border: error
                            ? "1px solid #ef4444"
                            : "1px solid rgba(255,255,255,.12)",

                        borderRadius: "16px",

                        outline: "none",

                        fontSize: "15px",

                        transition: ".25s",

                        boxSizing: "border-box",

                        ...style

                    }}

                />

            </div>

            {

                error && (

                    <div

                        style={{

                            color: "#ef4444",

                            marginTop: "8px",

                            fontSize: "13px"

                        }}

                    >

                        {error}

                    </div>

                )

            }

        </div>

    );

}