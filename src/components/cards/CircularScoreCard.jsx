import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

export default function CircularScoreCard({

    score = 0

}) {

    let color = "#ef4444";
    let label = "Needs Improvement";
    let emoji = "😕";

    if (score >= 90) {

        color = "#22c55e";
        label = "Excellent";
        emoji = "🏆";

    }

    else if (score >= 75) {

        color = "#10b981";
        label = "Very Good";
        emoji = "💪";

    }

    else if (score >= 60) {

        color = "#f59e0b";
        label = "Good";
        emoji = "👍";

    }

    else if (score >= 40) {

        color = "#f97316";
        label = "Average";
        emoji = "🙂";

    }

    return (

        <div

            style={{

                display: "flex",

                flexDirection: "column",

                alignItems: "center",

                justifyContent: "center"

            }}

        >

            <div

                style={{

                    width: 240,

                    height: 240

                }}

            >

                <CircularProgressbar

                    value={score}

                    text={`${score}`}

                    styles={

                        buildStyles({

                            rotation: 0.25,

                            strokeLinecap: "round",

                            pathColor: color,

                            trailColor: "#232323",

                            textColor: "#ffffff",

                            textSize: "18px"

                        })

                    }

                />

            </div>

            <h2

                style={{

                    color: "white",

                    marginTop: "24px",

                    marginBottom: "8px",

                    fontWeight: "700"

                }}

            >

                Nutrition Score

            </h2>

            <div

                style={{

                    background: color,

                    padding: "8px 18px",

                    borderRadius: "999px",

                    fontWeight: "700",

                    color: "white",

                    display: "flex",

                    alignItems: "center",

                    gap: "8px",

                    boxShadow: `0 8px 20px ${color}55`

                }}

            >

                <span>{emoji}</span>

                <span>{label}</span>

            </div>

            <p

                style={{

                    marginTop: "18px",

                    color: "#94a3b8",

                    textAlign: "center",

                    lineHeight: "1.6"

                }}

            >

                Keep following your nutrition plan
                <br />
                to improve your daily score.

            </p>

        </div>

    );

}