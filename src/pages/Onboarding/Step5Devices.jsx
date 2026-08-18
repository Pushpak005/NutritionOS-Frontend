import StepCard from "../../components/onboarding/StepCard";
import NextButton from "../../components/onboarding/NextButton";
import BackButton from "../../components/onboarding/BackButton";

export default function Step5Devices({

    nextStep,

    previousStep

}) {

    function DeviceCard({

        emoji,

        title,

        description

    }) {

        return (

            <div

                style={{

                    display: "flex",

                    justifyContent: "space-between",

                    alignItems: "center",

                    background: "#111827",

                    border: "1px solid rgba(255,255,255,.08)",

                    borderRadius: "18px",

                    padding: "20px",

                    marginBottom: "16px"

                }}

            >

                <div>

                    <div
                        style={{
                            color: "white",
                            fontSize: "20px",
                            fontWeight: "700"
                        }}
                    >
                        {emoji} {title}
                    </div>

                    <div
                        style={{
                            color: "#94a3b8",
                            marginTop: "6px",
                            fontSize: "14px"
                        }}
                    >
                        {description}
                    </div>

                </div>

                <button

                    disabled

                    style={{

                        background: "#1f2937",

                        color: "#9ca3af",

                        border: "1px solid rgba(255,255,255,.08)",

                        padding: "10px 18px",

                        borderRadius: "12px",

                        cursor: "not-allowed",

                        fontWeight: "600"

                    }}

                >

                    Coming Soon

                </button>

            </div>

        );

    }

    return (

        <StepCard

            title="Connect Your Devices"

            subtitle="NutritionOS can automatically personalize your recommendations using your wearable data."

        >

            <DeviceCard

                emoji="⌚"

                title="Fitbit"

                description="Sync steps, calories burned and activity."

            />

            <DeviceCard

                emoji="🍎"

                title="Apple Health"

                description="Import workouts, sleep and health metrics."

            />

            <DeviceCard

                emoji="🤖"

                title="Google Fit"

                description="Automatically track activity and energy burn."

            />

            <DeviceCard

                emoji="⌚"

                title="Garmin"

                description="Use Garmin training and recovery metrics."

            />

            <div

                style={{

                    background: "rgba(139,92,246,.10)",

                    border: "1px solid rgba(139,92,246,.30)",

                    color: "#d8b4fe",

                    padding: "16px",

                    borderRadius: "16px",

                    marginTop: "20px",

                    fontSize: "14px",

                    lineHeight: "1.6"

                }}

            >

                💡 You can skip this step for now. Device integrations will be available in an upcoming update.

            </div>

            <div

                style={{

                    display:"flex",

                    gap:"15px",

                    marginTop:"30px"

                }}

            >

                <BackButton

                    onClick={previousStep}

                />

                <NextButton

                    onClick={nextStep}

                    text="Skip & Continue"

                />

            </div>

        </StepCard>

    );

}