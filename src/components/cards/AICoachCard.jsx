import { useEffect, useState } from "react";
import { getAICoach } from "../../services/aiCoachService";
import { showInfo } from "../common/AppToast";

export default function AICoachCard() {

    const [message, setMessage] = useState("Loading AI Coach...");

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

                    setMessage("No AI recommendation available.");

                }

            }

            catch (err) {

                console.error(err);

                setMessage("Unable to load AI Coach.");

            }

        }

        loadAI();

    }, []);

    return (

        <div
            style={{
                background: "#1d1d1d",
                borderRadius: "20px",
                padding: "25px",
                color: "white",
                boxShadow: "0 0 15px rgba(0,0,0,0.3)"
            }}
        >

            <h2>🤖 AI Coach</h2>

            <hr style={{ borderColor: "#333" }} />

            <p
                style={{
                    lineHeight: "1.8",
                    whiteSpace: "pre-line"
                }}
            >
                {message}
            </p>

        </div>

    );

}