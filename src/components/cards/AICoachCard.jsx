import { useEffect, useState } from "react";
import { getRecommendations } from "../../services/aiService";

export default function AICoachCard() {

    const [data, setData] = useState(null);

    useEffect(() => {

        async function loadAI() {

            try {

                const response = await getRecommendations();

                setData(response);

            }

            catch (err) {

                console.error(err);

            }

        }

        loadAI();

    }, []);

    if (!data)

        return <p>Loading AI Coach...</p>;

    return (

        <div
            style={{
                background: "#1f1f1f",
                padding: "25px",
                borderRadius: "15px",
                marginTop: "30px",
                border: "1px solid #333"
            }}
        >

            <h2>

                🤖 NutritionOS AI Coach

            </h2>

            <br />

            <h3>

                Remaining Protein :

                {" "}

                {Math.round(data.remaining_protein)} g

            </h3>

            <br />

            {

                data.recommendations.map((meal) => (

                    <div
                        key={meal.id}
                        style={{
                            marginBottom: "20px"
                        }}
                    >

                        <h3>

                            {meal.dish_name}

                        </h3>

                        <p>

                            Protein :

                            {" "}

                            {meal.protein} g

                        </p>

                        <p>

                            Calories :

                            {" "}

                            {meal.calories}

                        </p>

                        <p>

                            ₹ {meal.price}

                        </p>

                    </div>

                ))

            }

        </div>

    );

}