import { useEffect, useState } from "react";

import { getTodaysMeals } from "../../services/myMealsService";
import { getDishImage } from "../../utils/imageHelper";


export default function TodaysMeals({
    refreshKey = 0
}) {

    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);


    // ==========================================
    // Load Today's Meals
    // ==========================================

    useEffect(() => {

        async function loadMeals() {

            try {

                setLoading(true);

                const response =
                    await getTodaysMeals();

                setMeals(
                    response.meals || []
                );

            }

            catch (err) {

                console.error(
                    "Today's meals loading error:",
                    err
                );

                setMeals([]);

            }

            finally {

                setLoading(false);

            }

        }

        loadMeals();

    }, [refreshKey]);


    // ==========================================
    // Today's Totals
    // ==========================================

    const totalCalories =
        meals.reduce(
            (sum, meal) =>
                sum +
                Number(meal.calories || 0),
            0
        );


    const totalProtein =
        meals.reduce(
            (sum, meal) =>
                sum +
                Number(meal.protein || 0),
            0
        );


    const totalCarbs =
        meals.reduce(
            (sum, meal) =>
                sum +
                Number(meal.carbs || 0),
            0
        );


    const totalFat =
        meals.reduce(
            (sum, meal) =>
                sum +
                Number(meal.fat || 0),
            0
        );


    // ==========================================
    // Format Time
    // ==========================================

    function formatTime(timestamp) {

        if (!timestamp) {
            return "";
        }

        const date = new Date(timestamp);

        if (Number.isNaN(date.getTime())) {
            return "";
        }

        return date.toLocaleTimeString(
            [],
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );

    }


    // ==========================================
    // Render
    // ==========================================

    return (

        <section
            className="todays-meals-section"
            style={{
                background:
                    "linear-gradient(145deg, #111827 0%, #0F172A 100%)",

                padding: "26px",

                borderRadius: "24px",

                border:
                    "1px solid rgba(255,255,255,.08)",

                color: "white",

                width: "100%",

                boxSizing: "border-box"
            }}
        >

            {/* =====================================
                    HEADER
            ===================================== */}

            <div
                className="todays-meals-header"
                style={{
                    display: "flex",

                    justifyContent: "space-between",

                    alignItems: "center",

                    gap: "20px",

                    marginBottom: "22px"
                }}
            >

                <div>

                    <div
                        style={{
                            color: "#A78BFA",

                            fontSize: "12px",

                            fontWeight: "700",

                            letterSpacing: ".05em",

                            textTransform: "uppercase",

                            marginBottom: "6px"
                        }}
                    >
                        Daily Food Log
                    </div>


                    <h2
                        style={{
                            margin: 0,

                            fontSize: "27px",

                            lineHeight: "1.2",

                            fontWeight: "800",

                            color: "#FFFFFF"
                        }}
                    >
                        🍽️ What You Ate Today
                    </h2>


                    <p
                        style={{
                            margin: "6px 0 0",

                            color: "#94A3B8",

                            fontSize: "13px"
                        }}
                    >
                        {loading
                            ? "Loading your meals..."
                            : meals.length === 0
                                ? "No meals logged today"
                                : `${meals.length} ${
                                    meals.length === 1
                                        ? "meal"
                                        : "meals"
                                } logged today`
                        }
                    </p>

                </div>


                {/* =================================
                        CALORIE TOTAL
                ================================= */}

                <div
                    style={{
                        background:
                            "rgba(124,58,237,.15)",

                        border:
                            "1px solid rgba(139,92,246,.28)",

                        borderRadius: "15px",

                        padding: "10px 17px",

                        minWidth: "135px",

                        textAlign: "right",

                        flexShrink: 0
                    }}
                >

                    <div
                        style={{
                            color: "#A78BFA",

                            fontSize: "10px",

                            fontWeight: "700",

                            letterSpacing: ".04em",

                            marginBottom: "2px"
                        }}
                    >
                        CALORIES EATEN
                    </div>


                    <div
                        style={{
                            color: "#FFFFFF",

                            fontSize: "21px",

                            fontWeight: "800"
                        }}
                    >
                        🔥 {Math.round(totalCalories)} kcal
                    </div>

                </div>

            </div>


            {/* =====================================
                    COMPACT MACRO SUMMARY
            ===================================== */}

            {!loading && meals.length > 0 && (

                <div
                    className="macro-summary"
                    style={{
                        display: "flex",

                        alignItems: "center",

                        gap: "20px",

                        padding:
                            "12px 16px",

                        marginBottom: "18px",

                        background:
                            "rgba(255,255,255,.035)",

                        borderRadius: "13px",

                        color: "#CBD5E1",

                        fontSize: "13px",

                        flexWrap: "wrap"
                    }}
                >

                    <span>
                        💪 <strong>{Math.round(totalProtein)}g</strong> protein
                    </span>

                    <span>
                        🍚 <strong>{Math.round(totalCarbs)}g</strong> carbs
                    </span>

                    <span>
                        🥑 <strong>{Math.round(totalFat)}g</strong> fat
                    </span>

                </div>

            )}


            {/* =====================================
                    LOADING
            ===================================== */}

            {loading && (

                <div
                    style={{
                        padding: "35px 10px",

                        textAlign: "center",

                        color: "#94A3B8",

                        fontSize: "14px"
                    }}
                >
                    Loading today's meals...
                </div>

            )}


            {/* =====================================
                    EMPTY STATE
            ===================================== */}

            {!loading && meals.length === 0 && (

                <div
                    style={{
                        background: "#1B2637",

                        borderRadius: "17px",

                        padding: "35px 20px",

                        textAlign: "center"
                    }}
                >

                    <div
                        style={{
                            fontSize: "36px",

                            marginBottom: "10px"
                        }}
                    >
                        🍽️
                    </div>


                    <div
                        style={{
                            fontSize: "17px",

                            fontWeight: "700",

                            marginBottom: "5px"
                        }}
                    >
                        Nothing logged yet
                    </div>


                    <div
                        style={{
                            color: "#94A3B8",

                            fontSize: "13px"
                        }}
                    >
                        Log a meal from your AI
                        recommendations to see it here.
                    </div>

                </div>

            )}


            {/* =====================================
                    MEAL LIST
            ===================================== */}

            {!loading && meals.length > 0 && (

                <div
                    style={{
                        display: "flex",

                        flexDirection: "column",

                        gap: "10px"
                    }}
                >

                    {meals.map((meal) => (

                        <div
                            key={meal.id}
                            className="meal-log-card"
                            style={{
                                display: "flex",

                                alignItems: "center",

                                gap: "15px",

                                background: "#1B2637",

                                border:
                                    "1px solid rgba(255,255,255,.055)",

                                borderRadius: "17px",

                                padding: "12px 14px",

                                minWidth: 0,

                                transition:
                                    "transform .18s ease, border-color .18s ease"
                            }}
                        >

                            {/* =================================
                                    IMAGE
                            ================================= */}

                            <div
                                style={{
                                    width: "76px",

                                    height: "76px",

                                    borderRadius: "13px",

                                    overflow: "hidden",

                                    flexShrink: 0,

                                    background: "#374151"
                                }}
                            >

                                <img
                                    src={getDishImage(
                                        meal.image_key
                                    )}

                                    alt={
                                        meal.dish_name ||
                                        "Meal"
                                    }

                                    onError={(e) => {

                                        e.target.src =
                                            "https://placehold.co/300x300?text=NutritionOS";

                                    }}

                                    style={{
                                        width: "100%",

                                        height: "100%",

                                        objectFit: "cover",

                                        display: "block"
                                    }}
                                />

                            </div>


                            {/* =================================
                                    MEAL INFORMATION
                            ================================= */}

                            <div
                                style={{
                                    flex: 1,

                                    minWidth: 0
                                }}
                            >

                                {/* Dish */}

                                <h3
                                    style={{
                                        margin: 0,

                                        marginBottom: "4px",

                                        color: "#FFFFFF",

                                        fontSize: "16px",

                                        fontWeight: "750",

                                        lineHeight: "1.3",

                                        overflowWrap: "anywhere"
                                    }}
                                >
                                    {meal.dish_name ||
                                        `Meal #${meal.dish_id}`}
                                </h3>


                                {/* Restaurant */}

                                <div
                                    style={{
                                        color: "#94A3B8",

                                        fontSize: "12px",

                                        marginBottom: "8px",

                                        overflowWrap: "anywhere"
                                    }}
                                >

                                    {meal.restaurant_name
                                        ? `📍 ${meal.restaurant_name}`
                                        : "NutritionOS"}

                                    {meal.area
                                        ? ` · ${meal.area}`
                                        : ""
                                    }

                                </div>


                                {/* Meal type + time */}

                                <div
                                    style={{
                                        display: "flex",

                                        alignItems: "center",

                                        gap: "8px",

                                        flexWrap: "wrap"
                                    }}
                                >

                                    <span
                                        style={{
                                            background: "#312E81",

                                            color: "#C4B5FD",

                                            padding:
                                                "4px 9px",

                                            borderRadius:
                                                "999px",

                                            fontSize: "11px",

                                            fontWeight: "700"
                                        }}
                                    >
                                        {meal.meal_type ||
                                            "Meal"}
                                    </span>


                                    {formatTime(
                                        meal.eaten_at
                                    ) && (

                                        <span
                                            style={{
                                                color:
                                                    "#64748B",

                                                fontSize:
                                                    "11px"
                                            }}
                                        >
                                            {formatTime(
                                                meal.eaten_at
                                            )}
                                        </span>

                                    )}

                                </div>

                            </div>


                            {/* =================================
                                    SIMPLE NUTRITION
                            ================================= */}

                            <div
                                className="meal-summary"
                                style={{
                                    display: "flex",

                                    flexDirection: "column",

                                    alignItems: "flex-end",

                                    justifyContent: "center",

                                    minWidth: "105px",

                                    flexShrink: 0
                                }}
                            >

                                {/* Calories */}

                                <div
                                    style={{
                                        color: "#FFFFFF",

                                        fontSize: "17px",

                                        fontWeight: "800",

                                        marginBottom: "3px",

                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    🔥 {meal.calories || 0} kcal
                                </div>


                                {/* Protein */}

                                <div
                                    style={{
                                        color: "#A7F3D0",

                                        fontSize: "12px",

                                        fontWeight: "700",

                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    💪 {meal.protein || 0}g protein
                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}


            {/* =====================================
                    RESPONSIVE
            ===================================== */}

            <style>
                {`

                    .meal-log-card:hover {

                        transform:
                            translateY(-1px);

                        border-color:
                            rgba(139,92,246,.25) !important;

                    }


                    @media (max-width: 700px) {

                        .todays-meals-section {

                            padding:
                                18px !important;

                            border-radius:
                                19px !important;

                        }


                        .todays-meals-header {

                            align-items:
                                flex-start !important;

                        }


                        .todays-meals-header > div:last-child {

                            min-width:
                                auto !important;

                        }


                        .meal-log-card {

                            align-items:
                                flex-start !important;

                        }


                        .meal-summary {

                            min-width:
                                90px !important;

                        }

                    }


                    @media (max-width: 560px) {

                        .todays-meals-header {

                            flex-direction:
                                column !important;

                        }


                        .todays-meals-header > div:last-child {

                            width:
                                100% !important;

                            box-sizing:
                                border-box !important;

                            text-align:
                                left !important;

                        }


                        .meal-log-card {

                            flex-wrap:
                                wrap !important;

                        }


                        .meal-summary {

                            width:
                                100% !important;

                            flex-direction:
                                row !important;

                            justify-content:
                                space-between !important;

                            align-items:
                                center !important;

                            min-width:
                                0 !important;

                            padding-left:
                                91px;

                            box-sizing:
                                border-box;

                        }

                    }


                    @media (max-width: 400px) {

                        .macro-summary {

                            gap:
                                10px !important;

                        }


                        .meal-log-card {

                            padding:
                                10px !important;

                        }


                        .meal-log-card > div:first-child {

                            width:
                                64px !important;

                            height:
                                64px !important;

                        }


                        .meal-summary {

                            padding-left:
                                0 !important;

                        }

                    }

                `}
            </style>

        </section>

    );

}