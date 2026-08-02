import { useNavigate } from "react-router-dom";

import StepCard from "../../components/onboarding/StepCard";
import BackButton from "../../components/onboarding/BackButton";

export default function Finish({

    data,

    previousStep

}) {

    const navigate = useNavigate();

    async function createProfile() {

        console.log(data);

        /*
            NEXT STEP

            POST

            /auth/register

            data
        */

        navigate("/login");

    }

    return (

        <StepCard

            title="Review Your Profile"

            subtitle="Everything looks ready."

        >

            <pre

                style={{

                    color:"white",

                    background:"#111",

                    padding:"20px",

                    borderRadius:"15px"

                }}

            >

                {JSON.stringify(data,null,2)}

            </pre>

            <button

                style={{

                    width:"100%",

                    padding:"18px",

                    marginTop:"25px",

                    border:"none",

                    background:"var(--purple)",

                    color:"white",

                    borderRadius:"15px",

                    cursor:"pointer"

                }}

                onClick={createProfile}

            >

                Create NutritionOS Profile

            </button>

            <BackButton

                onClick={previousStep}

            />

        </StepCard>

    );

}