import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getRestaurantMenu } from "../../services/restaurantService";
import { logMeal } from "../../services/mealService";

import DishCard from "../../components/cards/DishCard";

export default function Menu() {

    const { id } = useParams();

    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadMenu() {

            try {

                const data = await getRestaurantMenu(id);

                setMenu(data);

            }

            catch (err) {

                console.error(err);

            }

            finally {

                setLoading(false);

            }

        }

        loadMenu();

    }, [id]);

    async function handleLogMeal(item) {

        try {

            await logMeal(

                item.id,
                item.meal_type,
                1

            );

            alert("✅ Meal Logged Successfully");

        }

        catch (err) {

            console.error(err);

            alert("❌ Failed to Log Meal");

        }

    }

    if (loading) {

        return (

            <h2

                style={{

                    color: "white",
                    textAlign: "center",
                    marginTop: "100px"

                }}

            >

                Loading Menu...

            </h2>

        );

    }

    return (

        <div

            style={{

                maxWidth: "1200px",
                margin: "0 auto",
                padding: "30px",
                color: "white"

            }}

        >

            <h1>🍽 Restaurant Menu</h1>

            <div

                style={{

                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                    gap: "24px",
                    marginTop: "30px"

                }}

            >

                {

                    menu.map((item) => (

                        <DishCard

                            key={item.id}

                            dish={item}

                            onLogMeal={handleLogMeal}

                        />

                    ))

                }

            </div>

        </div>

    );

}