import { useNavigate } from "react-router-dom";
import { logMeal } from "../../services/mealService";
import { getDishImage } from "../../utils/imageHelper";

export default function TodayAIPickCard({
    meal,
    onMealLogged,
    nutritionComplete = false
}) {

    const navigate = useNavigate();

    // ==========================================
    // Nutrition Complete State
    // ==========================================

    if (!meal && nutritionComplete) {

        return (

            <div
                style={{
                    background:
                        "linear-gradient(135deg,#312E81,#4338CA)",

                    borderRadius: "24px",

                    padding: "32px",

                    marginBottom: "32px",

                    color: "white",

                    textAlign: "center",

                    boxShadow:
                        "0 20px 45px rgba(0,0,0,.28)",

                    border:
                        "1px solid rgba(255,255,255,.08)"
                }}
            >

                <div
                    style={{
                        fontSize: "42px",

                        marginBottom: "12px"
                    }}
                >
                    🎯
                </div>


                <h2
                    style={{
                        margin: 0,

                        fontSize: "28px",

                        fontWeight: "800"
                    }}
                >
                    Today's Nutrition Target is Complete
                </h2>


                <p
                    style={{
                        marginTop: "12px",

                        color: "#D1D5DB",

                        fontSize: "16px",

                        lineHeight: "1.6",

                        maxWidth: "700px",

                        marginLeft: "auto",

                        marginRight: "auto"
                    }}
                >
                    You've essentially met your calorie
                    and protein targets for today.
                    No additional full meal is needed
                    right now.
                </p>

            </div>

        );

    }


    // ==========================================
    // No Meal / No Recommendation
    // ==========================================

    if (!meal) {

        return null;

    }


    const mealId =
        meal.id ||
        meal.dish_id;


    const restaurant =
        meal.restaurant_name ||
        meal.restaurant ||
        "Restaurant";


    const match =
        meal.match_percentage ??
        meal.score ??
        0;


    // ==========================================
    // Log Meal
    // ==========================================

    async function handleLogMeal() {

        if (!mealId) {

            alert(
                "Meal ID not found."
            );

            return;

        }


        try {

            await logMeal(
                mealId,
                meal.meal_type || "Lunch",
                1
            );


            alert(
                "✅ Meal Logged"
            );


            // ==================================
            // Refresh Dashboard Data
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

    }


    return (

        <div
            style={{
                background:
                    "linear-gradient(135deg,#312E81,#4338CA)",

                borderRadius: "24px",

                padding: "28px",

                marginBottom: "32px",

                color: "white",

                boxShadow:
                    "0 20px 45px rgba(0,0,0,.28)",

                border:
                    "1px solid rgba(255,255,255,.08)",

                width: "100%",

                maxWidth: "100%",

                boxSizing: "border-box",

                overflow: "hidden"
            }}
        >

            {/* =====================================
                    HEADER
            ===================================== */}

            <div
                className="today-pick-header"
                style={{
                    display: "flex",

                    justifyContent:
                        "space-between",

                    alignItems:
                        "center",

                    gap: "16px",

                    marginBottom: "28px"
                }}
            >

                <div
                    style={{
                        minWidth: 0
                    }}
                >

                    <div
                        style={{
                            fontSize: "14px",

                            opacity: .75,

                            marginBottom: "6px"
                        }}
                    >
                        🤖 AI Recommendation
                    </div>


                    <h2
                        className="today-pick-title"
                        style={{
                            margin: 0,

                            fontSize: "32px",

                            fontWeight: "800"
                        }}
                    >
                        Today's Best Pick
                    </h2>

                </div>


                <div
                    className="today-pick-match"
                    style={{
                        background:
                            "rgba(34,197,94,.18)",

                        color: "#4ADE80",

                        border:
                            "1px solid rgba(74,222,128,.35)",

                        padding: "10px 18px",

                        borderRadius: "999px",

                        fontWeight: "700",

                        fontSize: "18px",

                        whiteSpace: "nowrap",

                        flexShrink: 0
                    }}
                >
                    🎯 {match}% Match
                </div>

            </div>


            {/* =====================================
                    IMAGE + DETAILS
            ===================================== */}

            <div
                className="today-pick-main"
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "320px minmax(0,1fr)",

                    gap: "28px",

                    alignItems: "center",

                    marginBottom: "30px"
                }}
            >

                <img
                    src={getDishImage(
                        meal.image_key
                    )}

                    alt={meal.dish_name}

                    style={{
                        width: "100%",

                        height: "240px",

                        objectFit: "cover",

                        borderRadius: "22px",

                        boxShadow:
                            "0 10px 24px rgba(0,0,0,.25)",

                        display: "block"
                    }}
                />


                <div
                    style={{
                        minWidth: 0
                    }}
                >

                    <h1
                        className="today-pick-dish-name"
                        style={{
                            margin: 0,

                            fontSize: "38px",

                            fontWeight: "800",

                            overflowWrap: "anywhere"
                        }}
                    >
                        {meal.dish_name}
                    </h1>


                    <p
                        style={{
                            marginTop: "10px",

                            color: "#D1D5DB",

                            fontSize: "18px",

                            overflowWrap: "anywhere"
                        }}
                    >
                        📍 {restaurant}
                    </p>


                    <div
                        style={{
                            display: "flex",

                            gap: "10px",

                            marginTop: "18px",

                            flexWrap: "wrap"
                        }}
                    >

                        <span
                            style={{
                                background: "#22C55E",

                                padding: "8px 14px",

                                borderRadius: "999px",

                                fontWeight: "700"
                            }}
                        >
                            ⭐ Healthy Score{" "}
                            {meal.healthy_score}
                        </span>


                        {meal.is_veg ? (

                            <span
                                style={{
                                    background: "#15803D",

                                    padding: "8px 14px",

                                    borderRadius: "999px"
                                }}
                            >
                                🥗 Veg
                            </span>

                        ) : (

                            <span
                                style={{
                                    background: "#B91C1C",

                                    padding: "8px 14px",

                                    borderRadius: "999px"
                                }}
                            >
                                🍗 Non Veg
                            </span>

                        )}

                    </div>

                </div>

            </div>


            {/* =====================================
                    METRICS
            ===================================== */}

            <div
                className="today-pick-metrics"
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "repeat(4,minmax(0,1fr))",

                    gap: "16px",

                    marginBottom: "28px"
                }}
            >

                {[
                    {
                        icon: "🔥",

                        title: "Calories",

                        value:
                            `${meal.calories} kcal`
                    },

                    {
                        icon: "💪",

                        title: "Protein",

                        value:
                            `${meal.protein} g`
                    },

                    {
                        icon: "💰",

                        title: "Price",

                        value:
                            `₹${meal.price}`
                    },

                    {
                        icon: "⭐",

                        title: "Rating",

                        value:
                            meal.rating
                    }

                ].map((item) => (

                    <div
                        key={item.title}
                        style={{
                            background:
                                "rgba(255,255,255,.08)",

                            border:
                                "1px solid rgba(255,255,255,.08)",

                            borderRadius: "18px",

                            padding: "18px",

                            textAlign: "center",

                            minWidth: 0,

                            boxSizing: "border-box"
                        }}
                    >

                        <div
                            style={{
                                fontSize: "24px",

                                marginBottom: "10px"
                            }}
                        >
                            {item.icon}
                        </div>


                        <div
                            className=
                                "today-pick-metric-value"

                            style={{
                                fontSize: "24px",

                                fontWeight: "700",

                                overflowWrap: "anywhere"
                            }}
                        >
                            {item.value}
                        </div>


                        <div
                            style={{
                                marginTop: "6px",

                                color: "#CBD5E1",

                                fontSize: "14px"
                            }}
                        >
                            {item.title}
                        </div>

                    </div>

                ))}

            </div>


            {/* =====================================
                    AI INSIGHT
            ===================================== */}

            <div
                style={{
                    background:
                        "rgba(255,255,255,.08)",

                    border:
                        "1px solid rgba(255,255,255,.10)",

                    borderRadius: "18px",

                    padding: "22px",

                    marginBottom: "28px",

                    boxSizing: "border-box",

                    width: "100%"
                }}
            >

                <h3
                    style={{
                        marginTop: 0,

                        marginBottom: "16px"
                    }}
                >
                    🧠 Why AI Recommended This?
                </h3>


                <ul
                    style={{
                        margin: 0,

                        paddingLeft: "22px",

                        lineHeight: "2"
                    }}
                >

                    <li>
                        {match}% match with your
                        nutrition profile
                    </li>

                    <li>
                        Optimized for{" "}
                        <strong>
                            {meal.meal_type}
                        </strong>
                    </li>

                    <li>
                        High protein for your goal
                    </li>

                    <li>
                        Fits within your daily budget
                    </li>

                    <li>
                        Highly rated restaurant
                    </li>

                </ul>

            </div>


            {/* =====================================
                    BUTTONS
            ===================================== */}

            <div
                className="today-pick-buttons"
                style={{
                    display: "flex",

                    gap: "16px"
                }}
            >

                <button
                    onClick={handleLogMeal}
                    style={{
                        flex: 1,

                        padding: "16px",

                        background: "white",

                        color: "#4338CA",

                        border: "none",

                        borderRadius: "16px",

                        fontWeight: "700",

                        cursor: "pointer",

                        fontSize: "16px"
                    }}
                >
                    🍽 Log Meal
                </button>


                <button
                    onClick={() =>
                        navigate(
                            `/dish/${mealId}`
                        )
                    }

                    style={{
                        flex: 1,

                        padding: "16px",

                        background: "transparent",

                        color: "white",

                        border:
                            "1px solid rgba(255,255,255,.35)",

                        borderRadius: "16px",

                        fontWeight: "700",

                        cursor: "pointer",

                        fontSize: "16px"
                    }}
                >
                    🔍 View Details
                </button>

            </div>


            {/* =====================================
                    MOBILE RESPONSIVE CSS
            ===================================== */}

            <style>
                {`

                    @media (max-width: 767px) {

                        .today-pick-header {

                            flex-direction:
                                column !important;

                            align-items:
                                flex-start !important;

                        }

                        .today-pick-title {

                            font-size:
                                26px !important;

                            line-height:
                                1.2 !important;

                        }

                        .today-pick-match {

                            font-size:
                                15px !important;

                            padding:
                                8px 14px !important;

                        }

                        .today-pick-main {

                            grid-template-columns:
                                1fr !important;

                            gap:
                                18px !important;

                        }

                        .today-pick-main img {

                            width:
                                100% !important;

                            height:
                                210px !important;

                        }

                        .today-pick-dish-name {

                            font-size:
                                28px !important;

                            line-height:
                                1.2 !important;

                        }

                        .today-pick-metrics {

                            grid-template-columns:
                                repeat(
                                    2,
                                    minmax(0,1fr)
                                ) !important;

                            gap:
                                10px !important;

                        }

                        .today-pick-metrics > div {

                            padding:
                                14px 8px !important;

                        }

                        .today-pick-metric-value {

                            font-size:
                                19px !important;

                        }

                        .today-pick-buttons {

                            flex-direction:
                                column !important;

                        }

                        .today-pick-buttons button {

                            width:
                                100% !important;

                        }

                    }


                    @media (max-width: 380px) {

                        .today-pick-metrics {

                            grid-template-columns:
                                1fr !important;

                        }

                    }

                `}
            </style>

        </div>

    );

}