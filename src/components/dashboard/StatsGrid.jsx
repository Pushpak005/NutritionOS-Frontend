import DashboardCard from "../cards/DashboardCard";

export default function StatsGrid({

    profile,

    consumed

}) {

    return (

        <div

            style={{

                display: "grid",

                gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",

                gap: "20px"

            }}

        >

            <DashboardCard

                emoji="🔥"

                title="Calories"

                current={consumed.calories}

                target={profile.daily_calories}

            />

            <DashboardCard

                emoji="🥩"

                title="Protein"

                current={consumed.protein}

                target={profile.daily_protein}

            />

            <DashboardCard

                emoji="🍚"

                title="Carbs"

                current={consumed.carbs}

                target={profile.daily_carbs}

            />

            <DashboardCard

                emoji="🥑"

                title="Fat"

                current={consumed.fat}

                target={profile.daily_fat}

            />

        </div>

    );

}