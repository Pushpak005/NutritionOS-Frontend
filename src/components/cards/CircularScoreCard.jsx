import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

export default function CircularScoreCard({

    score

}) {

    let color = "#ef4444";

    let label = "Needs Improvement";

    if (score >= 80) {

        color = "#22c55e";

        label = "Excellent";

    }

    else if (score >= 60) {

        color = "#f59e0b";

        label = "Good";

    }

    return (

        <div

            style={{

                width:220,

                margin:"auto",

                textAlign:"center"

            }}

        >

            <CircularProgressbar

                value={score}

                text={`${score}`}

                styles={

                    buildStyles({

                        pathColor: color,

                        textColor: "#ffffff",

                        trailColor: "#333",

                        textSize: "18px"

                    })

                }

            />

            <h3

                style={{

                    marginTop:20,

                    color:"white"

                }}

            >

                Nutrition Score

            </h3>

            <p

                style={{

                    color

                }}

            >

                {label}

            </p>

        </div>

    );

}