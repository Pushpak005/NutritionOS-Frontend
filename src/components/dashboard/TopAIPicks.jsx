import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { logMeal } from "../../services/mealService";
import { getDishImage } from "../../utils/imageHelper";


export default function TopAIPicks({
    meals = [],
    onMealLogged
}) {

    const navigate = useNavigate();

    const [loggingMealId, setLoggingMealId] =
        useState(null);

    const [loggedMealId, setLoggedMealId] =
        useState(null);


    // ==========================================
    // Empty State
    // ==========================================

    if (!meals || meals.length === 0) {

        return null;

    }


    // ==========================================
    // Log Meal
    // ==========================================

    async function handleLogMeal(
        e,
        meal
    ) {

        // Prevent card navigation

        e.stopPropagation();


        const mealId =
            meal.id ||
            meal.dish_id;


        if (!mealId) {

            alert(
                "Meal ID not found."
            );

            return;

        }


        // Prevent duplicate clicks

        if (
            loggingMealId === mealId
        ) {

            return;

        }


        try {

            setLoggingMealId(
                mealId
            );


            // ==================================
            // Log Meal
            // ==================================

            await logMeal(

                mealId,

                meal.meal_type ||
                    "Lunch",

                1

            );


            // ==================================
            // Show Success State
            // ==================================

            setLoggedMealId(
                mealId
            );


            // ==================================
            // Refresh Dashboard
            // ==================================

            if (onMealLogged) {

                await onMealLogged();

            }


        }

        catch (err) {

            console.error(
                "Meal logging error:",
                err
            );


            alert(
                "Unable to log meal."
            );

        }

        finally {

            setLoggingMealId(
                null
            );

        }

    }


    return (

        <div
            style={{
                marginBottom: "30px",
                width: "100%",
                minWidth: 0,
                boxSizing: "border-box"
            }}
        >

            {/* =====================================
                    HEADER
            ===================================== */}

            <div
                className="top-picks-header"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "end",
                    gap: "12px",
                    marginBottom: "18px"
                }}
            >

                <div
                    style={{
                        minWidth: 0
                    }}
                >

                    <div
                        style={{
                            color: "#8B5CF6",
                            fontWeight: "700",
                            marginBottom: "6px",
                            fontSize: "14px"
                        }}
                    >
                        🤖 AI Suggestions
                    </div>


                    <h2
                        className="top-picks-title"
                        style={{
                            margin: 0,
                            color: "white",
                            fontSize: "30px",
                            fontWeight: "800"
                        }}
                    >
                        Similar Meals You May Like
                    </h2>

                </div>


                <div
                    style={{
                        color: "#94A3B8",
                        fontSize: "15px",
                        whiteSpace: "nowrap"
                    }}
                >
                    {meals.length} Recommendations
                </div>

            </div>


            {/* =====================================
                    CARDS
            ===================================== */}

            <div
                className="top-picks-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill,minmax(290px,1fr))",
                    gap: "20px",
                    width: "100%",
                    minWidth: 0
                }}
            >

                {meals.map((meal) => (

                    <div
                        key={meal.id}
                        onClick={() =>
                            navigate(
                                `/dish/${meal.id}`
                            )
                        }
                        style={{
                            background: "#111827",
                            borderRadius: "22px",
                            overflow: "hidden",
                            border:
                                "1px solid rgba(255,255,255,.06)",
                            cursor: "pointer",
                            transition: ".25s",
                            display: "flex",
                            flexDirection: "column",
                            minWidth: 0,
                            width: "100%",
                            boxSizing: "border-box"
                        }}
                        onMouseEnter={(e) => {

                            e.currentTarget.style.transform =
                                "translateY(-6px)";

                            e.currentTarget.style.boxShadow =
                                "0 20px 40px rgba(0,0,0,.25)";

                        }}
                        onMouseLeave={(e) => {

                            e.currentTarget.style.transform =
                                "translateY(0)";

                            e.currentTarget.style.boxShadow =
                                "none";

                        }}
                    >

                        {/* =====================================
                                IMAGE
                        ===================================== */}

                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                overflow: "hidden"
                            }}
                        >

                            <img
                                src={getDishImage(
                                    meal.image_key
                                )}
                                alt={meal.dish_name}
                                onError={(e) => {

                                    e.target.src =
                                        "https://placehold.co/600x400?text=NutritionOS";

                                }}
                                style={{
                                    width: "100%",
                                    height: "190px",
                                    objectFit: "cover",
                                    display: "block"
                                }}
                            />


                            {/* HEALTHY + VEG */}

                            <div
                                style={{
                                    position: "absolute",
                                    top: "12px",
                                    left: "12px",
                                    display: "flex",
                                    gap: "6px",
                                    flexWrap: "wrap",
                                    maxWidth: "70%"
                                }}
                            >

                                <span
                                    style={{
                                        background: "#22C55E",
                                        color: "white",
                                        padding: "6px 10px",
                                        borderRadius: "999px",
                                        fontSize: "12px",
                                        fontWeight: "700"
                                    }}
                                >
                                    ⭐{" "}
                                    {meal.healthy_score ?? "--"}
                                </span>


                                <span
                                    style={{
                                        background:
                                            meal.is_veg
                                                ? "#15803D"
                                                : "#B91C1C",
                                        color: "white",
                                        padding: "6px 10px",
                                        borderRadius: "999px",
                                        fontSize: "12px",
                                        fontWeight: "700"
                                    }}
                                >
                                    {meal.is_veg
                                        ? "🥗 Veg"
                                        : "🍗 Non Veg"}
                                </span>

                            </div>


                            {/* MATCH */}

                            <div
                                style={{
                                    position: "absolute",
                                    top: "12px",
                                    right: "12px",
                                    background:
                                        "rgba(34,197,94,.15)",
                                    color: "#4ADE80",
                                    border:
                                        "1px solid rgba(34,197,94,.35)",
                                    padding: "7px 10px",
                                    borderRadius: "999px",
                                    fontWeight: "700",
                                    fontSize: "12px",
                                    whiteSpace: "nowrap"
                                }}
                            >
                                🎯{" "}
                                {meal.match_percentage ?? 0}%
                            </div>

                        </div>


                        {/* =====================================
                                CONTENT
                        ===================================== */}

                        <div
                            style={{
                                padding: "18px",
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                                minWidth: 0,
                                boxSizing: "border-box"
                            }}
                        >

                            <h3
                                style={{
                                    color: "white",
                                    margin: 0,
                                    fontSize: "21px",
                                    lineHeight: "1.3",
                                    minHeight: "54px",
                                    overflowWrap: "anywhere"
                                }}
                            >
                                {meal.dish_name}
                            </h3>


                            <p
                                style={{
                                    color: "#94A3B8",
                                    marginTop: "8px",
                                    marginBottom: "16px",
                                    overflowWrap: "anywhere"
                                }}
                            >
                                📍{" "}
                                {meal.restaurant_name ||
                                    "Restaurant"}
                            </p>


                            {/* =====================================
                                    METRICS
                            ===================================== */}

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "repeat(2,minmax(0,1fr))",
                                    gap: "10px",
                                    minWidth: 0
                                }}
                            >

                                {[

                                    {
                                        icon: "🔥",
                                        value:
                                            `${meal.calories ?? 0}`,
                                        label: "Calories"
                                    },

                                    {
                                        icon: "💪",
                                        value:
                                            `${meal.protein ?? 0}g`,
                                        label: "Protein"
                                    },

                                    {
                                        icon: "💰",
                                        value:
                                            `₹${meal.price ?? "--"}`,
                                        label: "Price"
                                    },

                                    {
                                        icon: "⭐",
                                        value:
                                            meal.rating ?? "--",
                                        label: "Rating"
                                    }

                                ].map(item => (

                                    <div
                                        key={item.label}
                                        style={{
                                            background: "#1F2937",
                                            borderRadius: "14px",
                                            padding: "12px 6px",
                                            textAlign: "center",
                                            minWidth: 0,
                                            boxSizing: "border-box"
                                        }}
                                    >

                                        <div
                                            style={{
                                                fontSize: "18px"
                                            }}
                                        >
                                            {item.icon}
                                        </div>


                                        <div
                                            style={{
                                                marginTop: "5px",
                                                fontWeight: "700",
                                                color: "white",
                                                fontSize: "17px",
                                                overflowWrap: "anywhere"
                                            }}
                                        >
                                            {item.value}
                                        </div>


                                        <div
                                            style={{
                                                color: "#94A3B8",
                                                fontSize: "12px",
                                                marginTop: "3px"
                                            }}
                                        >
                                            {item.label}
                                        </div>

                                    </div>

                                ))}

                            </div>


                            {/* =====================================
                                    LOG MEAL
                            ===================================== */}

                            <button
                                onClick={(e) =>
                                    handleLogMeal(
                                        e,
                                        meal
                                    )
                                }
                                disabled={
                                    loggingMealId ===
                                    (meal.id ||
                                        meal.dish_id)
                                }
                                style={{
                                    marginTop: "18px",
                                    border: "none",
                                    background:
                                        loggedMealId ===
                                        (meal.id ||
                                            meal.dish_id)
                                            ? "#16A34A"
                                            : "#22C55E",
                                    color: "white",
                                    padding: "14px",
                                    borderRadius: "14px",
                                    cursor:
                                        loggingMealId ===
                                        (meal.id ||
                                            meal.dish_id)
                                            ? "wait"
                                            : "pointer",
                                    fontWeight: "700",
                                    fontSize: "15px",
                                    width: "100%",
                                    opacity:
                                        loggingMealId ===
                                        (meal.id ||
                                            meal.dish_id)
                                            ? 0.7
                                            : 1
                                }}
                            >
                                {loggingMealId ===
                                (meal.id ||
                                    meal.dish_id)

                                    ? "Logging..."

                                    : loggedMealId ===
                                      (meal.id ||
                                          meal.dish_id)

                                    ? "✓ Meal Logged"

                                    : "🍽 Log Meal"}

                            </button>


                            {/* =====================================
                                    VIEW DETAILS
                            ===================================== */}

                            <button
                                onClick={(e) => {

                                    e.stopPropagation();

                                    navigate(
                                        `/dish/${meal.id}`
                                    );

                                }}
                                style={{
                                    marginTop: "10px",
                                    border:
                                        "1px solid rgba(255,255,255,.15)",
                                    background:
                                        "transparent",
                                    color: "white",
                                    padding: "14px",
                                    borderRadius: "14px",
                                    cursor: "pointer",
                                    fontWeight: "700",
                                    fontSize: "15px",
                                    width: "100%"
                                }}
                            >
                                View Details →
                            </button>

                        </div>

                    </div>

                ))}

            </div>


            {/* =====================================
                    MOBILE RESPONSIVE
            ===================================== */}

            <style>
                {`

                    @media (max-width: 767px) {

                        .top-picks-header {

                            align-items:
                                flex-start !important;

                            flex-direction:
                                column !important;

                        }

                        .top-picks-title {

                            font-size:
                                24px !important;

                            line-height:
                                1.25 !important;

                        }

                        .top-picks-grid {

                            grid-template-columns:
                                1fr !important;

                            gap:
                                14px !important;

                        }

                    }

                `}
            </style>

        </div>

    );

}