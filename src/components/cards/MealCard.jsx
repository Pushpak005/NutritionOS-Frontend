import Button from "../ui/Button";
import { getDishImage } from "../../utils/imageHelper";

export default function MealCard({
    meal,
    onPrimaryClick,
    primaryText = "View",
    showAIScore = true
}) {

    // ==========================================================
    // SAFE VALUES
    // ==========================================================

    const score = Math.round(
        Number(
            meal?.final_score ??
            meal?.score ??
            meal?.match_percentage ??
            0
        )
    );

    const rating = Number(meal?.rating ?? 0);

    const price = Number(meal?.price ?? 0);

    const calories = Number(meal?.calories ?? 0);

    const protein = Number(meal?.protein ?? 0);

    const carbs = Number(meal?.carbs ?? 0);

    const fat = Number(meal?.fat ?? 0);

    const fiber = Number(meal?.fiber ?? 0);

    const healthyScore = Number(
        meal?.healthy_score ?? 0
    );


    // ==========================================================
    // IMAGE
    // ==========================================================

    const imageKey = meal?.image_key;

    const imageUrl = getDishImage(
        imageKey
    );


    // ==========================================================
    // IMAGE DEBUG
    // ==========================================================

    console.log(
        "=============================="
    );

    console.log(
        "MEAL IMAGE DEBUG"
    );

    console.log(
        "Dish:",
        meal?.dish_name
    );

    console.log(
        "Image Key:",
        imageKey
    );

    console.log(
        "Image URL:",
        imageUrl
    );

    console.log(
        "Full Meal Object:",
        meal
    );

    console.log(
        "=============================="
    );


    // ==========================================================
    // MATCH LABEL
    // ==========================================================

    let matchLabel = "Good Match";

    if (score >= 90) {

        matchLabel = "Excellent Match";

    } else if (score >= 80) {

        matchLabel = "Strong Match";

    }


    // ==========================================================
    // RENDER
    // ==========================================================

    return (

        <div

            style={{

                background:
                    "linear-gradient(145deg, #111827, #151f31)",

                border:
                    "1px solid rgba(139,92,246,.18)",

                borderRadius:
                    "24px",

                marginBottom:
                    "22px",

                color:
                    "white",

                overflow:
                    "hidden",

                boxShadow:
                    "0 10px 35px rgba(0,0,0,.20)",

                transition:
                    "all .25s ease"

            }}

            onMouseEnter={(e) => {

                e.currentTarget.style.transform =
                    "translateY(-4px)";

                e.currentTarget.style.boxShadow =
                    "0 18px 45px rgba(0,0,0,.30)";

                e.currentTarget.style.borderColor =
                    "rgba(139,92,246,.45)";

            }}

            onMouseLeave={(e) => {

                e.currentTarget.style.transform =
                    "translateY(0)";

                e.currentTarget.style.boxShadow =
                    "0 10px 35px rgba(0,0,0,.20)";

                e.currentTarget.style.borderColor =
                    "rgba(139,92,246,.18)";

            }}

        >

            {/* ==================================================
                TOP
            ================================================== */}

            <div

                style={{

                    display:
                        "grid",

                    gridTemplateColumns:
                        "240px 1fr",

                    minHeight:
                        "250px"

                }}

            >

                {/* ==================================================
                    IMAGE
                ================================================== */}

                <div

                    style={{

                        position:
                            "relative",

                        minHeight:
                            "250px",

                        overflow:
                            "hidden",

                        background:
                            "linear-gradient(135deg,#1e293b,#0f172a)"

                    }}

                >

                    <img

                        src={imageUrl}

                        alt={
                            meal?.dish_name ||
                            "Recommended meal"
                        }

                        onLoad={() => {

                            console.log(
                                "✅ IMAGE LOADED:",
                                meal?.dish_name,
                                imageKey,
                                imageUrl
                            );

                        }}

                        onError={(e) => {

                            console.error(
                                "❌ IMAGE LOAD FAILED"
                            );

                            console.error(
                                "Dish:",
                                meal?.dish_name
                            );

                            console.error(
                                "Image Key:",
                                imageKey
                            );

                            console.error(
                                "Image URL:",
                                imageUrl
                            );

                            /*
                             * Important:
                             * Don't keep replacing the image repeatedly.
                             */

                            e.currentTarget.onerror =
                                null;

                            e.currentTarget.src =
                                "https://placehold.co/600x400/1e293b/ffffff?text=NutritionOS";

                        }}

                        style={{

                            width:
                                "100%",

                            height:
                                "100%",

                            objectFit:
                                "cover",

                            display:
                                "block",

                            transition:
                                "transform .4s ease"

                        }}

                        onMouseEnter={(e) => {

                            e.currentTarget.style.transform =
                                "scale(1.06)";

                        }}

                        onMouseLeave={(e) => {

                            e.currentTarget.style.transform =
                                "scale(1)";

                        }}

                    />


                    {/* IMAGE OVERLAY */}

                    <div

                        style={{

                            position:
                                "absolute",

                            inset:
                                0,

                            background:
                                "linear-gradient(to top, rgba(0,0,0,.65), transparent 55%)",

                            pointerEvents:
                                "none"

                        }}

                    />


                    {/* MEAL TYPE */}

                    <div

                        style={{

                            position:
                                "absolute",

                            bottom:
                                "14px",

                            left:
                                "14px",

                            background:
                                "#4f46e5",

                            padding:
                                "7px 12px",

                            borderRadius:
                                "999px",

                            fontSize:
                                "11px",

                            fontWeight:
                                "800",

                            boxShadow:
                                "0 5px 15px rgba(0,0,0,.25)"

                        }}

                    >

                        {meal?.meal_type || "Meal"}

                    </div>


                    {/* VEG STATUS */}

                    <div

                        style={{

                            position:
                                "absolute",

                            top:
                                "14px",

                            right:
                                "14px",

                            background:
                                "rgba(15,23,42,.90)",

                            padding:
                                "7px 11px",

                            borderRadius:
                                "999px",

                            fontSize:
                                "10px",

                            fontWeight:
                                "700",

                            backdropFilter:
                                "blur(8px)"

                        }}

                    >

                        <span

                            style={{

                                display:
                                    "inline-block",

                                width:
                                    "7px",

                                height:
                                    "7px",

                                borderRadius:
                                    "50%",

                                background:
                                    meal?.is_veg
                                        ? "#22c55e"
                                        : "#ef4444",

                                marginRight:
                                    "6px"

                            }}

                        />

                        {meal?.is_veg
                            ? "Veg"
                            : "Non-Veg"
                        }

                    </div>

                </div>


                {/* ==================================================
                    DETAILS
                ================================================== */}

                <div

                    style={{

                        padding:
                            "24px",

                        display:
                            "flex",

                        flexDirection:
                            "column",

                        minWidth:
                            0

                    }}

                >

                    {/* AI MATCH */}

                    {
                        showAIScore &&
                        score > 0 && (

                            <div

                                style={{

                                    display:
                                        "inline-flex",

                                    alignItems:
                                        "center",

                                    gap:
                                        "7px",

                                    alignSelf:
                                        "flex-start",

                                    background:
                                        "linear-gradient(135deg,#8b5cf6,#6366f1)",

                                    padding:
                                        "8px 13px",

                                    borderRadius:
                                        "999px",

                                    marginBottom:
                                        "14px",

                                    fontSize:
                                        "12px",

                                    fontWeight:
                                        "800",

                                    boxShadow:
                                        "0 6px 18px rgba(99,102,241,.25)"

                                }}

                            >

                                ✨

                                AI Match {score}%

                            </div>

                        )
                    }


                    {/* DISH NAME */}

                    <h2

                        style={{

                            margin:
                                "0 0 8px",

                            fontSize:
                                "26px",

                            lineHeight:
                                "1.15",

                            letterSpacing:
                                "-.4px"

                        }}

                    >

                        {meal?.dish_name}

                    </h2>


                    {/* RESTAURANT */}

                    <div

                        style={{

                            display:
                                "flex",

                            alignItems:
                                "center",

                            gap:
                                "7px",

                            color:
                                "#94a3b8",

                            fontSize:
                                "13px",

                            marginBottom:
                                "16px",

                            flexWrap:
                                "wrap"

                        }}

                    >

                        <span>
                            📍
                        </span>

                        <span>

                            {
                                meal?.restaurant_name ||
                                meal?.restaurant ||
                                "Partner Restaurant"
                            }

                        </span>

                        {
                            meal?.area && (

                                <>

                                    <span
                                        style={{
                                            color:
                                                "#475569"
                                        }}
                                    >
                                        •
                                    </span>

                                    <span>
                                        {meal.area}
                                    </span>

                                </>

                            )
                        }

                    </div>


                    {/* RESTAURANT META */}

                    <div

                        style={{

                            display:
                                "flex",

                            gap:
                                "10px",

                            flexWrap:
                                "wrap",

                            marginBottom:
                                "18px"

                        }}

                    >

                        {
                            rating > 0 && (

                                <span

                                    style={{

                                        background:
                                            "rgba(245,158,11,.10)",

                                        border:
                                            "1px solid rgba(245,158,11,.18)",

                                        color:
                                            "#fbbf24",

                                        padding:
                                            "6px 10px",

                                        borderRadius:
                                            "999px",

                                        fontSize:
                                            "11px",

                                        fontWeight:
                                            "700"

                                    }}

                                >

                                    ⭐ {rating.toFixed(1)}

                                </span>

                            )
                        }


                        {
                            meal?.delivery_time && (

                                <span

                                    style={{

                                        background:
                                            "rgba(59,130,246,.10)",

                                        border:
                                            "1px solid rgba(59,130,246,.15)",

                                        color:
                                            "#93c5fd",

                                        padding:
                                            "6px 10px",

                                        borderRadius:
                                            "999px",

                                        fontSize:
                                            "11px",

                                        fontWeight:
                                            "700"

                                    }}

                                >

                                    🚴 {meal.delivery_time} min

                                </span>

                            )
                        }


                        {
                            healthyScore > 0 && (

                                <span

                                    style={{

                                        background:
                                            "rgba(34,197,94,.10)",

                                        border:
                                            "1px solid rgba(34,197,94,.15)",

                                        color:
                                            "#86efac",

                                        padding:
                                            "6px 10px",

                                        borderRadius:
                                            "999px",

                                        fontSize:
                                            "11px",

                                        fontWeight:
                                            "700"

                                    }}

                                >

                                    ❤️ Healthy {healthyScore}

                                </span>

                            )
                        }

                    </div>


                    {/* MATCH */}

                    <div

                        style={{

                            display:
                                "flex",

                            alignItems:
                                "center",

                            gap:
                                "8px",

                            color:
                                "#c4b5fd",

                            fontSize:
                                "12px",

                            fontWeight:
                                "700"

                        }}

                    >

                        🎯

                        {matchLabel}

                    </div>

                </div>

            </div>


            {/* ==================================================
                NUTRITION
            ================================================== */}

            <div

                style={{

                    margin:
                        "0 24px",

                    padding:
                        "14px",

                    borderRadius:
                        "16px",

                    background:
                        "#1e293b",

                    border:
                        "1px solid rgba(255,255,255,.05)",

                    display:
                        "grid",

                    gridTemplateColumns:
                        "repeat(5,1fr)",

                    gap:
                        "8px"

                }}

            >

                <NutritionItem
                    icon="🔥"
                    value={calories}
                    label="kcal"
                />

                <NutritionItem
                    icon="💪"
                    value={`${protein}g`}
                    label="protein"
                />

                <NutritionItem
                    icon="🍚"
                    value={`${carbs}g`}
                    label="carbs"
                />

                <NutritionItem
                    icon="🥑"
                    value={`${fat}g`}
                    label="fat"
                />

                <NutritionItem
                    icon="🌿"
                    value={`${fiber}g`}
                    label="fiber"
                />

            </div>


            {/* ==================================================
                AI EXPLANATION
            ================================================== */}

            {
                (
                    meal?.ai_explanation ||
                    meal?.goal_match_label
                ) && (

                    <div

                        style={{

                            margin:
                                "16px 24px 0",

                            padding:
                                "14px 16px",

                            borderRadius:
                                "16px",

                            background:
                                "linear-gradient(135deg,rgba(124,58,237,.12),rgba(99,102,241,.06))",

                            border:
                                "1px solid rgba(139,92,246,.16)",

                            display:
                                "flex",

                            gap:
                                "10px",

                            alignItems:
                                "flex-start"

                        }}

                    >

                        <div

                            style={{

                                width:
                                    "30px",

                                height:
                                    "30px",

                                flexShrink:
                                    0,

                                display:
                                    "flex",

                                alignItems:
                                    "center",

                                justifyContent:
                                    "center",

                                borderRadius:
                                    "9px",

                                background:
                                    "rgba(139,92,246,.15)"

                            }}

                        >

                            🧠

                        </div>


                        <div>

                            <div

                                style={{

                                    color:
                                        "#c4b5fd",

                                    fontSize:
                                        "10px",

                                    fontWeight:
                                        "800",

                                    textTransform:
                                        "uppercase",

                                    letterSpacing:
                                        ".7px",

                                    marginBottom:
                                        "4px"

                                }}

                            >

                                Why AI picked this

                            </div>


                            <div

                                style={{

                                    color:
                                        "#cbd5e1",

                                    fontSize:
                                        "12px",

                                    lineHeight:
                                        "1.5"

                                }}

                            >

                                {
                                    meal?.ai_explanation ||
                                    meal?.goal_match_label
                                }

                            </div>

                        </div>

                    </div>

                )
            }


            {/* ==================================================
                FOOTER
            ================================================== */}

            <div

                style={{

                    display:
                        "flex",

                    alignItems:
                        "center",

                    justifyContent:
                        "space-between",

                    gap:
                        "15px",

                    padding:
                        "18px 24px 22px"

                }}

            >

                {/* PRICE */}

                <div>

                    {
                        price > 0 && (

                            <>

                                <div

                                    style={{

                                        color:
                                            "#64748b",

                                        fontSize:
                                            "10px",

                                        marginBottom:
                                            "2px"

                                    }}

                                >

                                    Starting from

                                </div>

                                <strong

                                    style={{

                                        fontSize:
                                            "23px",

                                        color:
                                            "white"

                                    }}

                                >

                                    ₹{price}

                                </strong>

                            </>

                        )
                    }

                </div>


                {/* BUTTON */}

                {
                    onPrimaryClick && (

                        <div

                            style={{

                                minWidth:
                                    "180px"

                            }}

                        >

                            <Button

                                onClick={() =>
                                    onPrimaryClick(meal)
                                }

                            >

                                {primaryText}

                            </Button>

                        </div>

                    )
                }

            </div>


            {/* ==================================================
                RESPONSIVE
            ================================================== */}

            <style>

                {`

                    @media (max-width: 800px) {

                        .meal-card-top {
                            grid-template-columns: 1fr !important;
                        }

                    }

                    @media (max-width: 600px) {

                        .meal-card-nutrition {
                            grid-template-columns:
                                repeat(2, 1fr) !important;
                        }

                    }

                `}

            </style>

        </div>

    );
}


/* ==============================================================
   NUTRITION ITEM
============================================================== */

function NutritionItem({
    icon,
    value,
    label
}) {

    return (

        <div

            style={{

                display:
                    "flex",

                alignItems:
                    "center",

                gap:
                    "7px",

                minWidth:
                    0

            }}

        >

            <span

                style={{

                    fontSize:
                        "15px"

                }}

            >

                {icon}

            </span>


            <div>

                <div

                    style={{

                        color:
                            "#f8fafc",

                        fontSize:
                            "12px",

                        fontWeight:
                            "800"

                    }}

                >

                    {value}

                </div>


                <div

                    style={{

                        color:
                            "#64748b",

                        fontSize:
                            "8px",

                        marginTop:
                            "2px"

                    }}

                >

                    {label}

                </div>

            </div>

        </div>

    );

}