import { useEffect, useState } from "react";

import { getDashboard } from "../../services/dashboardService";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatsGrid from "../../components/dashboard/StatsGrid";
import CaloriesChart from "../../components/charts/CaloriesChart";
import TodaysMeals from "../../components/dashboard/TodaysMeals";

import NutritionScoreCard from "../../components/cards/NutritionScoreCard";
import AICoachCard from "../../components/cards/AICoachCard";
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

                        <AICoachCard />

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