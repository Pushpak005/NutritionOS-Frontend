import { useEffect, useState } from "react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

import { getWeeklyAnalytics } from "../../services/analyticsService";

export default function CaloriesChart() {

    const [data, setData] = useState([]);

    useEffect(() => {

        async function loadChart() {

            try {

                const result = await getWeeklyAnalytics();

                setData(result);

            }

            catch (err) {

                console.error(err);

            }

        }

        loadChart();

    }, []);

    return (

        <div
            style={{
                background:"#1d1d1d",
                padding:"25px",
                marginTop:"30px",
                borderRadius:"15px"
            }}
        >

            <h2
                style={{
                    color:"white",
                    marginBottom:"20px"
                }}
            >
                📈 Weekly Calories
            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <LineChart
                    data={data}
                >

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis dataKey="day"/>

                    <YAxis/>

                    <Tooltip/>

                    <Line

                        type="monotone"

                        dataKey="calories"

                        stroke="#7c3aed"

                        strokeWidth={3}

                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}