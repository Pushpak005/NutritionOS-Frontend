import { useEffect, useState } from "react";
import { getMyMeals } from "../../services/myMealsService";

export default function MyMeals() {

    const [meals, setMeals] = useState([]);

    useEffect(() => {

        async function loadMeals() {

            try {

                const data = await getMyMeals();

                setMeals(data);

            } catch (err) {

                console.error(err);

            }

        }

        loadMeals();

    }, []);

    return (

        <div style={{ padding: "30px", color: "white" }}>

            <h1>My Meals</h1>

            <hr />

            {

                meals.map((meal) => (

                    <div
                        key={meal.id}
                        style={{
                            border: "1px solid gray",
                            borderRadius: "10px",
                            padding: "20px",
                            marginBottom: "20px"
                        }}
                    >

                        <h2>{meal.dish_name}</h2>

                        <p>🍽 Meal : {meal.meal_type}</p>

                        <p>🔥 Calories : {meal.calories}</p>

                        <p>🥩 Protein : {meal.protein} g</p>

                        <p>🍚 Carbs : {meal.carbs} g</p>

                        <p>🥑 Fat : {meal.fat} g</p>

                        <p>🌾 Fiber : {meal.fiber} g</p>

                        <p>🔢 Quantity : {meal.quantity}</p>

                    </div>

                ))

            }

        </div>

    );

}