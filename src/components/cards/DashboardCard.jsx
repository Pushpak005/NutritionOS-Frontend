import ProgressBar from "../ui/ProgressBar";

export default function DashboardCard({

    title,
    emoji,
    current,
    target

}) {

    return (

        <div
            style={{
                background: "#1e1e1e",
                padding: "25px",
                borderRadius: "15px",
                marginBottom: "20px",
                border: "1px solid #333"
            }}
        >

            <h2>

                {emoji} {title}

            </h2>

            <h1>

                {current} / {target}

            </h1>

            <ProgressBar
                current={current}
                target={target}
            />

            <p
                style={{
                    marginTop: "15px"
                }}
            >

                Remaining :

                {" "}

                {target-current}

            </p>

        </div>

    );

}