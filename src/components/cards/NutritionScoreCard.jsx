import { useCallback, useEffect, useState } from "react";

import { getNutritionScore } from "../../services/scoreService";

import CircularScoreCard from "./CircularScoreCard";
import AnimatedCard from "../common/AnimatedCard";


export default function NutritionScoreCard({ consumed }) {

    const [score, setScore] = useState(null);


    const loadScore = useCallback(async () => {

        try {

            const data = await getNutritionScore();

            setScore(data);

        }

        catch (err) {

            console.error(
                "Nutrition score loading error:",
                err
            );

        }

    }, []);


    useEffect(() => {

        loadScore();

    }, [loadScore]);


    useEffect(() => {

        function handleNutritionStateUpdated() {

            loadScore();

        }


        window.addEventListener(
            "nutrition-state-updated",
            handleNutritionStateUpdated
        );


        return () => {

            window.removeEventListener(
                "nutrition-state-updated",
                handleNutritionStateUpdated
            );

        };

    }, [loadScore]);


    /*
     * Prefer the fresh dashboard nutrition state when available.
     * This prevents the card from displaying stale Calories / Protein
     * while the score API is being refreshed.
     */

    const calories =
        consumed?.calories ??
        score?.calories ??
        0;

    const protein =
        consumed?.protein ??
        score?.protein ??
        0;


    if (!score) {

        return (

            <AnimatedCard>

                <div
                    style={{
                        background: "#1d1d1d",
                        color: "white",
                        padding: "25px",
                        borderRadius: "20px",
                        marginBottom: "30px",
                        textAlign: "center",
                        boxShadow:
                            "0 0 15px rgba(0,0,0,0.3)"
                    }}
                >

                    <h2>🏆 Nutrition Score</h2>

                    <p>Loading...</p>

                </div>

            </AnimatedCard>

        );

    }


    return (

        <AnimatedCard>

            <div
                style={{
                    background: "#1d1d1d",
                    borderRadius: "20px",
                    padding: "30px",
                    marginBottom: "30px",
                    color: "white",
                    boxShadow:
                        "0 0 15px rgba(0,0,0,0.3)"
                }}
            >

                <CircularScoreCard
                    score={score.score}
                />


                <hr
                    style={{
                        margin: "30px 0",
                        borderColor: "#333"
                    }}
                />


                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(2,1fr)",
                        gap: "20px",
                        textAlign: "center"
                    }}
                >

                    <div>

                        <h3>🔥 Calories</h3>

                        <h2>
                            {calories}
                        </h2>

                    </div>


                    <div>

                        <h3>🥩 Protein</h3>

                        <h2>
                            {protein} g
                        </h2>

                    </div>

                </div>

            </div>

        </AnimatedCard>

    );

}