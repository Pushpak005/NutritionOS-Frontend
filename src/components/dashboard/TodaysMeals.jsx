import { useEffect, useState } from "react";
import { getMyMeals } from "../../services/myMealsService";

export default function TodaysMeals() {

    const [meals, setMeals] = useState([]);

    useEffect(() => {

        async function loadMeals() {

            try {

                const data = await getMyMeals();

                setMeals(data);

            }

            catch (err) {

                console.error(err);

            }

        }

        loadMeals();

    }, []);

    const totalCalories = meals.reduce(

        (sum, meal) => sum + Number(meal.calories),

        0

    );

    return (

        <div
            style={{
                background:"#1d1d1d",
                marginTop:"30px",
                padding:"25px",
                borderRadius:"15px"
            }}
        >

            <h2>🍽 Today's Meals</h2>

            <br/>

            {

                meals.length===0 ?

                <p>No meals logged today.</p>

                :

                meals.map((meal)=>(

                    <div
                        key={meal.id}
                        style={{
                            marginBottom:"20px",
                            borderBottom:"1px solid #333",
                            paddingBottom:"15px"
                        }}
                    >

                        <h3>{meal.dish_name}</h3>

                        <p>{meal.meal_type}</p>

                        <p>🔥 {meal.calories} kcal</p>

                    </div>

                ))

            }

            <hr/>

            <h3>

                Total Calories :

                {totalCalories}

                kcal

            </h3>

        </div>

    );

}