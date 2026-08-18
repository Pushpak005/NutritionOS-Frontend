import { useNavigate } from "react-router-dom";
import { logMeal } from "../../services/mealService";
import { getDishImage } from "../../utils/imageHelper";

function getDisplayDishName(name) {
    if (!name) return "Recommended Meal";

    return String(name)
        .replace(/\s+\d{1,4}$/, "")
        .trim();
}

export default function TodayAIPickCard({
    meal,
    onMealLogged,
    nutritionComplete = false
}) {
    const navigate = useNavigate();

    if (!meal && nutritionComplete) {
        return (
            <div
                style={{
                    background:
                        "linear-gradient(135deg,#211A4A 0%,#312E81 55%,#4C1D95 100%)",
                    borderRadius: "28px",
                    padding: "36px",
                    marginBottom: "32px",
                    color: "white",
                    textAlign: "center",
                    boxShadow: "0 24px 60px rgba(0,0,0,.30)",
                    border: "1px solid rgba(139,92,246,.35)"
                }}
            >
                <div
                    style={{
                        fontSize: "46px",
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
                        margin: "12px auto 0",
                        color: "#C7D2FE",
                        fontSize: "16px",
                        lineHeight: "1.6",
                        maxWidth: "700px"
                    }}
                >
                    You've essentially met your calorie and protein
                    targets for today. No additional full meal is needed
                    right now.
                </p>
            </div>
        );
    }

    if (!meal) {
        return null;
    }

    const mealId = meal.id || meal.dish_id;

    const restaurant =
        meal.restaurant_name ||
        meal.restaurant ||
        "Restaurant";

    const match =
        meal.match_percentage ??
        meal.score ??
        0;

    const dishName = getDisplayDishName(meal.dish_name);

    async function handleLogMeal() {
        if (!mealId) {
            alert("Meal ID not found.");
            return;
        }

        try {
            await logMeal(
                mealId,
                meal.meal_type || "Lunch",
                1
            );

            alert("✅ Meal Logged");

            if (onMealLogged) {
                await onMealLogged();
            }
        } catch (err) {
            console.error(
                "Meal logging error:",
                err
            );

            alert("Unable to log meal.");
        }
    }

    const metrics = [
        {
            icon: "🔥",
            value: `${meal.calories ?? 0}`,
            label: "KCAL",
            accent: "#FF9F1C"
        },
        {
            icon: "💪",
            value: `${meal.protein ?? 0}g`,
            label: "PROTEIN",
            accent: "#60A5FA"
        },
        {
            icon: "₹",
            value: `₹${meal.price ?? "--"}`,
            label: "PRICE",
            accent: "#FACC15",
            important: true
        },
        {
            icon: "★",
            value: meal.rating ?? "--",
            label: "RATING",
            accent: "#FACC15"
        }
    ];

    return (
        <div
            style={{
                position: "relative",
                background:
                    "linear-gradient(145deg,#17142D 0%,#1E1B4B 45%,#111827 100%)",
                borderRadius: "28px",
                padding: "20px",
                marginBottom: "32px",
                color: "white",
                boxShadow:
                    "0 24px 60px rgba(0,0,0,.34)",
                border:
                    "1px solid rgba(139,92,246,.28)",
                width: "100%",
                boxSizing: "border-box",
                overflow: "hidden"
            }}
        >
            <div
                style={{
                    position: "absolute",
                    width: "240px",
                    height: "240px",
                    borderRadius: "50%",
                    background:
                        "rgba(124,58,237,.14)",
                    filter: "blur(50px)",
                    top: "-120px",
                    right: "-70px",
                    pointerEvents: "none"
                }}
            />

            <div
                className="today-pick-header"
                style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                    padding: "6px 4px 18px"
                }}
            >
                <div>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "7px",
                            background:
                                "rgba(255,255,255,.08)",
                            border:
                                "1px solid rgba(255,255,255,.10)",
                            padding: "7px 12px",
                            borderRadius: "999px",
                            fontSize: "12px",
                            fontWeight: "800",
                            letterSpacing: ".4px"
                        }}
                    >
                        ✨ AI PICK
                    </div>

                    <div
                        style={{
                            marginTop: "10px",
                            color: "#A5B4FC",
                            fontSize: "13px",
                            fontWeight: "700"
                        }}
                    >
                        Personalized for your nutrition profile
                    </div>
                </div>

                <div
                    style={{
                        background:
                            "linear-gradient(135deg,#064E3B,#166534)",
                        color: "#86EFAC",
                        border:
                            "1px solid rgba(134,239,172,.30)",
                        padding: "10px 15px",
                        borderRadius: "999px",
                        fontWeight: "800",
                        fontSize: "15px",
                        whiteSpace: "nowrap",
                        boxShadow:
                            "0 8px 20px rgba(34,197,94,.12)"
                    }}
                >
                    🎯 {match}% match
                </div>
            </div>

            <div
                className="today-pick-main"
                style={{
                    position: "relative",
                    display: "grid",
                    gridTemplateColumns:
                        "minmax(280px,42%) minmax(0,1fr)",
                    gap: "24px",
                    alignItems: "stretch"
                }}
            >
                <div
                    style={{
                        position: "relative",
                        minWidth: 0,
                        minHeight: "290px",
                        borderRadius: "22px",
                        overflow: "hidden",
                        background: "#111827",
                        boxShadow:
                            "0 16px 35px rgba(0,0,0,.30)"
                    }}
                >
                    <img
                        src={getDishImage(meal.image_key)}
                        alt={dishName}
                        onError={(e) => {
                            e.target.src =
                                "https://placehold.co/800x600?text=NutritionOS";
                        }}
                        style={{
                            width: "100%",
                            height: "100%",
                            minHeight: "290px",
                            objectFit: "cover",
                            display: "block"
                        }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(to top,rgba(0,0,0,.72),rgba(0,0,0,0) 55%)"
                        }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            left: "18px",
                            bottom: "16px",
                            right: "18px"
                        }}
                    >
                        <div
                            style={{
                                color: "#CBD5E1",
                                fontSize: "13px",
                                fontWeight: "700",
                                marginBottom: "5px"
                            }}
                        >
                            {meal.meal_type || "Meal"}
                        </div>

                        <div
                            style={{
                                fontSize: "25px",
                                lineHeight: "1.15",
                                fontWeight: "900",
                                textShadow:
                                    "0 3px 15px rgba(0,0,0,.6)"
                            }}
                        >
                            {dishName}
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        minWidth: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}
                >
                    <div
                        style={{
                            color: "#94A3B8",
                            fontSize: "13px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "1px"
                        }}
                    >
                        Recommended dish
                    </div>

                    <h1
                        className="today-pick-dish-name"
                        style={{
                            margin: "7px 0 0",
                            fontSize: "34px",
                            lineHeight: "1.08",
                            fontWeight: "900",
                            letterSpacing: "-.7px",
                            overflowWrap: "anywhere"
                        }}
                    >
                        {dishName}
                    </h1>

                    <div
                        style={{
                            marginTop: "10px",
                            color: "#CBD5E1",
                            fontSize: "16px",
                            fontWeight: "600"
                        }}
                    >
                        📍 {restaurant}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "9px",
                            marginTop: "17px",
                            flexWrap: "wrap"
                        }}
                    >
                        <span
                            style={{
                                background:
                                    "rgba(34,197,94,.14)",
                                color: "#86EFAC",
                                border:
                                    "1px solid rgba(34,197,94,.25)",
                                padding: "7px 11px",
                                borderRadius: "999px",
                                fontWeight: "800",
                                fontSize: "12px"
                            }}
                        >
                            ⭐ Healthy {meal.healthy_score ?? "--"}
                        </span>

                        <span
                            style={{
                                background:
                                    meal.is_veg
                                        ? "rgba(34,197,94,.12)"
                                        : "rgba(239,68,68,.12)",
                                color:
                                    meal.is_veg
                                        ? "#86EFAC"
                                        : "#FCA5A5",
                                border:
                                    meal.is_veg
                                        ? "1px solid rgba(34,197,94,.24)"
                                        : "1px solid rgba(239,68,68,.24)",
                                padding: "7px 11px",
                                borderRadius: "999px",
                                fontWeight: "800",
                                fontSize: "12px"
                            }}
                        >
                            {meal.is_veg
                                ? "🥗 Veg"
                                : "🍗 Non Veg"}
                        </span>
                    </div>

                    <div
                        className="today-pick-metrics"
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(4,minmax(0,1fr))",
                            gap: "10px",
                            marginTop: "20px"
                        }}
                    >
                        {metrics.map((item) => (
                            <div
                                key={item.label}
                                style={{
                                    background:
                                        "rgba(255,255,255,.055)",
                                    border:
                                        item.important
                                            ? "1px solid rgba(250,204,21,.24)"
                                            : "1px solid rgba(255,255,255,.08)",
                                    borderRadius: "15px",
                                    padding: "13px 8px",
                                    textAlign: "center",
                                    minWidth: 0,
                                    boxSizing: "border-box"
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "18px",
                                        color: item.accent
                                    }}
                                >
                                    {item.icon}
                                </div>

                                <div
                                    style={{
                                        marginTop: "5px",
                                        fontSize:
                                            item.important
                                                ? "23px"
                                                : "18px",
                                        lineHeight: "1.1",
                                        fontWeight:
                                            item.important
                                                ? "900"
                                                : "800",
                                        color:
                                            item.accent,
                                        overflowWrap:
                                            "anywhere"
                                    }}
                                >
                                    {item.value}
                                </div>

                                <div
                                    style={{
                                        marginTop: "5px",
                                        color: "#94A3B8",
                                        fontSize: "10px",
                                        fontWeight: "800",
                                        letterSpacing: ".7px"
                                    }}
                                >
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div
                style={{
                    marginTop: "22px",
                    background:
                        "rgba(99,102,241,.10)",
                    border:
                        "1px solid rgba(129,140,248,.18)",
                    borderRadius: "18px",
                    padding: "18px 20px"
                }}
            >
                <div
                    style={{
                        color: "#C4B5FD",
                        fontSize: "13px",
                        fontWeight: "800",
                        marginBottom: "10px"
                    }}
                >
                    🧠 WHY AI RECOMMENDED THIS
                </div>

                <div
                    style={{
                        color: "#E2E8F0",
                        fontSize: "14px",
                        lineHeight: "1.7",
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(2,minmax(0,1fr))",
                        gap: "6px 24px"
                    }}
                >
                    <div>• {match}% match with your nutrition profile</div>
                    <div>
                        • Optimized for{" "}
                        <strong>
                            {meal.meal_type || "your meal"}
                        </strong>
                    </div>
                    <div>• High protein for your goal</div>
                    <div>• Fits within your daily budget</div>
                </div>
            </div>

            <div
                className="today-pick-buttons"
                style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "18px"
                }}
            >
                <button
                    onClick={handleLogMeal}
                    style={{
                        flex: 1,
                        padding: "15px",
                        background:
                            "linear-gradient(135deg,#22C55E,#16A34A)",
                        color: "white",
                        border: "none",
                        borderRadius: "14px",
                        fontWeight: "900",
                        cursor: "pointer",
                        fontSize: "15px",
                        boxShadow:
                            "0 10px 24px rgba(34,197,94,.18)"
                    }}
                >
                    🍽 Log Meal
                </button>

                <button
                    onClick={() =>
                        navigate(`/dish/${mealId}`)
                    }
                    style={{
                        flex: 1,
                        padding: "15px",
                        background:
                            "rgba(255,255,255,.06)",
                        color: "white",
                        border:
                            "1px solid rgba(255,255,255,.15)",
                        borderRadius: "14px",
                        fontWeight: "800",
                        cursor: "pointer",
                        fontSize: "15px"
                    }}
                >
                    View Details →
                </button>
            </div>

            <style>
                {`
                    @media (max-width: 900px) {
                        .today-pick-main {
                            grid-template-columns: 1fr !important;
                        }

                        .today-pick-main > div:first-child {
                            min-height: 260px !important;
                        }

                        .today-pick-main img {
                            min-height: 260px !important;
                        }
                    }

                    @media (max-width: 767px) {
                        .today-pick-header {
                            flex-direction: column !important;
                            align-items: flex-start !important;
                        }

                        .today-pick-main {
                            grid-template-columns: 1fr !important;
                        }

                        .today-pick-dish-name {
                            font-size: 28px !important;
                        }

                        .today-pick-metrics {
                            grid-template-columns:
                                repeat(2,minmax(0,1fr)) !important;
                        }

                        .today-pick-buttons {
                            flex-direction: column !important;
                        }

                        .today-pick-buttons button {
                            width: 100% !important;
                        }
                    }
                `}
            </style>
        </div>
    );
}