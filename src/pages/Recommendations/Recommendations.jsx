import { useState } from "react";

import MealCard from "../../components/cards/MealCard";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

import { getRecommendations } from "../../services/recommendationService";
import { logMeal } from "../../services/mealService";

export default function Recommendations() {

    // ==========================================================
    // FILTER STATE
    // ==========================================================

    const [goal, setGoal] = useState("Muscle Gain");

    const [diet, setDiet] = useState("Veg");

    const [budget, setBudget] = useState(500);


    // ==========================================================
    // PAGE STATE
    // ==========================================================

    const [loading, setLoading] = useState(false);

    const [meals, setMeals] = useState([]);


    // ==========================================================
    // LOAD AI RECOMMENDATIONS
    // ==========================================================

    async function loadRecommendations() {

        try {

            setLoading(true);

            const data = await getRecommendations({

                goal,

                diet,

                budget: Number(budget)

            });


            setMeals(

                data?.recommended_dishes
                || data?.recommendations
                || []

            );

        }

        catch (err) {

            console.error(
                "Recommendation loading error:",
                err
            );

            alert(
                "Unable to fetch recommendations."
            );

        }

        finally {

            setLoading(false);

        }

    }


    // ==========================================================
    // LOG MEAL
    // ==========================================================

    async function handleLogMeal(meal) {

        try {

            await logMeal(

                meal.id,

                meal.meal_type || "Lunch",

                1

            );

            alert(
                "✅ Meal Logged Successfully"
            );

        }

        catch (err) {

            console.error(
                "Meal logging error:",
                err
            );

            alert(
                "❌ Failed to Log Meal"
            );

        }

    }


    // ==========================================================
    // PAGE
    // ==========================================================

    return (

        <div
            className="recommendations-page"
        >

            {/* ==================================================
                HERO HEADER
            ================================================== */}

            <section
                className="recommendations-hero"
            >

                <div
                    className="hero-content"
                >

                    <div
                        className="ai-status"
                    >

                        <span
                            className="status-dot"
                        />

                        AI NUTRITION ENGINE

                    </div>


                    <h1>

                        Find Your
                        <span>
                            {" "}Perfect Meal
                        </span>

                    </h1>


                    <p>

                        Let NutritionOS match meals to your
                        nutrition goals, diet preferences,
                        budget and daily needs.

                    </p>

                </div>


                <div
                    className="hero-ai-icon"
                >

                    🤖

                </div>

            </section>


            {/* ==================================================
                PERSONALIZATION PANEL
            ================================================== */}

            <section
                className="personalization-panel"
            >

                <div
                    className="panel-heading"
                >

                    <div>

                        <span
                            className="panel-icon"
                        >
                            ✨
                        </span>

                        <div>

                            <h2>
                                Personalize Your Picks
                            </h2>

                            <p>
                                Tell the AI what matters to you.
                            </p>

                        </div>

                    </div>


                    <div
                        className="smart-badge"
                    >

                        🧠 Smart Matching

                    </div>

                </div>


                {/* ==================================================
                    FILTER GRID
                ================================================== */}

                <div
                    className="filter-grid"
                >

                    {/* GOAL */}

                    <div
                        className="filter-field"
                    >

                        <label>
                            🎯 Nutrition Goal
                        </label>

                        <select

                            value={goal}

                            onChange={(e) =>
                                setGoal(
                                    e.target.value
                                )
                            }

                        >

                            <option>
                                Muscle Gain
                            </option>

                            <option>
                                Weight Loss
                            </option>

                            <option>
                                Maintain
                            </option>

                        </select>

                    </div>


                    {/* DIET */}

                    <div
                        className="filter-field"
                    >

                        <label>
                            🥗 Diet Preference
                        </label>

                        <select

                            value={diet}

                            onChange={(e) =>
                                setDiet(
                                    e.target.value
                                )
                            }

                        >

                            <option>
                                Veg
                            </option>

                            <option>
                                Non Veg
                            </option>

                            <option>
                                Vegan
                            </option>

                        </select>

                    </div>


                    {/* BUDGET */}

                    <div
                        className="filter-field budget-field"
                    >

                        <label>
                            💰 Meal Budget
                        </label>

                        <Input

                            type="number"

                            icon="₹"

                            placeholder="Enter budget"

                            value={budget}

                            onChange={(e) =>
                                setBudget(
                                    e.target.value
                                )
                            }

                        />

                    </div>


                    {/* CTA */}

                    <div
                        className="generate-field"
                    >

                        <label>
                            &nbsp;
                        </label>

                        <Button

                            onClick={
                                loadRecommendations
                            }

                            disabled={loading}

                        >

                            <span>

                                {loading
                                    ? "⏳ Finding Your Meals..."
                                    : "✨ Get My AI Picks"
                                }

                            </span>

                        </Button>

                    </div>

                </div>


                {/* ==================================================
                    ACTIVE FILTER SUMMARY
                ================================================== */}

                <div
                    className="filter-summary"
                >

                    <span>
                        Your preferences:
                    </span>

                    <span
                        className="summary-chip"
                    >
                        🎯 {goal}
                    </span>

                    <span
                        className="summary-chip"
                    >
                        🥗 {diet}
                    </span>

                    <span
                        className="summary-chip"
                    >
                        💰 ₹{budget}
                    </span>

                </div>

            </section>


            {/* ==================================================
                RESULTS HEADER
            ================================================== */}

            {
                meals.length > 0 && (

                    <div
                        className="results-header"
                    >

                        <div>

                            <span
                                className="results-label"
                            >
                                AI CURATED FOR YOU
                            </span>

                            <h2>
                                Recommended Meals
                            </h2>

                        </div>


                        <div
                            className="results-count"
                        >

                            <strong>
                                {meals.length}
                            </strong>

                            <span>
                                meals found
                            </span>

                        </div>

                    </div>

                )
            }


            {/* ==================================================
                LOADING STATE
            ================================================== */}

            {
                loading && (

                    <div
                        className="loading-state"
                    >

                        <div
                            className="loading-orbit"
                        >
                            🤖
                        </div>

                        <h2>
                            Finding your best meals...
                        </h2>

                        <p>
                            NutritionOS is comparing nutrition,
                            preferences and budget.
                        </p>

                    </div>

                )
            }


            {/* ==================================================
                EMPTY STATE
            ================================================== */}

            {
                !loading &&
                meals.length === 0 && (

                    <div
                        className="empty-state"
                    >

                        <div
                            className="empty-icon"
                        >
                            ✨
                        </div>


                        <div
                            className="empty-content"
                        >

                            <span
                                className="empty-label"
                            >
                                AI READY
                            </span>


                            <h2>
                                Your personalized meals
                                are one click away.
                            </h2>


                            <p>
                                Choose your goal, diet preference
                                and budget above. NutritionOS will
                                rank the meals that best fit you.
                            </p>


                            <button
                                className="empty-cta"
                                onClick={
                                    loadRecommendations
                                }
                            >

                                ✨ Find My Best Meals

                            </button>

                        </div>

                    </div>

                )
            }


            {/* ==================================================
                RECOMMENDATION CARDS
            ================================================== */}

            {
                !loading &&
                meals.length > 0 && (

                    <div
                        className="recommendation-list"
                    >

                        {

                            meals.map(
                                (meal) => (

                                    <MealCard

                                        key={
                                            meal.id
                                        }

                                        meal={
                                            meal
                                        }

                                        primaryText={
                                            "🍽 Log Meal"
                                        }

                                        onPrimaryClick={
                                            handleLogMeal
                                        }

                                    />

                                )
                            )

                        }

                    </div>

                )
            }


            {/* ==================================================
                PAGE STYLES
            ================================================== */}

            <style>
                {`

                /* ==================================================
                   PAGE
                ================================================== */

                .recommendations-page {

                    max-width: 1200px;

                    margin: 0 auto;

                    padding:
                        38px 30px 70px;

                    color: white;

                    box-sizing: border-box;

                }


                /* ==================================================
                   HERO
                ================================================== */

                .recommendations-hero {

                    position: relative;

                    display: flex;

                    align-items: center;

                    justify-content: space-between;

                    min-height: 210px;

                    padding:
                        36px 40px;

                    margin-bottom: 24px;

                    overflow: hidden;

                    border-radius: 28px;

                    border:
                        1px solid
                        rgba(
                            139,
                            92,
                            246,
                            .18
                        );

                    background:
                        radial-gradient(
                            circle at 90% 20%,
                            rgba(
                                124,
                                58,
                                237,
                                .20
                            ),
                            transparent 35%
                        ),
                        linear-gradient(
                            135deg,
                            #111827,
                            #0f172a
                        );

                    box-shadow:
                        0 18px 50px
                        rgba(
                            0,
                            0,
                            0,
                            .18
                        );

                }


                .recommendations-hero::before {

                    content: "";

                    position: absolute;

                    width: 220px;

                    height: 220px;

                    right: 80px;

                    top: -130px;

                    border-radius: 50%;

                    background:
                        rgba(
                            124,
                            58,
                            237,
                            .10
                        );

                    filter:
                        blur(10px);

                }


                .hero-content {

                    position: relative;

                    z-index: 2;

                    max-width: 760px;

                }


                .ai-status {

                    display: inline-flex;

                    align-items: center;

                    gap: 8px;

                    padding:
                        7px 12px;

                    margin-bottom: 14px;

                    border-radius: 999px;

                    background:
                        rgba(
                            34,
                            197,
                            94,
                            .10
                        );

                    border:
                        1px solid
                        rgba(
                            34,
                            197,
                            94,
                            .18
                        );

                    color:
                        #86efac;

                    font-size:
                        10px;

                    font-weight:
                        800;

                    letter-spacing:
                        1px;

                }


                .status-dot {

                    width: 7px;

                    height: 7px;

                    border-radius: 50%;

                    background:
                        #22c55e;

                    box-shadow:
                        0 0 10px
                        rgba(
                            34,
                            197,
                            94,
                            .8
                        );

                }


                .recommendations-hero h1 {

                    margin:
                        0 0 12px;

                    font-size:
                        42px;

                    line-height:
                        1.05;

                    letter-spacing:
                        -1.5px;

                }


                .recommendations-hero h1 span {

                    color:
                        #a78bfa;

                }


                .recommendations-hero p {

                    margin:
                        0;

                    max-width:
                        650px;

                    color:
                        #94a3b8;

                    font-size:
                        15px;

                    line-height:
                        1.6;

                }


                .hero-ai-icon {

                    position: relative;

                    z-index: 2;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    width: 105px;

                    height: 105px;

                    margin-right: 15px;

                    border-radius:
                        28px;

                    background:
                        linear-gradient(
                            135deg,
                            #7c3aed,
                            #4f46e5
                        );

                    font-size:
                        52px;

                    box-shadow:
                        0 20px 45px
                        rgba(
                            99,
                            102,
                            241,
                            .28
                        );

                    transform:
                        rotate(4deg);

                }


                /* ==================================================
                   PERSONALIZATION PANEL
                ================================================== */

                .personalization-panel {

                    padding:
                        25px;

                    margin-bottom:
                        38px;

                    border-radius:
                        22px;

                    background:
                        #111827;

                    border:
                        1px solid
                        rgba(
                            255,
                            255,
                            255,
                            .08
                        );

                }


                .panel-heading {

                    display: flex;

                    align-items: center;

                    justify-content:
                        space-between;

                    margin-bottom:
                        22px;

                }


                .panel-heading > div:first-child {

                    display: flex;

                    align-items: center;

                    gap: 13px;

                }


                .panel-icon {

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    width: 42px;

                    height: 42px;

                    border-radius:
                        13px;

                    background:
                        rgba(
                            124,
                            58,
                            237,
                            .14
                        );

                    font-size:
                        20px;

                }


                .panel-heading h2 {

                    margin:
                        0 0 3px;

                    font-size:
                        18px;

                }


                .panel-heading p {

                    margin:
                        0;

                    color:
                        #64748b;

                    font-size:
                        12px;

                }


                .smart-badge {

                    padding:
                        8px 12px;

                    border-radius:
                        999px;

                    color:
                        #c4b5fd;

                    background:
                        rgba(
                            124,
                            58,
                            237,
                            .10
                        );

                    border:
                        1px solid
                        rgba(
                            124,
                            58,
                            237,
                            .18
                        );

                    font-size:
                        10px;

                    font-weight:
                        800;

                }


                /* ==================================================
                   FILTERS
                ================================================== */

                .filter-grid {

                    display: grid;

                    grid-template-columns:
                        1fr 1fr 1fr 1.15fr;

                    gap:
                        13px;

                    align-items:
                        end;

                }


                .filter-field {

                    min-width:
                        0;

                }


                .filter-field label,
                .generate-field label {

                    display:
                        block;

                    margin-bottom:
                        8px;

                    color:
                        #cbd5e1;

                    font-size:
                        11px;

                    font-weight:
                        700;

                }


                .filter-field select {

                    width:
                        100%;

                    min-height:
                        52px;

                    padding:
                        0 15px;

                    border-radius:
                        13px;

                    background:
                        #1a2537;

                    color:
                        white;

                    border:
                        1px solid
                        rgba(
                            255,
                            255,
                            255,
                            .08
                        );

                    outline:
                        none;

                    font-size:
                        13px;

                    cursor:
                        pointer;

                }


                .filter-field select:focus {

                    border-color:
                        rgba(
                            139,
                            92,
                            246,
                            .55
                        );

                }


                .budget-field input {

                    min-height:
                        52px !important;

                    box-sizing:
                        border-box;

                }


                .generate-field button {

                    width:
                        100%;

                    min-height:
                        52px;

                    border-radius:
                        13px;

                }


                /* ==================================================
                   FILTER SUMMARY
                ================================================== */

                .filter-summary {

                    display:
                        flex;

                    align-items:
                        center;

                    gap:
                        8px;

                    flex-wrap:
                        wrap;

                    margin-top:
                        18px;

                    padding-top:
                        17px;

                    border-top:
                        1px solid
                        rgba(
                            255,
                            255,
                            255,
                            .06
                        );

                    color:
                        #64748b;

                    font-size:
                        11px;

                }


                .summary-chip {

                    padding:
                        6px 10px;

                    border-radius:
                        999px;

                    background:
                        #1e293b;

                    color:
                        #cbd5e1;

                }


                /* ==================================================
                   RESULTS HEADER
                ================================================== */

                .results-header {

                    display:
                        flex;

                    align-items:
                        flex-end;

                    justify-content:
                        space-between;

                    margin:
                        0 0 20px;

                }


                .results-label {

                    color:
                        #a78bfa;

                    font-size:
                        9px;

                    font-weight:
                        900;

                    letter-spacing:
                        1.5px;

                }


                .results-header h2 {

                    margin:
                        4px 0 0;

                    font-size:
                        26px;

                }


                .results-count {

                    display:
                        flex;

                    align-items:
                        baseline;

                    gap:
                        6px;

                    color:
                        #64748b;

                    font-size:
                        11px;

                }


                .results-count strong {

                    color:
                        #c4b5fd;

                    font-size:
                        22px;

                }


                /* ==================================================
                   EMPTY STATE
                ================================================== */

                .empty-state {

                    display:
                        flex;

                    align-items:
                        center;

                    gap:
                        28px;

                    min-height:
                        280px;

                    padding:
                        38px;

                    margin-top:
                        10px;

                    border-radius:
                        24px;

                    background:
                        linear-gradient(
                            135deg,
                            #111827,
                            #0f172a
                        );

                    border:
                        1px solid
                        rgba(
                            255,
                            255,
                            255,
                            .07
                        );

                }


                .empty-icon {

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    flex-shrink:
                        0;

                    width:
                        90px;

                    height:
                        90px;

                    border-radius:
                        25px;

                    background:
                        rgba(
                            124,
                            58,
                            237,
                            .12
                        );

                    font-size:
                        42px;

                }


                .empty-label {

                    color:
                        #a78bfa;

                    font-size:
                        9px;

                    font-weight:
                        900;

                    letter-spacing:
                        1.5px;

                }


                .empty-content h2 {

                    max-width:
                        600px;

                    margin:
                        7px 0 9px;

                    font-size:
                        24px;

                }


                .empty-content p {

                    max-width:
                        620px;

                    margin:
                        0 0 20px;

                    color:
                        #94a3b8;

                    font-size:
                        13px;

                    line-height:
                        1.6;

                }


                .empty-cta {

                    padding:
                        11px 17px;

                    border:
                        none;

                    border-radius:
                        11px;

                    background:
                        linear-gradient(
                            135deg,
                            #7c3aed,
                            #6366f1
                        );

                    color:
                        white;

                    font-size:
                        12px;

                    font-weight:
                        800;

                    cursor:
                        pointer;

                }


                /* ==================================================
                   LOADING
                ================================================== */

                .loading-state {

                    display:
                        flex;

                    align-items:
                        center;

                    flex-direction:
                        column;

                    justify-content:
                        center;

                    min-height:
                        300px;

                    padding:
                        35px;

                    border-radius:
                        24px;

                    background:
                        #111827;

                    border:
                        1px solid
                        rgba(
                            255,
                            255,
                            255,
                            .07
                        );

                    text-align:
                        center;

                }


                .loading-orbit {

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    width:
                        70px;

                    height:
                        70px;

                    margin-bottom:
                        18px;

                    border-radius:
                        50%;

                    background:
                        linear-gradient(
                            135deg,
                            #7c3aed,
                            #6366f1
                        );

                    font-size:
                        32px;

                    animation:
                        aiPulse 1.4s
                        ease-in-out
                        infinite;

                }


                .loading-state h2 {

                    margin:
                        0 0 7px;

                    font-size:
                        20px;

                }


                .loading-state p {

                    margin:
                        0;

                    color:
                        #64748b;

                    font-size:
                        12px;

                }


                @keyframes aiPulse {

                    0%,
                    100% {

                        transform:
                            scale(1);

                        box-shadow:
                            0 0 0
                            rgba(
                                124,
                                58,
                                237,
                                0
                            );

                    }

                    50% {

                        transform:
                            scale(1.08);

                        box-shadow:
                            0 0 35px
                            rgba(
                                124,
                                58,
                                237,
                                .35
                            );

                    }

                }


                /* ==================================================
                   RECOMMENDATION LIST
                ================================================== */

                .recommendation-list {

                    width:
                        100%;

                }


                /* ==================================================
                   TABLET
                ================================================== */

                @media (max-width: 950px) {

                    .filter-grid {

                        grid-template-columns:
                            1fr 1fr;

                    }

                    .generate-field {

                        grid-column:
                            span 2;

                    }

                    .hero-ai-icon {

                        display:
                            none;

                    }

                }


                /* ==================================================
                   MOBILE
                ================================================== */

                @media (max-width: 650px) {

                    .recommendations-page {

                        padding:
                            20px 14px 50px;

                    }


                    .recommendations-hero {

                        min-height:
                            auto;

                        padding:
                            28px 24px;

                    }


                    .recommendations-hero h1 {

                        font-size:
                            31px;

                    }


                    .recommendations-hero p {

                        font-size:
                            13px;

                    }


                    .personalization-panel {

                        padding:
                            18px;

                    }


                    .panel-heading {

                        align-items:
                            flex-start;

                        flex-direction:
                            column;

                        gap:
                            13px;

                    }


                    .filter-grid {

                        grid-template-columns:
                            1fr;

                    }


                    .generate-field {

                        grid-column:
                            auto;

                    }


                    .results-header {

                        align-items:
                            flex-start;

                        flex-direction:
                            column;

                        gap:
                            10px;

                    }


                    .empty-state {

                        align-items:
                            flex-start;

                        flex-direction:
                            column;

                        padding:
                            28px;

                    }


                    .empty-icon {

                        width:
                            65px;

                        height:
                            65px;

                        border-radius:
                            18px;

                        font-size:
                            30px;

                    }

                }

                `}
            </style>

        </div>

    );

}