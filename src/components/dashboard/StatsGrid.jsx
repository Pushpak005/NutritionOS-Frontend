import DashboardCard from "../cards/DashboardCard";

export default function StatsGrid({

    profile,

    consumed

}) {

    const cards = [

        {

            emoji: "🔥",

            title: "Calories",

            current: consumed.calories,

            target: profile.daily_calories,

            unit: " kcal",

            color: "#ef4444"

        },

        {

            emoji: "🥩",

            title: "Protein",

            current: consumed.protein,

            target: profile.daily_protein,

            unit: " g",

            color: "#22c55e"

        },

        {

            emoji: "🍚",

            title: "Carbs",

            current: consumed.carbs,

            target: profile.daily_carbs,

            unit: " g",

            color: "#3b82f6"

        },

        {

            emoji: "🥑",

            title: "Fat",

            current: consumed.fat,

            target: profile.daily_fat,

            unit: " g",

            color: "#f59e0b"

        }

    ];

    return (

        <div

            style={{

                display: "grid",

                gridTemplateColumns:

                    "repeat(auto-fit,minmax(300px,1fr))",

                gap: "24px",

                marginTop: "30px",

                marginBottom: "30px"

            }}

        >

            {

                cards.map((card) => (

                    <DashboardCard

                        key={card.title}

                        title={card.title}

                        emoji={card.emoji}

                        current={card.current}

                        target={card.target}

                        unit={card.unit}

                        color={card.color}

                    />

                ))

            }

        </div>

    );

}