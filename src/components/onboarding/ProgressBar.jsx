export default function ProgressBar({

    step,

    total

}) {

    const progress = (step / total) * 100;

    return (

        <div
            style={{
                width: "500px",
                margin: "20px auto"
            }}
        >

            <div
                style={{
                    color: "white",
                    marginBottom: "8px"
                }}
            >
                Step {step} of {total}
            </div>

            <div
                style={{
                    height: "10px",
                    background: "#2b2b2b",
                    borderRadius: "10px"
                }}
            >

                <div
                    style={{
                        width: `${progress}%`,
                        height: "100%",
                        background: "var(--purple)",
                        borderRadius: "10px"
                    }}
                />

            </div>

        </div>

    );

}