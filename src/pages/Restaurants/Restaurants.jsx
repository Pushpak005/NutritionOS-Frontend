import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRestaurants } from "../../services/restaurantService";

export default function Restaurants() {

  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    async function loadRestaurants() {

      try {

        const data = await getRestaurants();

        setRestaurants(data);

      } catch (err) {

        console.error(err);

      }

    }

    loadRestaurants();

  }, []);

  return (

    <div style={{ padding: "30px", color: "white" }}>

      <h1>Restaurants</h1>

      <hr />

      {
        restaurants.map((r) => (

          <div
            key={r.restaurant_id}
            onClick={() => navigate(`/restaurants/${r.restaurant_id}/menu`)}
            style={{
              border: "1px solid gray",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "0.3s"
            }}
          >

            <h2>{r.restaurant_name}</h2>

            <p>📍 {r.area}</p>

            <p>⭐ {r.rating}</p>

            <p>🚚 {r.delivery_time} mins</p>

            <button
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
              View Menu
            </button>

          </div>

        ))
      }

    </div>

  );

}