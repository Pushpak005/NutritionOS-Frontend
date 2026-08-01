import { useEffect, useState } from "react";

import { getDashboard } from "../../services/dashboardService";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatsGrid from "../../components/dashboard/StatsGrid";
import CaloriesChart from "../../components/charts/CaloriesChart";
import TodaysMeals from "../../components/dashboard/TodaysMeals";

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

    if (!dashboard)

        return <h2 style={{color:"white"}}>Loading Dashboard...</h2>;

    return (

        <div>

            <WelcomeBanner

                name={dashboard.profile.name}

                goal={dashboard.profile.goal}

            />

            <StatsGrid

                profile={dashboard.profile}

                consumed={dashboard.consumed}

            />

            <CaloriesChart/>

            <TodaysMeals/>

            <AICoachCard/>

            <div

                style={{

                    marginTop:"30px",

                    display:"grid",

                    gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",

                    gap:"20px"

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

        </div>

    );

}