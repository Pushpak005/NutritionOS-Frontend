import { useEffect, useState } from "react";
import { getAICoach } from "../../services/aiCoachService";
import { showInfo } from "../common/AppToast";

export default function AICoachCard() {

    const [message, setMessage] = useState("Loading AI Coach...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadAI() {

            try {

                const data = await getAICoach();

                if (data.ai_message) {

                    setMessage(data.ai_message);
                    showInfo("AI Coach Updated");

                }

                else if (data.message) {

                    setMessage(data.message);

                }

                else {

                    setMessage("No AI recommendation available today.");

                }

            }

            catch (err) {

                console.error(err);

                setMessage("Unable to connect to AI Coach.");

            }

            finally {

                setLoading(false);

            }

        }

        loadAI();

    }, []);

    return (

        <div

            style={{

                background: "#111827",

                border: "1px solid rgba(255,255,255,.08)",

                borderRadius: "24px",

                overflow: "hidden",

                color: "white",

                boxShadow: "0 12px 30px rgba(0,0,0,.20)"

            }}

        >

            <div

                style={{

                    background:
                        "linear-gradient(135deg,#8B5CF6,#6D28D9)",

                    padding: "18px 22px",

                    display: "flex",

                    alignItems: "center",

                    gap: "14px"

                }}

            >

                <div

                    style={{

                        width: 52,

                        height: 52,

                        borderRadius: "50%",

                        background: "rgba(255,255,255,.18)",

                        display: "flex",

                        justifyContent: "center",

                        alignItems: "center",

                        fontSize: "26px"

                    }}

                >

                    🤖

                </div>

                <div>

                    <h2

                        style={{

                            margin: 0,

                            fontSize: "24px"

                        }}

                    >

                        AI Nutrition Coach

                    </h2>

                    <p

                        style={{

                            margin: "4px 0 0",

                            opacity: .9,

                            fontSize: "14px"

                        }}

                    >

                        Personalized guidance for today

                    </p>

                </div>

            </div>

            <div

                style={{

                    padding: "24px"

                }}

            >

                <div

                    style={{

                        background: "#1f2937",

                        borderRadius: "18px",

                        padding: "20px",

                        lineHeight: "1.8",

                        color: "#e5e7eb",

                        border: "1px solid rgba(255,255,255,.06)"

                    }}

                >

                    {

                        loading

                            ? "⏳ Generating today's nutrition advice..."

                            : message

                    }

                </div>

                <div

                    style={{

                        display: "flex",

                        gap: "10px",

                        flexWrap: "wrap",

                        marginTop: "20px"

                    }}

                >

                    <span

                        style={{

                            background: "#14532d",

                            padding: "8px 14px",

                            borderRadius: "999px",

                            fontSize: "13px"

                        }}

                    >

                        🥗 Personalized

                    </span>

                    <span

                        style={{

                            background: "#1e3a8a",

                            padding: "8px 14px",

                            borderRadius: "999px",

                            fontSize: "13px"

                        }}

                    >

                        ⚡ AI Powered

                    </span>

                    <span

                        style={{

                            background: "#78350f",

                            padding: "8px 14px",

                            borderRadius: "999px",

                            fontSize: "13px"

                        }}

                    >

                        📈 Daily Insights

                    </span>

                </div>

            </div>

        </div>

    );

}