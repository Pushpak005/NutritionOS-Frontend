import ProgressBar from "../ui/ProgressBar";

export default function DashboardCard({

    title,

    emoji,

    current = 0,

    target = 0,

    unit = "",

    color = "#8b5cf6"

}) {

    const remaining = Math.max(target - current, 0);

    const percentage =
        target > 0
            ? Math.min((current / target) * 100, 100)
            : 0;

    return (

        <div

            style={{

                background: "#111827",

                border: "1px solid rgba(255,255,255,.08)",

                borderRadius: "22px",

                padding: "24px",

                color: "white",

                boxShadow: "0 8px 24px rgba(0,0,0,.18)",

                transition: ".25s"

            }}

        >

            <div

                style={{

                    display: "flex",

                    justifyContent: "space-between",

                    alignItems: "center",

                    marginBottom: "20px"

                }}

            >

                <h2

                    style={{

                        margin: 0,

                        fontSize: "20px"

                    }}

                >

                    {emoji} {title}

                </h2>

                <div

                    style={{

                        background: color,

                        padding: "6px 12px",

                        borderRadius: "999px",

                        fontWeight: "700",

                        fontSize: "13px"

                    }}

                >

                    {percentage.toFixed(0)}%

                </div>

            </div>

            <h1

                style={{

                    marginBottom: "18px",

                    fontSize: "34px"

                }}

            >

                {current}

                {unit}

                <span

                    style={{

                        color: "#94a3b8",

                        fontSize: "18px"

                    }}

                >

                    {" / "}

                    {target}

                    {unit}

                </span>

            </h1>

            <ProgressBar

                current={current}

                target={target}

            />

            <p

                style={{

                    marginTop: "18px",

                    color: "#94a3b8"

                }}

            >

                Remaining:{" "}

                <strong>

                    {remaining}

                    {unit}

                </strong>

            </p>

        </div>

    );

}