import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantMenu } from "../../services/restaurantService";
import { logMeal } from "../../services/mealService";

export default function Menu() {

  const { id } = useParams();

  const [menu, setMenu] = useState([]);

  useEffect(() => {

    async function loadMenu() {

      try {

        const data = await getRestaurantMenu(id);

        setMenu(data);

      } catch (err) {

        console.error(err);

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

    } catch (err) {

      console.error(err);

      alert("❌ Failed to Log Meal");

    }

  }

  return (

    <div
      style={{
        padding: "30px",
        color: "white"
      }}
    >

      <h1>Restaurant Menu</h1>

      <hr />

      {

        menu.map((item) => (

          <div
            key={item.id}
            style={{
              border: "1px solid gray",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px"
            }}
          >

            <h2>{item.dish_name}</h2>

            <p>Category : {item.category}</p>

            <p>Meal Type : {item.meal_type}</p>

            <p>₹ {item.price}</p>

            <p>🔥 Calories : {item.calories}</p>

            <p>🥩 Protein : {item.protein} g</p>

            <p>🍚 Carbs : {item.carbs} g</p>

            <p>🥑 Fat : {item.fat} g</p>

            <p>🌾 Fiber : {item.fiber} g</p>

            <button
              onClick={() => handleLogMeal(item)}
              style={{
                marginTop: "10px",
                padding: "10px 18px",
                background: "#7c3aed",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Log Meal
            </button>

          </div>

        ))

      }

    </div>

  );

}