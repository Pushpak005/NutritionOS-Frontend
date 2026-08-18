import { useEffect, useState } from "react";

import { getDashboard } from "../../services/dashboardService";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatsGrid from "../../components/dashboard/StatsGrid";
import CaloriesChart from "../../components/charts/CaloriesChart";
import TodaysMeals from "../../components/dashboard/TodaysMeals";
import TodayAIPickCard from "../../components/dashboard/TodayAIPickCard";
import TopAIPicks from "../../components/dashboard/TopAIPicks";

import NutritionScoreCard from "../../components/cards/NutritionScoreCard";
import QuickActionCard from "../../components/cards/QuickActionCard";


export default function Dashboard() {

    const [dashboard, setDashboard] = useState(null);


    useEffect(() => {

        async function loadDashboard() {

            try {

                const data = await getDashboard();

                setDashboard(data);

            }

            catch (err) {

                console.error(
                    "Dashboard loading error:",
                    err
                );

            }

        }


        loadDashboard();

    }, []);


    if (!dashboard) {

        return (

            <div
                style={{
                    minHeight: "60vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "40px"
                }}
            >

                <div
                    style={{
                        padding: "28px 36px",
                        borderRadius: "20px",
                        background:
                            "rgba(255,255,255,0.04)",
                        border:
                            "1px solid rgba(255,255,255,0.08)",
                        color: "#E5E7EB",
                        fontSize: "16px",
                        fontWeight: "600",
                        boxShadow:
                            "0 20px 50px rgba(0,0,0,.18)"
                    }}
                >
                    Loading your nutrition dashboard...
                </div>

            </div>

        );

    }


    const actionState =
        dashboard.action_state;

    const actionAllowed =
        actionState?.allowed !== false;


    return (

        <div
            className="nutrition-dashboard-page"
            style={{
                width: "100%",
                maxWidth: "1480px",
                margin: "0 auto",
                padding:
                    "24px clamp(16px, 3vw, 40px) 60px",
                boxSizing: "border-box"
            }}
        >

            {/* =====================================================
                WELCOME
            ===================================================== */}

            <div
                style={{
                    marginBottom: "26px"
                }}
            >

                <WelcomeBanner
                    name={
                        dashboard.profile.name
                    }
                    goal={
                        dashboard.profile.goal
                    }
                />

            </div>


            {/* =====================================================
                PRIMARY DASHBOARD GRID
            ===================================================== */}

            <section
                className="dashboard-primary-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "minmax(0, 0.92fr) minmax(0, 1.08fr)",
                    gap: "24px",
                    alignItems: "start",
                    marginBottom: "26px"
                }}
            >

                {/* =================================================
                    LEFT — NUTRITION STATUS
                ================================================= */}

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        minWidth: 0
                    }}
                >

                    <NutritionScoreCard />

                    <StatsGrid
                        profile={
                            dashboard.profile
                        }
                        consumed={
                            dashboard.consumed
                        }
                    />

                </div>


                {/* =================================================
                    RIGHT — AI DECISION
                ================================================= */}

                <div
                    style={{
                        minWidth: 0
                    }}
                >

                    {actionAllowed ? (

                        <TodayAIPickCard
                            meal={
                                dashboard.today_ai_pick
                            }
                            nutritionComplete={
                                dashboard.nutrition_complete
                            }
                        />

                    ) : (

                        <div
                            style={{
                                minHeight: "320px",
                                borderRadius: "28px",
                                padding: "32px",
                                boxSizing: "border-box",
                                background:
                                    "linear-gradient(145deg,#15182B,#1D2038)",
                                border:
                                    "1px solid rgba(139,92,246,.20)",
                                color: "white",
                                boxShadow:
                                    "0 24px 60px rgba(0,0,0,.25)",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}
                        >

                            <div
                                style={{
                                    width: "54px",
                                    height: "54px",
                                    borderRadius: "16px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background:
                                        "rgba(139,92,246,.16)",
                                    border:
                                        "1px solid rgba(139,92,246,.25)",
                                    fontSize: "25px",
                                    marginBottom: "20px"
                                }}
                            >
                                🤖
                            </div>


                            <div
                                style={{
                                    color: "#A78BFA",
                                    fontSize: "13px",
                                    fontWeight: "800",
                                    letterSpacing: ".08em",
                                    textTransform: "uppercase",
                                    marginBottom: "8px"
                                }}
                            >
                                AI Decision
                            </div>


                            <h2
                                style={{
                                    margin: 0,
                                    fontSize:
                                        "clamp(25px, 3vw, 34px)",
                                    lineHeight: "1.15",
                                    fontWeight: "850"
                                }}
                            >
                                Recommendations
                                unavailable right now
                            </h2>


                            <p
                                style={{
                                    color: "#AEB7C8",
                                    lineHeight: "1.65",
                                    margin:
                                        "14px 0 0",
                                    fontSize: "15px",
                                    maxWidth: "620px"
                                }}
                            >
                                {actionState?.reason ||
                                    "Recommendations are not available right now."}
                            </p>

                        </div>

                    )}

                </div>

            </section>


            {/* =====================================================
                CALORIES / NUTRITION TREND
            ===================================================== */}

            <section
                style={{
                    marginBottom: "26px"
                }}
            >

                <div
                    className="dashboard-section-card"
                    style={{
                        background:
                            "linear-gradient(145deg,#111827,#151B2B)",
                        border:
                            "1px solid rgba(255,255,255,.065)",
                        borderRadius: "26px",
                        padding:
                            "clamp(18px, 3vw, 28px)",
                        boxSizing: "border-box",
                        boxShadow:
                            "0 20px 50px rgba(0,0,0,.16)"
                    }}
                >

                    <div
                        style={{
                            marginBottom: "18px"
                        }}
                    >

                        <div
                            style={{
                                color: "#8B5CF6",
                                fontSize: "12px",
                                fontWeight: "800",
                                letterSpacing: ".10em",
                                textTransform:
                                    "uppercase",
                                marginBottom: "6px"
                            }}
                        >
                            Daily nutrition
                        </div>


                        <h2
                            style={{
                                color: "white",
                                margin: 0,
                                fontSize:
                                    "clamp(21px, 2.5vw, 28px)",
                                fontWeight: "800"
                            }}
                        >
                            Your nutrition trend
                        </h2>

                    </div>


                    <CaloriesChart />

                </div>

            </section>


            {/* =====================================================
                TODAY'S MEALS
            ===================================================== */}

            <section
                style={{
                    marginBottom: "34px"
                }}
            >

                <div
                    className="dashboard-section-card"
                    style={{
                        background:
                            "linear-gradient(145deg,#111827,#151B2B)",
                        border:
                            "1px solid rgba(255,255,255,.065)",
                        borderRadius: "26px",
                        padding:
                            "clamp(18px, 3vw, 28px)",
                        boxSizing: "border-box",
                        boxShadow:
                            "0 20px 50px rgba(0,0,0,.16)"
                    }}
                >

                    <div
                        style={{
                            marginBottom: "18px"
                        }}
                    >

                        <div
                            style={{
                                color: "#22C55E",
                                fontSize: "12px",
                                fontWeight: "800",
                                letterSpacing: ".10em",
                                textTransform:
                                    "uppercase",
                                marginBottom: "6px"
                            }}
                        >
                            Today's activity
                        </div>


                        <h2
                            style={{
                                color: "white",
                                margin: 0,
                                fontSize:
                                    "clamp(21px, 2.5vw, 28px)",
                                fontWeight: "800"
                            }}
                        >
                            What you ate today
                        </h2>

                    </div>


                    <TodaysMeals />

                </div>

            </section>


            {/* =====================================================
                TOP AI PICKS — FULL WIDTH
            ===================================================== */}

            {actionAllowed && (

                <section
                    style={{
                        marginBottom: "34px"
                    }}
                >

                    <TopAIPicks
                        meals={
                            dashboard.top_ai_picks
                        }
                    />

                </section>

            )}


            {/* =====================================================
                QUICK ACTIONS
            ===================================================== */}

            <section>

                <div
                    style={{
                        marginBottom: "16px"
                    }}
                >

                    <div
                        style={{
                            color: "#F59E0B",
                            fontSize: "12px",
                            fontWeight: "800",
                            letterSpacing: ".10em",
                            textTransform:
                                "uppercase",
                            marginBottom: "6px"
                        }}
                    >
                        Shortcuts
                    </div>


                    <h2
                        style={{
                            margin: 0,
                            color: "white",
                            fontSize:
                                "clamp(21px, 2.5vw, 28px)",
                            fontWeight: "800"
                        }}
                    >
                        Quick actions
                    </h2>

                </div>


                <div
                    className="dashboard-quick-actions"
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(3,minmax(0,1fr))",
                        gap: "16px"
                    }}
                >

                    <QuickActionCard
                        emoji="🍽"
                        title="Browse Restaurants"
                        route="/restaurants"
                    />

                    <QuickActionCard
                        emoji="📋"
                        title="My Meals"
                        route="/my-meals"
                    />

                    <QuickActionCard
                        emoji="👤"
                        title="Profile"
                        route="/profile"
                    />

                </div>

            </section>


            {/* =====================================================
                RESPONSIVE
            ===================================================== */}

            <style>
                {`

                    @media (max-width: 1050px) {

                        .dashboard-primary-grid {

                            grid-template-columns:
                                1fr !important;

                        }

                    }


                    @media (max-width: 700px) {

                        .dashboard-quick-actions {

                            grid-template-columns:
                                1fr !important;

                        }

                    }


                    @media (max-width: 560px) {

                        .nutrition-dashboard-page {

                            padding-left:
                                12px !important;

                            padding-right:
                                12px !important;

                        }

                    }

                `}
            </style>

        </div>

    );

}