import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { logMeal } from "../../services/mealService";
import { getDishImage } from "../../utils/imageHelper";

function getDisplayDishName(name) {
    if (!name) return "Recommended Meal";

    return String(name)
        .replace(/\s+\d{1,4}$/, "")
        .trim();
}

export default function TopAIPicks({
    meals = [],
    onMealLogged
}) {
    const navigate = useNavigate();

    const [loggingMealId, setLoggingMealId] =
        useState(null);

    const [loggedMealId, setLoggedMealId] =
        useState(null);

    if (!meals || meals.length === 0) {
        return null;
    }

    async function handleLogMeal(e, meal) {
        e.stopPropagation();

        const mealId =
            meal.id ||
            meal.dish_id;

        if (!mealId) {
            alert("Meal ID not found.");
            return;
        }

        if (loggingMealId === mealId) {
            return;
        }

        try {
            setLoggingMealId(mealId);

            await logMeal(
                mealId,
                meal.meal_type || "Lunch",
                1
            );

            setLoggedMealId(mealId);

            if (onMealLogged) {
                await onMealLogged();
            }
        } catch (err) {
            console.error(
                "Meal logging error:",
                err
            );

            alert("Unable to log meal.");
        } finally {
            setLoggingMealId(null);
        }
    }

    return (
        <div
            style={{
                marginBottom: "32px",
                width: "100%",
                minWidth: 0,
                boxSizing: "border-box"
            }}
        >
            <div
                className="top-picks-header"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "end",
                    gap: "14px",
                    marginBottom: "20px"
                }}
            >
                <div>
                    <div
                        style={{
                            color: "#A78BFA",
                            fontWeight: "800",
                            fontSize: "13px",
                            letterSpacing: ".7px",
                            textTransform: "uppercase",
                            marginBottom: "6px"
                        }}
                    >
                        ✨ AI Suggestions
                    </div>

                    <h2
                        className="top-picks-title"
                        style={{
                            margin: 0,
                            color: "white",
                            fontSize: "30px",
                            fontWeight: "900",
                            letterSpacing: "-.5px"
                        }}
                    >
                        Similar Meals You May Like
                    </h2>
                </div>

                <div
                    style={{
                        color: "#94A3B8",
                        fontSize: "14px",
                        fontWeight: "700",
                        whiteSpace: "nowrap"
                    }}
                >
                    {meals.length} Recommendations
                </div>
            </div>

            <div
                className="top-picks-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill,minmax(285px,1fr))",
                    gap: "18px",
                    width: "100%",
                    minWidth: 0
                }}
            >
                {meals.map((meal) => {
                    const mealId =
                        meal.id ||
                        meal.dish_id;

                    const dishName =
                        getDisplayDishName(
                            meal.dish_name
                        );

                    const price =
                        meal.price ?? "--";

                    return (
                        <div
                            key={mealId}
                            onClick={() =>
                                navigate(
                                    `/dish/${mealId}`
                                )
                            }
                            style={{
                                background:
                                    "linear-gradient(145deg,#15132A,#111827)",
                                borderRadius: "22px",
                                overflow: "hidden",
                                border:
                                    "1px solid rgba(139,92,246,.18)",
                                cursor: "pointer",
                                transition:
                                    "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
                                display: "flex",
                                flexDirection: "column",
                                minWidth: 0,
                                width: "100%",
                                boxSizing: "border-box"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-5px)";

                                e.currentTarget.style.boxShadow =
                                    "0 20px 45px rgba(0,0,0,.32)";

                                e.currentTarget.style.borderColor =
                                    "rgba(139,92,246,.42)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";

                                e.currentTarget.style.boxShadow =
                                    "none";

                                e.currentTarget.style.borderColor =
                                    "rgba(139,92,246,.18)";
                            }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    overflow: "hidden",
                                    background: "#111827"
                                }}
                            >
                                <img
                                    src={getDishImage(
                                        meal.image_key
                                    )}
                                    alt={dishName}
                                    onError={(e) => {
                                        e.target.src =
                                            "https://placehold.co/600x400?text=NutritionOS";
                                    }}
                                    style={{
                                        width: "100%",
                                        height: "205px",
                                        objectFit: "cover",
                                        display: "block"
                                    }}
                                />

                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background:
                                            "linear-gradient(to top,rgba(0,0,0,.58),rgba(0,0,0,0) 60%)"
                                    }}
                                />

                                <div
                                    style={{
                                        position: "absolute",
                                        top: "12px",
                                        left: "12px",
                                        display: "flex",
                                        gap: "6px",
                                        flexWrap: "wrap",
                                        maxWidth: "72%"
                                    }}
                                >
                                    <span
                                        style={{
                                            background:
                                                "rgba(17,24,39,.88)",
                                            color: "#86EFAC",
                                            border:
                                                "1px solid rgba(134,239,172,.24)",
                                            padding: "6px 9px",
                                            borderRadius: "999px",
                                            fontSize: "11px",
                                            fontWeight: "800",
                                            backdropFilter:
                                                "blur(8px)"
                                        }}
                                    >
                                        ⭐{" "}
                                        {meal.healthy_score ??
                                            "--"}
                                    </span>

                                    <span
                                        style={{
                                            background:
                                                meal.is_veg
                                                    ? "rgba(22,101,52,.88)"
                                                    : "rgba(127,29,29,.88)",
                                            color: "white",
                                            padding: "6px 9px",
                                            borderRadius: "999px",
                                            fontSize: "11px",
                                            fontWeight: "800"
                                        }}
                                    >
                                        {meal.is_veg
                                            ? "🥗 Veg"
                                            : "🍗 Non Veg"}
                                    </span>
                                </div>

                                <div
                                    style={{
                                        position: "absolute",
                                        top: "12px",
                                        right: "12px",
                                        background:
                                            "rgba(6,78,59,.88)",
                                        color: "#86EFAC",
                                        border:
                                            "1px solid rgba(134,239,172,.30)",
                                        padding: "7px 10px",
                                        borderRadius: "999px",
                                        fontWeight: "900",
                                        fontSize: "12px",
                                        whiteSpace: "nowrap",
                                        backdropFilter:
                                            "blur(8px)"
                                    }}
                                >
                                    🎯{" "}
                                    {meal.match_percentage ??
                                        meal.score ??
                                        0}
                                    %
                                </div>
                            </div>

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
                                <div
                                    style={{
                                        color: "#94A3B8",
                                        fontSize: "11px",
                                        fontWeight: "800",
                                        textTransform: "uppercase",
                                        letterSpacing: ".8px"
                                    }}
                                >
                                    {meal.meal_type ||
                                        "Recommended meal"}
                                </div>

                                <h3
                                    style={{
                                        color: "white",
                                        margin: "6px 0 0",
                                        fontSize: "21px",
                                        lineHeight: "1.22",
                                        fontWeight: "900",
                                        minHeight: "52px",
                                        overflowWrap: "anywhere"
                                    }}
                                >
                                    {dishName}
                                </h3>

                                <p
                                    style={{
                                        color: "#94A3B8",
                                        margin:
                                            "8px 0 16px",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        overflowWrap:
                                            "anywhere"
                                    }}
                                >
                                    📍{" "}
                                    {meal.restaurant_name ||
                                        "Restaurant"}
                                </p>

                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "repeat(2,minmax(0,1fr))",
                                        gap: "9px",
                                        minWidth: 0
                                    }}
                                >
                                    <div
                                        style={{
                                            background:
                                                "rgba(255,255,255,.055)",
                                            border:
                                                "1px solid rgba(255,255,255,.07)",
                                            borderRadius: "14px",
                                            padding:
                                                "12px 7px",
                                            textAlign: "center"
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize:
                                                    "17px"
                                            }}
                                        >
                                            🔥
                                        </div>

                                        <div
                                            style={{
                                                marginTop:
                                                    "4px",
                                                color:
                                                    "#FFB84D",
                                                fontWeight:
                                                    "900",
                                                fontSize:
                                                    "17px"
                                            }}
                                        >
                                            {meal.calories ??
                                                0}
                                        </div>

                                        <div
                                            style={{
                                                color:
                                                    "#64748B",
                                                fontSize:
                                                    "10px",
                                                fontWeight:
                                                    "800",
                                                marginTop:
                                                    "3px"
                                            }}
                                        >
                                            KCAL
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            background:
                                                "rgba(255,255,255,.055)",
                                            border:
                                                "1px solid rgba(255,255,255,.07)",
                                            borderRadius: "14px",
                                            padding:
                                                "12px 7px",
                                            textAlign: "center"
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize:
                                                    "17px"
                                            }}
                                        >
                                            💪
                                        </div>

                                        <div
                                            style={{
                                                marginTop:
                                                    "4px",
                                                color:
                                                    "#60A5FA",
                                                fontWeight:
                                                    "900",
                                                fontSize:
                                                    "17px"
                                            }}
                                        >
                                            {meal.protein ??
                                                0}
                                            g
                                        </div>

                                        <div
                                            style={{
                                                color:
                                                    "#64748B",
                                                fontSize:
                                                    "10px",
                                                fontWeight:
                                                    "800",
                                                marginTop:
                                                    "3px"
                                            }}
                                        >
                                            PROTEIN
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            background:
                                                "rgba(250,204,21,.055)",
                                            border:
                                                "1px solid rgba(250,204,21,.18)",
                                            borderRadius: "14px",
                                            padding:
                                                "12px 7px",
                                            textAlign: "center"
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize:
                                                    "17px",
                                                color:
                                                    "#FACC15"
                                            }}
                                        >
                                            ₹
                                        </div>

                                        <div
                                            style={{
                                                marginTop:
                                                    "3px",
                                                color:
                                                    "#FACC15",
                                                fontWeight:
                                                    "900",
                                                fontSize:
                                                    "21px"
                                            }}
                                        >
                                            ₹{price}
                                        </div>

                                        <div
                                            style={{
                                                color:
                                                    "#A16207",
                                                fontSize:
                                                    "10px",
                                                fontWeight:
                                                    "900",
                                                marginTop:
                                                    "2px"
                                            }}
                                        >
                                            PRICE
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            background:
                                                "rgba(255,255,255,.055)",
                                            border:
                                                "1px solid rgba(255,255,255,.07)",
                                            borderRadius: "14px",
                                            padding:
                                                "12px 7px",
                                            textAlign: "center"
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize:
                                                    "17px"
                                            }}
                                        >
                                            ⭐
                                        </div>

                                        <div
                                            style={{
                                                marginTop:
                                                    "4px",
                                                color:
                                                    "#FACC15",
                                                fontWeight:
                                                    "900",
                                                fontSize:
                                                    "17px"
                                            }}
                                        >
                                            {meal.rating ??
                                                "--"}
                                        </div>

                                        <div
                                            style={{
                                                color:
                                                    "#64748B",
                                                fontSize:
                                                    "10px",
                                                fontWeight:
                                                    "800",
                                                marginTop:
                                                    "3px"
                                            }}
                                        >
                                            RATING
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={(e) =>
                                        handleLogMeal(
                                            e,
                                            meal
                                        )
                                    }
                                    disabled={
                                        loggingMealId ===
                                        mealId
                                    }
                                    style={{
                                        marginTop: "17px",
                                        border: "none",
                                        background:
                                            loggedMealId ===
                                            mealId
                                                ? "#15803D"
                                                : "linear-gradient(135deg,#22C55E,#16A34A)",
                                        color: "white",
                                        padding: "13px",
                                        borderRadius: "13px",
                                        cursor:
                                            loggingMealId ===
                                            mealId
                                                ? "wait"
                                                : "pointer",
                                        fontWeight: "900",
                                        fontSize: "14px",
                                        width: "100%",
                                        opacity:
                                            loggingMealId ===
                                            mealId
                                                ? 0.7
                                                : 1,
                                        boxShadow:
                                            "0 8px 18px rgba(34,197,94,.12)"
                                    }}
                                >
                                    {loggingMealId ===
                                    mealId
                                        ? "Logging..."
                                        : loggedMealId ===
                                          mealId
                                        ? "✓ Meal Logged"
                                        : "🍽 Log Meal"}
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        navigate(
                                            `/dish/${mealId}`
                                        );
                                    }}
                                    style={{
                                        marginTop: "9px",
                                        border:
                                            "1px solid rgba(255,255,255,.12)",
                                        background:
                                            "rgba(255,255,255,.035)",
                                        color: "#E2E8F0",
                                        padding: "13px",
                                        borderRadius: "13px",
                                        cursor: "pointer",
                                        fontWeight: "800",
                                        fontSize: "14px",
                                        width: "100%"
                                    }}
                                >
                                    View Details →
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <style>
                {`
                    @media (max-width: 767px) {
                        .top-picks-header {
                            align-items: flex-start !important;
                            flex-direction: column !important;
                        }

                        .top-picks-title {
                            font-size: 24px !important;
                            line-height: 1.25 !important;
                        }

                        .top-picks-grid {
                            grid-template-columns: 1fr !important;
                            gap: 14px !important;
                        }
                    }
                `}
            </style>
        </div>
    );
}