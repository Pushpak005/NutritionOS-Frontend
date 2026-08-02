import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";

export default function useDashboard() {

    const [dashboard, setDashboard] = useState(null);

    async function refreshDashboard() {

        try {

            const data = await getDashboard();

            setDashboard(data);

        }

        catch (err) {

            console.error(err);

        }

    }

    useEffect(() => {

        refreshDashboard();

    }, []);

    return {

        dashboard,

        refreshDashboard

    };

}