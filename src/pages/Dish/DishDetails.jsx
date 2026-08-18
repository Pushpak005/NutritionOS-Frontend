import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getDish } from "../../services/dishService";
import { logMeal } from "../../services/mealService";
import { getDishImage } from "../../utils/imageHelper";


export default function DishDetails() {

    const { dishId } = useParams();

    const navigate = useNavigate();


    // ==========================================
    // State
    // ==========================================

    const [dish, setDish] = useState(null);

    const [loading, setLoading] = useState(true);

    const [loggingMeal, setLoggingMeal] = useState(false);

    const [mealLogged, setMealLogged] = useState(false);

    const [error, setError] = useState("");


    // ==========================================
    // Load Dish
    // ==========================================

    useEffect(() => {

        async function loadDish() {

            try {

                setLoading(true);

                setError("");

                const data =
                    await getDish(dishId);

                setDish(data);

            }

            catch (err) {

                console.error(
                    "Dish loading error:",
                    err
                );

                setError(
                    "Unable to load this dish."
                );

            }

            finally {

                setLoading(false);

            }

        }

        loadDish();

    }, [dishId]);


    // ==========================================
    // Log Meal
    // ==========================================

    async function handleLogMeal() {

        if (!dish || loggingMeal || mealLogged) {
            return;
        }

        try {

            setLoggingMeal(true);

            setError("");

            await logMeal(
                dish.id || dish.dish_id,
                dish.meal_type || "Lunch",
                1
            );

            setMealLogged(true);

        }

        catch (err) {

            console.error(
                "Meal logging error:",
                err
            );

            setError(
                "Unable to log this meal. Please try again."
            );

        }

        finally {

            setLoggingMeal(false);

        }

    }


    // ==========================================
    // Loading State
    // ==========================================

    if (loading) {

        return (

            <div
                style={{
                    minHeight: "70vh",

                    display: "flex",

                    justifyContent: "center",

                    alignItems: "center",

                    color: "white",

                    fontSize: "20px",

                    fontWeight: "700"
                }}
            >

                Loading dish...

            </div>

        );

    }


    // ==========================================
    // Error / Not Found
    // ==========================================

    if (!dish) {

        return (

            <div
                style={{
                    minHeight: "70vh",

                    display: "flex",

                    flexDirection: "column",

                    justifyContent: "center",

                    alignItems: "center",

                    color: "white",

                    textAlign: "center",

                    padding: "30px"
                }}
            >

                <div
                    style={{
                        fontSize: "48px",

                        marginBottom: "15px"
                    }}
                >
                    🍽️
                </div>


                <h2
                    style={{
                        margin: 0,

                        marginBottom: "10px"
                    }}
                >
                    Dish Not Found
                </h2>


                <p
                    style={{
                        color: "#94A3B8",

                        marginBottom: "25px"
                    }}
                >
                    {error ||
                        "This dish could not be found."}
                </p>


                <button
                    onClick={() =>
                        navigate("/recommendations")
                    }
                    style={{
                        padding: "13px 22px",

                        borderRadius: "12px",

                        border: "none",

                        background: "#7C3AED",

                        color: "white",

                        fontWeight: "700",

                        cursor: "pointer"
                    }}
                >
                    ← Back to AI Picks
                </button>

            </div>

        );

    }


    // ==========================================
    // Safe Values
    // ==========================================

    const dishIdValue =
        dish.id ||
        dish.dish_id;


    const image =
        dish.image_key
            ? getDishImage(
                dish.image_key
            )
            : "https://placehold.co/800x500?text=NutritionOS";


    const rating =
        Number(
            dish.rating || 0
        );


    const healthyScore =
        Number(
            dish.healthy_score || 0
        );


    const matchPercentage =
        Number(
            dish.match_percentage ??
            dish.score ??
            0
        );


    const calories =
        Number(
            dish.calories || 0
        );


    const protein =
        Number(
            dish.protein || 0
        );


    const carbs =
        Number(
            dish.carbs || 0
        );


    const fat =
        Number(
            dish.fat || 0
        );


    const fiber =
        Number(
            dish.fiber || 0
        );


    const price =
        Number(
            dish.price || 0
        );


    // ==========================================
    // Why Recommended
    // ==========================================

    const whyRecommended =
        Array.isArray(
            dish.why_recommended
        )
            ? dish.why_recommended
            : [];


    // ==========================================
    // Render
    // ==========================================

    return (

        <div
            className="dish-details-page"
            style={{
                maxWidth: "1200px",

                margin: "0 auto",

                padding: "30px",

                color: "white",

                boxSizing: "border-box"
            }}
        >

            {/* =====================================
                    BACK
            ===================================== */}

            <button
                onClick={() =>
                    navigate(-1)
                }
                style={{
                    background: "transparent",

                    border: "none",

                    color: "#A78BFA",

                    fontSize: "14px",

                    fontWeight: "700",

                    cursor: "pointer",

                    padding: "0",

                    marginBottom: "22px"
                }}
            >
                ← Back
            </button>


            {/* =====================================
                    MAIN HERO
            ===================================== */}

            <div
                className="dish-hero"
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "1.05fr 1fr",

                    gap: "32px",

                    background:
                        "linear-gradient(145deg, #111827, #0F172A)",

                    border:
                        "1px solid rgba(255,255,255,.08)",

                    borderRadius: "28px",

                    padding: "22px",

                    boxSizing: "border-box"
                }}
            >

                {/* =================================
                        IMAGE
                ================================= */}

                <div
                    style={{
                        position: "relative"
                    }}
                >

                    <img
                        src={image}
                        alt={
                            dish.dish_name ||
                            "Dish"
                        }
                        onError={(e) => {

                            e.currentTarget.src =
                                "https://placehold.co/800x500?text=NutritionOS";

                        }}
                        style={{
                            width: "100%",

                            height: "430px",

                            objectFit: "cover",

                            borderRadius: "21px",

                            display: "block"
                        }}
                    />


                    {/* Match Badge */}

                    {matchPercentage > 0 && (

                        <div
                            style={{
                                position: "absolute",

                                top: "16px",

                                left: "16px",

                                background:
                                    "rgba(17,24,39,.92)",

                                border:
                                    "1px solid rgba(167,139,250,.35)",

                                backdropFilter:
                                    "blur(10px)",

                                padding:
                                    "9px 13px",

                                borderRadius:
                                    "999px",

                                color:
                                    "#C4B5FD",

                                fontSize:
                                    "13px",

                                fontWeight:
                                    "800"
                            }}
                        >
                            🎯 {matchPercentage}% Match
                        </div>

                    )}


                    {/* Veg Badge */}

                    {dish.is_veg && (

                        <div
                            style={{
                                position: "absolute",

                                top: "16px",

                                right: "16px",

                                background:
                                    "rgba(22,163,74,.95)",

                                padding:
                                    "7px 12px",

                                borderRadius:
                                    "999px",

                                color:
                                    "white",

                                fontSize:
                                    "12px",

                                fontWeight:
                                    "800"
                            }}
                        >
                            🌱 Vegetarian
                        </div>

                    )}

                </div>


                {/* =================================
                        DETAILS
                ================================= */}

                <div
                    style={{
                        display: "flex",

                        flexDirection: "column",

                        justifyContent: "center",

                        minWidth: 0
                    }}
                >

                    {/* Category */}

                    <div
                        style={{
                            color: "#A78BFA",

                            fontSize: "12px",

                            fontWeight: "800",

                            textTransform: "uppercase",

                            letterSpacing: ".06em",

                            marginBottom: "9px"
                        }}
                    >
                        {dish.category ||
                            "Healthy Meal"}
                    </div>


                    {/* Dish Name */}

                    <h1
                        style={{
                            fontSize: "42px",

                            lineHeight: "1.1",

                            margin: 0,

                            marginBottom: "12px",

                            fontWeight: "850",

                            color: "#FFFFFF",

                            overflowWrap:
                                "anywhere"
                        }}
                    >
                        {dish.dish_name}
                    </h1>


                    {/* Restaurant */}

                    <div
                        style={{
                            color: "#CBD5E1",

                            fontSize: "15px",

                            marginBottom: "5px"
                        }}
                    >
                        🏪{" "}
                        <strong>
                            {dish.restaurant_name ||
                                dish.restaurant ||
                                "Restaurant"}
                        </strong>
                    </div>


                    {/* Area */}

                    {dish.area && (

                        <div
                            style={{
                                color: "#94A3B8",

                                fontSize: "13px",

                                marginBottom: "8px"
                            }}
                        >
                            📍 {dish.area}
                        </div>

                    )}


                    {/* Rating */}

                    {rating > 0 && (

                        <div
                            style={{
                                color: "#FCD34D",

                                fontSize: "14px",

                                marginBottom: "18px"
                            }}
                        >
                            ⭐ {rating.toFixed(1)} restaurant rating
                        </div>

                    )}


                    {/* Price */}

                    <div
                        style={{
                            fontSize: "26px",

                            fontWeight: "850",

                            marginBottom: "20px"
                        }}
                    >
                        ₹{price}
                    </div>


                    {/* =================================
                            QUICK NUTRITION
                    ================================= */}

                    <div
                        className="nutrition-grid"
                        style={{
                            display: "grid",

                            gridTemplateColumns:
                                "repeat(2, 1fr)",

                            gap: "9px",

                            marginBottom: "22px"
                        }}
                    >

                        <NutritionItem
                            emoji="🔥"
                            label="Calories"
                            value={`${calories} kcal`}
                        />

                        <NutritionItem
                            emoji="💪"
                            label="Protein"
                            value={`${protein} g`}
                        />

                        <NutritionItem
                            emoji="🍚"
                            label="Carbs"
                            value={`${carbs} g`}
                        />

                        <NutritionItem
                            emoji="🥑"
                            label="Fat"
                            value={`${fat} g`}
                        />

                        <NutritionItem
                            emoji="🌾"
                            label="Fiber"
                            value={`${fiber} g`}
                        />

                        {healthyScore > 0 && (

                            <NutritionItem
                                emoji="❤️"
                                label="Healthy Score"
                                value={`${healthyScore}/100`}
                            />

                        )}

                    </div>


                    {/* =================================
                            LOG MEAL
                    ================================= */}

                    <button
                        onClick={
                            handleLogMeal
                        }

                        disabled={
                            loggingMeal ||
                            mealLogged
                        }

                        style={{
                            width: "100%",

                            padding: "15px 18px",

                            borderRadius: "14px",

                            border: "none",

                            background:
                                mealLogged
                                    ? "#16A34A"
                                    : "#7C3AED",

                            color: "white",

                            fontSize: "15px",

                            fontWeight: "800",

                            cursor:
                                loggingMeal ||
                                mealLogged
                                    ? "default"
                                    : "pointer",

                            opacity:
                                loggingMeal
                                    ? 0.75
                                    : 1,

                            marginBottom: "10px"
                        }}
                    >

                        {loggingMeal
                            ? "Logging Meal..."
                            : mealLogged
                                ? "✓ Meal Logged"
                                : "🍽️ Log This Meal"
                        }

                    </button>


                    {/* Browse Restaurants */}

                    <button
                        onClick={() =>
                            navigate(
                                "/restaurants"
                            )
                        }
                        style={{
                            width: "100%",

                            padding: "14px 18px",

                            borderRadius: "14px",

                            border:
                                "1px solid rgba(255,255,255,.12)",

                            background:
                                "rgba(255,255,255,.04)",

                            color: "#E2E8F0",

                            fontSize: "14px",

                            fontWeight: "700",

                            cursor: "pointer"
                        }}
                    >
                        🍽️ Browse Restaurants
                    </button>


                    {/* Error */}

                    {error && (

                        <div
                            style={{
                                color: "#FCA5A5",

                                fontSize: "13px",

                                marginTop: "12px",

                                textAlign: "center"
                            }}
                        >
                            {error}
                        </div>

                    )}

                </div>

            </div>


            {/* =====================================
                    WHY RECOMMENDED
            ===================================== */}

            {whyRecommended.length > 0 && (

                <section
                    style={{
                        marginTop: "22px",

                        background:
                            "#111827",

                        border:
                            "1px solid rgba(255,255,255,.08)",

                        borderRadius: "22px",

                        padding: "24px"
                    }}
                >

                    <div
                        style={{
                            color: "#A78BFA",

                            fontSize: "12px",

                            fontWeight: "800",

                            textTransform: "uppercase",

                            letterSpacing: ".05em",

                            marginBottom: "5px"
                        }}
                    >
                        AI Nutrition Insight
                    </div>


                    <h2
                        style={{
                            margin: 0,

                            marginBottom: "18px",

                            fontSize: "24px"
                        }}
                    >
                        🤖 Why NutritionOS Recommends This
                    </h2>


                    <div
                        className="why-grid"
                        style={{
                            display: "grid",

                            gridTemplateColumns:
                                "repeat(2, 1fr)",

                            gap: "10px"
                        }}
                    >

                        {whyRecommended.map(
                            (reason, index) => (

                                <div
                                    key={index}
                                    style={{
                                        background:
                                            "#1B2637",

                                        borderRadius:
                                            "15px",

                                        padding:
                                            "15px"
                                    }}
                                >

                                    <div
                                        style={{
                                            fontWeight:
                                                "800",

                                            fontSize:
                                                "14px",

                                            marginBottom:
                                                "5px"
                                        }}
                                    >
                                        {reason.title ||
                                            "Good Match"}
                                    </div>


                                    <div
                                        style={{
                                            color:
                                                "#94A3B8",

                                            fontSize:
                                                "13px",

                                            lineHeight:
                                                "1.5"
                                        }}
                                    >
                                        {reason.text}
                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </section>

            )}


            {/* =====================================
                    DESCRIPTION + INGREDIENTS
            ===================================== */}

            <div
                className="content-grid"
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "1fr 1fr",

                    gap: "18px",

                    marginTop: "18px"
                }}
            >

                {/* Description */}

                <section
                    style={{
                        background:
                            "#111827",

                        border:
                            "1px solid rgba(255,255,255,.08)",

                        borderRadius: "22px",

                        padding: "24px"
                    }}
                >

                    <h2
                        style={{
                            margin: 0,

                            marginBottom: "12px",

                            fontSize: "21px"
                        }}
                    >
                        📝 About This Meal
                    </h2>


                    <p
                        style={{
                            color: "#94A3B8",

                            lineHeight: "1.7",

                            fontSize: "14px",

                            margin: 0
                        }}
                    >
                        {dish.description ||
                            "A nutritious meal selected from our partner restaurants."}
                    </p>

                </section>


                {/* Ingredients */}

                <section
                    style={{
                        background:
                            "#111827",

                        border:
                            "1px solid rgba(255,255,255,.08)",

                        borderRadius: "22px",

                        padding: "24px"
                    }}
                >

                    <h2
                        style={{
                            margin: 0,

                            marginBottom: "12px",

                            fontSize: "21px"
                        }}
                    >
                        🥗 Ingredients
                    </h2>


                    <p
                        style={{
                            color: "#94A3B8",

                            lineHeight: "1.7",

                            fontSize: "14px",

                            margin: 0
                        }}
                    >
                        {dish.ingredients ||
                            "Ingredient information is not available for this meal."}
                    </p>

                </section>

            </div>


            {/* =====================================
                    PREPARATION / EXTRA INFO
            ===================================== */}

            {(dish.prep_time ||
                dish.spice_level ||
                dish.cuisine) && (

                <section
                    style={{
                        marginTop: "18px",

                        background:
                            "#111827",

                        border:
                            "1px solid rgba(255,255,255,.08)",

                        borderRadius: "22px",

                        padding: "20px 24px"
                    }}
                >

                    <div
                        style={{
                            display: "flex",

                            gap: "12px",

                            flexWrap: "wrap"
                        }}
                    >

                        {dish.cuisine && (

                            <InfoPill
                                label="Cuisine"
                                value={
                                    dish.cuisine
                                }
                            />

                        )}


                        {dish.prep_time && (

                            <InfoPill
                                label="Prep Time"
                                value={
                                    `${dish.prep_time} min`
                                }
                            />

                        )}


                        {dish.spice_level && (

                            <InfoPill
                                label="Spice"
                                value={
                                    dish.spice_level
                                }
                            />

                        )}

                    </div>

                </section>

            )}


            {/* =====================================
                    RESPONSIVE
            ===================================== */}

            <style>
                {`

                    @media (max-width: 850px) {

                        .dish-details-page {

                            padding:
                                20px !important;

                        }


                        .dish-hero {

                            grid-template-columns:
                                1fr !important;

                        }


                        .dish-hero img {

                            height:
                                340px !important;

                        }


                        .content-grid {

                            grid-template-columns:
                                1fr !important;

                        }

                    }


                    @media (max-width: 600px) {

                        .dish-details-page {

                            padding:
                                14px !important;

                        }


                        .dish-hero {

                            padding:
                                12px !important;

                            border-radius:
                                20px !important;

                        }


                        .dish-hero img {

                            height:
                                260px !important;

                        }


                        .dish-hero h1 {

                            font-size:
                                31px !important;

                        }


                        .nutrition-grid {

                            grid-template-columns:
                                repeat(2, 1fr) !important;

                        }


                        .why-grid {

                            grid-template-columns:
                                1fr !important;

                        }

                    }

                `}
            </style>

        </div>

    );

}


// ==========================================================
// Nutrition Item
// ==========================================================

function NutritionItem({
    emoji,
    label,
    value
}) {

    return (

        <div
            style={{
                background:
                    "rgba(255,255,255,.045)",

                border:
                    "1px solid rgba(255,255,255,.05)",

                borderRadius: "13px",

                padding: "11px 12px"
            }}
        >

            <div
                style={{
                    color: "#94A3B8",

                    fontSize: "10px",

                    fontWeight: "700",

                    marginBottom: "3px"
                }}
            >
                {emoji} {label}
            </div>


            <div
                style={{
                    color: "#FFFFFF",

                    fontSize: "14px",

                    fontWeight: "800"
                }}
            >
                {value}
            </div>

        </div>

    );

}


// ==========================================================
// Info Pill
// ==========================================================

function InfoPill({
    label,
    value
}) {

    return (

        <div
            style={{
                background:
                    "#1B2637",

                padding:
                    "8px 12px",

                borderRadius:
                    "999px",

                color:
                    "#CBD5E1",

                fontSize:
                    "12px"
            }}
        >

            <strong>
                {label}:
            </strong>{" "}

            {value}

        </div>

    );

}