import { useEffect, useState } from "react";

import { getDashboard } from "../../services/dashboardService";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
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
            } catch (err) {
                console.error(err);
            }
        }

        loadDashboard();
    }, []);

    if (!dashboard) {
        return (
            <h2
                style={{
                    color: "white",
                    textAlign: "center",
                    marginTop: "100px"
                }}
            >
                Loading Dashboard...
            </h2>
        );
    }

    const actionState = dashboard.action_state;
    const actionAllowed = actionState?.allowed !== false;

    return (
        <div
            style={{
                maxWidth: "1400px",
                margin: "0 auto",
                padding: "30px"
            }}
        >
            <WelcomeBanner
                name={dashboard.profile.name}
                goal={dashboard.profile.goal}
            />

            <DashboardLayout
                left={
                    <>
                        <NutritionScoreCard />

                        <StatsGrid
                            profile={dashboard.profile}
                            consumed={dashboard.consumed}
                        />

                        <CaloriesChart />

                        <TodaysMeals />
                    </>
                }
                right={
                    <>
                        {actionAllowed ? (
                            <>
                                <TodayAIPickCard
                                    meal={dashboard.today_ai_pick}
                                />

                                <TopAIPicks
                                    meals={dashboard.top_ai_picks}
                                />
                            </>
                        ) : (
                            <div
                                style={{
                                    padding: "24px",
                                    borderRadius: "16px",
                                    background: "rgba(255,255,255,0.06)",
                                    color: "white"
                                }}
                            >
                                <h3>AI Recommendations Unavailable</h3>

                                <p>
                                    {actionState?.reason ||
                                        "Recommendations are not available right now."}
                                </p>
                            </div>
                        )}

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
                    </>
                }
            />
        </div>
    );
}