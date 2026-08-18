export default function StepCard({
    title,
    subtitle,
    children
}) {

    return (

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                    "linear-gradient(135deg,#0f172a 0%,#111827 50%,#1e293b 100%)",
                padding: "40px"
            }}
        >

            <div
                style={{
                    width: "560px",
                    background: "rgba(25,25,35,0.75)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "28px",
                    padding: "50px",
                    boxShadow:
                        "0 25px 60px rgba(0,0,0,0.45)"
                }}
            >

                <div
                    style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "20px",
                        background:
                            "linear-gradient(135deg,#8b5cf6,#6366f1)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "34px",
                        marginBottom: "28px",
                        boxShadow:
                            "0 12px 30px rgba(124,58,237,0.45)"
                    }}
                >
                    🥗
                </div>

                <h1
                    style={{
                        color: "white",
                        fontSize: "36px",
                        fontWeight: "700",
                        marginBottom: "12px",
                        lineHeight: "1.2"
                    }}
                >
                    {title}
                </h1>

                <p
                    style={{
                        color: "#94a3b8",
                        fontSize: "16px",
                        lineHeight: "1.7",
                        marginBottom: "35px"
                    }}
                >
                    {subtitle}
                </p>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "18px"
                    }}
                >
                    {children}
                </div>

            </div>

        </div>

    );

}