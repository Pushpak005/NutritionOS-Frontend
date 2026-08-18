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
                width: "100%",
                minWidth: 0,
                marginBottom: "40px",
                boxSizing: "border-box"
            }}
        >
            {/* SECTION HEADER */}
            <div
                className="top-picks-header"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    gap: "16px",
                    marginBottom: "22px"
                }}
            >
                <div>
                    <div
                        style={{
                            color: "#A78BFA",
                            fontWeight: "900",
                            fontSize: "13px",
                            letterSpacing: ".8px",
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
                            lineHeight: "1.15",
                            fontWeight: "950",
                            letterSpacing: "-.6px"
                        }}
                    >
                        Similar Meals You May Like
                    </h2>

                    <p
                        style={{
                            margin: "7px 0 0",
                            color: "#64748B",
                            fontSize: "14px",
                            fontWeight: "600"
                        }}
                    >
                        Other meals that fit your current nutrition profile
                    </p>
                </div>

                <div
                    style={{
                        color: "#94A3B8",
                        fontSize: "14px",
                        fontWeight: "800",
                        whiteSpace: "nowrap"
                    }}
                >
                    {meals.length} Recommendations
                </div>
            </div>

            {/* CARDS GRID */}
            <div
                className="top-picks-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill,minmax(285px,1fr))",
                    gap: "20px",
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
                        meal.price !== null &&
                        meal.price !== undefined &&
                        meal.price !== ""
                            ? `₹${meal.price}`
                            : "₹--";

                    const match =
                        meal.match_percentage ??
                        meal.score ??
                        0;

                    return (
                        <div
                            key={mealId}
                            className="top-ai-pick-card"
                            onClick={() =>
                                navigate(
                                    `/dish/${mealId}`
                                )
                            }
                            style={{
                                position: "relative",
                                background:
                                    "linear-gradient(145deg,#17142D 0%,#1E1B4B 55%,#111827 100%)",
                                borderRadius: "22px",
                                overflow: "hidden",
                                border:
                                    "1px solid rgba(139,92,246,.20)",
                                cursor: "pointer",
                                transition:
                                    "transform .22s ease, box-shadow .22s ease, border-color .22s ease",
                                display: "flex",
                                flexDirection: "column",
                                minWidth: 0,
                                width: "100%",
                                boxSizing: "border-box",
                                boxShadow:
                                    "0 12px 30px rgba(0,0,0,.18)"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-5px)";

                                e.currentTarget.style.boxShadow =
                                    "0 24px 50px rgba(0,0,0,.34)";

                                e.currentTarget.style.borderColor =
                                    "rgba(139,92,246,.48)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";

                                e.currentTarget.style.boxShadow =
                                    "0 12px 30px rgba(0,0,0,.18)";

                                e.currentTarget.style.borderColor =
                                    "rgba(139,92,246,.20)";
                            }}
                        >
                            {/* IMAGE */}
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "205px",
                                    overflow: "hidden",
                                    background: "#111827",
                                    flexShrink: 0
                                }}
                            >
                                <img
                                    src={getDishImage(
                                        meal.image_key
                                    )}
                                    alt={dishName}
                                    onError={(e) => {
                                        e.currentTarget.style.opacity =
                                            "0";
                                    }}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                        transition:
                                            "transform .35s ease"
                                    }}
                                />

                                {/* IMAGE OVERLAY */}
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background:
                                            "linear-gradient(to top,rgba(8,8,20,.78),rgba(8,8,20,0) 62%)",
                                        pointerEvents: "none"
                                    }}
                                />

                                {/* TOP BADGES */}
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
                                                "rgba(17,24,39,.90)",
                                            color: "#86EFAC",
                                            border:
                                                "1px solid rgba(134,239,172,.25)",
                                            padding: "6px 9px",
                                            borderRadius: "999px",
                                            fontSize: "11px",
                                            fontWeight: "900",
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
                                                    ? "rgba(22,101,52,.90)"
                                                    : "rgba(127,29,29,.90)",
                                            color: "white",
                                            padding: "6px 9px",
                                            borderRadius: "999px",
                                            fontSize: "11px",
                                            fontWeight: "900"
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
                                            "rgba(6,78,59,.92)",
                                        color: "#86EFAC",
                                        border:
                                            "1px solid rgba(134,239,172,.32)",
                                        padding: "7px 10px",
                                        borderRadius: "999px",
                                        fontWeight: "950",
                                        fontSize: "12px",
                                        whiteSpace: "nowrap",
                                        backdropFilter:
                                            "blur(8px)"
                                    }}
                                >
                                    🎯 {match}% match
                                </div>
                            </div>

                            {/* CONTENT */}
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
                                {/* MEAL TYPE */}
                                <div
                                    style={{
                                        color: "#A5B4FC",
                                        fontSize: "10px",
                                        fontWeight: "900",
                                        textTransform: "uppercase",
                                        letterSpacing: "1px"
                                    }}
                                >
                                    {meal.meal_type ||
                                        "Recommended meal"}
                                </div>

                                {/* DISH NAME + PRICE */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent:
                                            "space-between",
                                        gap: "10px",
                                        marginTop: "6px",
                                        minWidth: 0
                                    }}
                                >
                                    <h3
                                        style={{
                                            color: "white",
                                            margin: 0,
                                            fontSize: "21px",
                                            lineHeight: "1.18",
                                            fontWeight: "950",
                                            letterSpacing: "-.3px",
                                            minWidth: 0,
                                            flex: 1,
                                            overflowWrap:
                                                "break-word",
                                            wordBreak:
                                                "normal"
                                        }}
                                    >
                                        {dishName}
                                    </h3>

                                    {/* STRONG PRICE */}
                                    <div
                                        style={{
                                            flexShrink: 0,
                                            background:
                                                "linear-gradient(135deg,rgba(250,204,21,.18),rgba(234,179,8,.08))",
                                            border:
                                                "1px solid rgba(250,204,21,.40)",
                                            color: "#FDE047",
                                            padding: "7px 9px",
                                            borderRadius: "10px",
                                            fontSize: "17px",
                                            lineHeight: "1",
                                            fontWeight: "950",
                                            whiteSpace:
                                                "nowrap",
                                            boxShadow:
                                                "0 7px 18px rgba(250,204,21,.08)"
                                        }}
                                    >
                                        {price}
                                    </div>
                                </div>

                                {/* RESTAURANT */}
                                <div
                                    style={{
                                        color: "#94A3B8",
                                        marginTop: "9px",
                                        fontSize: "13px",
                                        fontWeight: "700",
                                        minHeight: "20px",
                                        overflowWrap:
                                            "anywhere"
                                    }}
                                >
                                    📍{" "}
                                    {meal.restaurant_name ||
                                        "Restaurant"}
                                </div>

                                {/* METRICS */}
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "repeat(3,minmax(0,1fr))",
                                        gap: "8px",
                                        marginTop: "16px",
                                        minWidth: 0
                                    }}
                                >
                                    {/* CALORIES */}
                                    <div
                                        style={{
                                            background:
                                                "rgba(255,255,255,.055)",
                                            border:
                                                "1px solid rgba(255,255,255,.08)",
                                            borderRadius: "13px",
                                            padding:
                                                "11px 5px",
                                            textAlign: "center",
                                            minWidth: 0
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize:
                                                    "16px"
                                            }}
                                        >
                                            🔥
                                        </div>

                                        <div
                                            style={{
                                                marginTop:
                                                    "3px",
                                                color:
                                                    "#FFB84D",
                                                fontWeight:
                                                    "950",
                                                fontSize:
                                                    "17px",
                                                lineHeight:
                                                    "1.1",
                                                whiteSpace:
                                                    "nowrap"
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
                                                    "9px",
                                                fontWeight:
                                                    "900",
                                                marginTop:
                                                    "4px",
                                                letterSpacing:
                                                    ".5px"
                                            }}
                                        >
                                            KCAL
                                        </div>
                                    </div>

                                    {/* PROTEIN */}
                                    <div
                                        style={{
                                            background:
                                                "rgba(255,255,255,.055)",
                                            border:
                                                "1px solid rgba(255,255,255,.08)",
                                            borderRadius: "13px",
                                            padding:
                                                "11px 5px",
                                            textAlign: "center",
                                            minWidth: 0
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize:
                                                    "16px"
                                            }}
                                        >
                                            💪
                                        </div>

                                        <div
                                            style={{
                                                marginTop:
                                                    "3px",
                                                color:
                                                    "#60A5FA",
                                                fontWeight:
                                                    "950",
                                                fontSize:
                                                    "17px",
                                                lineHeight:
                                                    "1.1",
                                                whiteSpace:
                                                    "nowrap"
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
                                                    "9px",
                                                fontWeight:
                                                    "900",
                                                marginTop:
                                                    "4px",
                                                letterSpacing:
                                                    ".5px"
                                            }}
                                        >
                                            PROTEIN
                                        </div>
                                    </div>

                                    {/* RATING */}
                                    <div
                                        style={{
                                            background:
                                                "rgba(255,255,255,.055)",
                                            border:
                                                "1px solid rgba(255,255,255,.08)",
                                            borderRadius: "13px",
                                            padding:
                                                "11px 5px",
                                            textAlign: "center",
                                            minWidth: 0
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize:
                                                    "16px"
                                            }}
                                        >
                                            ⭐
                                        </div>

                                        <div
                                            style={{
                                                marginTop:
                                                    "3px",
                                                color:
                                                    "#FACC15",
                                                fontWeight:
                                                    "950",
                                                fontSize:
                                                    "17px",
                                                lineHeight:
                                                    "1.1",
                                                whiteSpace:
                                                    "nowrap"
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
                                                    "9px",
                                                fontWeight:
                                                    "900",
                                                marginTop:
                                                    "4px",
                                                letterSpacing:
                                                    ".5px"
                                            }}
                                        >
                                            RATING
                                        </div>
                                    </div>
                                </div>

                                {/* ACTIONS */}
                                <div
                                    style={{
                                        marginTop: "16px"
                                    }}
                                >
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
                                            width: "100%",
                                            border: "none",
                                            background:
                                                loggedMealId ===
                                                mealId
                                                    ? "#15803D"
                                                    : "linear-gradient(135deg,#22C55E,#16A34A)",
                                            color: "white",
                                            padding: "12px",
                                            borderRadius:
                                                "12px",
                                            cursor:
                                                loggingMealId ===
                                                mealId
                                                    ? "wait"
                                                    : "pointer",
                                            fontWeight: "950",
                                            fontSize: "13px",
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
                                            width: "100%",
                                            marginTop: "8px",
                                            border:
                                                "1px solid rgba(255,255,255,.12)",
                                            background:
                                                "rgba(255,255,255,.035)",
                                            color:
                                                "#E2E8F0",
                                            padding: "12px",
                                            borderRadius:
                                                "12px",
                                            cursor: "pointer",
                                            fontWeight: "900",
                                            fontSize: "13px"
                                        }}
                                    >
                                        🔍 View Details →
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* RESPONSIVE */}
            <style>
                {`
                    @media (max-width: 900px) {
                        .top-picks-grid {
                            grid-template-columns:
                                repeat(2,minmax(0,1fr)) !important;
                        }
                    }

                    @media (max-width: 600px) {
                        .top-picks-header {
                            align-items: flex-start !important;
                            flex-direction: column !important;
                        }

                        .top-picks-title {
                            font-size: 25px !important;
                        }

                        .top-picks-grid {
                            grid-template-columns:
                                1fr !important;
                        }
                    }
                `}
            </style>
        </div>
    );
}