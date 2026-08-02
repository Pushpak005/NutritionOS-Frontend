export default function StepCard({
    title,
    subtitle,
    children
}) {

    return (

        <div
            style={{
                width: "500px",
                margin: "50px auto",
                background: "var(--card)",
                padding: "40px",
                borderRadius: "24px",
                border: "1px solid var(--border)"
            }}
        >

            <h1>{title}</h1>

            <p
                style={{
                    color: "var(--text2)",
                    marginBottom: "30px"
                }}
            >
                {subtitle}
            </p>

            {children}

        </div>

    );

}