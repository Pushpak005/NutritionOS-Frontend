export default function ProgressBar({ current, target }) {

    const percentage = Math.min(
        (current / target) * 100,
        100
    );

    return (

        <div
            style={{
                width: "100%",
                height: "12px",
                background: "#2e2e2e",
                borderRadius: "20px",
                overflow: "hidden",
                marginTop: "10px"
            }}
        >

            <div
                style={{
                    width: `${percentage}%`,
                    height: "100%",
                    background: "#7c3aed",
                    transition: "0.4s"
                }}
            />

        </div>

    );

}