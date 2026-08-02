import StepCard from "../../components/onboarding/StepCard";
import NextButton from "../../components/onboarding/NextButton";
import BackButton from "../../components/onboarding/BackButton";

export default function Step5Devices({

    nextStep,

    previousStep

}) {

    return (

        <StepCard

            title="Connect Your Devices"

            subtitle="Sync your health data automatically."

        >

            <div className="device-card">

                ⌚ Fitbit

                <button disabled>

                    Coming Soon

                </button>

            </div>

            <div className="device-card">

                🍎 Apple Health

                <button disabled>

                    Coming Soon

                </button>

            </div>

            <div className="device-card">

                🤖 Google Fit

                <button disabled>

                    Coming Soon

                </button>

            </div>

            <div className="device-card">

                ⌚ Garmin

                <button disabled>

                    Coming Soon

                </button>

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