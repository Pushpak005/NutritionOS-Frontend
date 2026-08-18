export default function ProgressBar({

    step,

    total

}) {

    const progress = (step / total) * 100;

    return (

        <div
            style={{
                width: "560px",
                margin: "30px auto 10px auto"
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "18px"
                }}
            >

                <div
                    style={{
                        color: "#ffffff",
                        fontWeight: "700",
                        fontSize: "18px"
                    }}
                >
                    Step {step} of {total}
                </div>

                <div
                    style={{
                        color: "#94a3b8",
                        fontSize: "14px",
                        fontWeight: "600"
                    }}
                >
                    {Math.round(progress)}% Complete
                </div>

            </div>

            {/* Progress Track */}

            <div
                style={{

                    height: "12px",

                    background: "rgba(255,255,255,0.08)",

                    borderRadius: "999px",

                    overflow: "hidden",

                    position: "relative"

                }}
            >

                <div
                    style={{

                        width: `${progress}%`,

                        height: "100%",

                        background:
                            "linear-gradient(90deg,#8b5cf6,#6366f1)",

                        borderRadius: "999px",

                        transition: "width 0.45s ease",

                        boxShadow:
                            "0 0 20px rgba(99,102,241,0.55)"

                    }}
                />

            </div>

            {/* Step Indicators */}

            <div
                style={{

                    display: "flex",

                    justifyContent: "space-between",

                    marginTop: "18px"

                }}
            >

                {

                    Array.from({ length: total }).map((_, index) => {

                        const active = index + 1 <= step;

                        return (

                            <div

                                key={index}

                                style={{

                                    width: "18px",

                                    height: "18px",

                                    borderRadius: "50%",

                                    background: active
                                        ? "linear-gradient(135deg,#8b5cf6,#6366f1)"
                                        : "rgba(255,255,255,0.10)",

                                    border: active
                                        ? "none"
                                        : "2px solid rgba(255,255,255,0.15)",

                                    boxShadow: active
                                        ? "0 0 14px rgba(99,102,241,.45)"
                                        : "none",

                                    transition: "all .3s ease"

                                }}

                            />

                        );

                    })

                }

            </div>

        </div>

    );

}