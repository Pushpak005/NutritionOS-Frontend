import "./DashboardLayout.css";

export default function DashboardLayout({ left, right }) {

    return (

        <div className="dashboard-container">

            <div className="dashboard-left">

                {left}

            </div>

            <div className="dashboard-right">

                {right}

            </div>

        </div>

    );

}