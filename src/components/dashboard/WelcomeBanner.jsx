import { motion } from "framer-motion";

export default function WelcomeBanner({

    name,

    goal

}) {

    const hour = new Date().getHours();

    let greeting = "Hello";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 17) greeting = "Good Afternoon";
    else greeting = "Good Evening";

    const today = new Date().toLocaleDateString("en-IN", {

        weekday: "long",

        day: "numeric",

        month: "long"

    });

    return (

        <motion.div

            initial={{ opacity: 0, y: -20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: .45 }}

            style={{

                background:
                    "linear-gradient(135deg,#7C3AED,#5B21B6)",

                borderRadius: "24px",

                padding: "28px 34px",

                color: "white",

                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",

                marginBottom: "28px",

                boxShadow:
                    "0 18px 45px rgba(91,33,182,.28)",

                position: "relative",

                overflow: "hidden"

            }}

        >

            {/* Decorative Circles */}

            <div

                style={{

                    position: "absolute",

                    right: "-80px",

                    top: "-80px",

                    width: "240px",

                    height: "240px",

                    borderRadius: "50%",

                    background:
                        "rgba(255,255,255,.06)"

                }}

            />

            <div

                style={{

                    position: "absolute",

                    right: "120px",

                    bottom: "-120px",

                    width: "220px",

                    height: "220px",

                    borderRadius: "50%",

                    background:
                        "rgba(255,255,255,.04)"

                }}

            />

            {/* Left */}

            <div

                style={{

                    zIndex: 2

                }}

            >

                <div

                    style={{

                        color: "rgba(255,255,255,.75)",

                        fontSize: "14px",

                        marginBottom: "10px",

                        letterSpacing: ".4px"

                    }}

                >

                    {today}

                </div>

                <h1

                    style={{

                        margin: 0,

                        fontSize: "34px",

                        fontWeight: "800",

                        lineHeight: "1.2"

                    }}

                >

                    {greeting},

                    <br />

                    {name} 👋

                </h1>

                <div

                    style={{

                        display: "inline-flex",

                        alignItems: "center",

                        gap: "8px",

                        marginTop: "18px",

                        background:
                            "rgba(255,255,255,.12)",

                        border:
                            "1px solid rgba(255,255,255,.15)",

                        padding: "10px 18px",

                        borderRadius: "999px",

                        fontSize: "15px",

                        fontWeight: "600"

                    }}

                >

                    🎯 Goal

                    <strong>

                        {goal}

                    </strong>

                </div>

            </div>

            {/* Right */}

            <div

                style={{

                    zIndex: 2,

                    textAlign: "center"

                }}

            >

                <div

                    style={{

                        width: "90px",

                        height: "90px",

                        borderRadius: "24px",

                        background:
                            "rgba(255,255,255,.15)",

                        backdropFilter: "blur(18px)",

                        display: "flex",

                        justifyContent: "center",

                        alignItems: "center",

                        fontSize: "42px",

                        margin: "0 auto"

                    }}

                >

                    🥗

                </div>

                <div

                    style={{

                        marginTop: "12px",

                        fontSize: "14px",

                        color: "rgba(255,255,255,.82)",

                        fontWeight: "600"

                    }}

                >

                    NutritionOS AI

                </div>

            </div>

        </motion.div>

    );

}