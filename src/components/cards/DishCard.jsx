import { Link } from "react-router-dom";
import { getDishImage } from "../../utils/imageHelper";

export default function DishCard({

    dish,
    onLogMeal

}) {

    return (

        <div

            style={{

                background: "#111827",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: "22px",
                overflow: "hidden",
                color: "white",
                transition: ".25s",
                boxShadow: "0 8px 24px rgba(0,0,0,.18)",
                display: "flex",
                flexDirection: "column"

            }}

            onMouseEnter={(e) => {

                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                    "0 14px 32px rgba(0,0,0,.30)";

            }}

            onMouseLeave={(e) => {

                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,.18)";

            }}

        >

            <img

                src={getDishImage(dish.image_key)}

                alt={dish.dish_name}

                style={{

                    width: "100%",
                    height: "220px",
                    objectFit: "cover"

                }}

            />

            <div style={{ padding: "20px" }}>

                <div

                    style={{

                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "12px"

                    }}

                >

                    <h2

                        style={{

                            fontSize: "22px",
                            margin: 0

                        }}

                    >

                        {dish.dish_name}

                    </h2>

                    <span

                        style={{

                            background: "#22C55E",
                            padding: "6px 12px",
                            borderRadius: "999px",
                            fontWeight: "700",
                            fontSize: "13px"

                        }}

                    >

                        ⭐ {dish.healthy_score}

                    </span>

                </div>

                <p

                    style={{

                        color: "#94A3B8",
                        marginBottom: "18px"

                    }}

                >

                    {dish.category}

                    {" • "}

                    {dish.meal_type}

                </p>

                <div

                    style={{

                        display: "grid",
                        gridTemplateColumns: "repeat(3,1fr)",
                        gap: "10px",
                        marginBottom: "20px"

                    }}

                >

                    <div

                        style={{

                            background: "#1F2937",
                            padding: "12px",
                            borderRadius: "12px",
                            textAlign: "center"

                        }}

                    >

                        <div>🔥</div>

                        <strong>{dish.calories}</strong>

                        <br />

                        <small>Calories</small>

                    </div>

                    <div

                        style={{

                            background: "#1F2937",
                            padding: "12px",
                            borderRadius: "12px",
                            textAlign: "center"

                        }}

                    >

                        <div>💪</div>

                        <strong>{dish.protein}g</strong>

                        <br />

                        <small>Protein</small>

                    </div>

                    <div

                        style={{

                            background: "#1F2937",
                            padding: "12px",
                            borderRadius: "12px",
                            textAlign: "center"

                        }}

                    >

                        <div>💰</div>

                        <strong>₹{dish.price}</strong>

                        <br />

                        <small>Price</small>

                    </div>

                </div>

                <div

                    style={{

                        display: "flex",
                        gap: "10px"

                    }}

                >

                    <Link

                        to={`/dish/${dish.id}`}

                        style={{

                            flex: 1,
                            textDecoration: "none"

                        }}

                    >

                        <button

                            style={{

                                width: "100%",
                                padding: "14px",
                                border: "none",
                                borderRadius: "12px",
                                background: "#2563EB",
                                color: "white",
                                cursor: "pointer",
                                fontWeight: "700"

                            }}

                        >

                            View Details

                        </button>

                    </Link>

                    <button

                        onClick={() => onLogMeal(dish)}

                        style={{

                            flex: 1,
                            padding: "14px",
                            border: "none",
                            borderRadius: "12px",
                            background: "#7C3AED",
                            color: "white",
                            cursor: "pointer",
                            fontWeight: "700"

                        }}

                    >

                        Log Meal

                    </button>

                </div>

            </div>

        </div>

    );

}