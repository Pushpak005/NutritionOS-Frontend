import { useState } from "react";
import StepCard from "../../components/onboarding/StepCard";
import NextButton from "../../components/onboarding/NextButton";

export default function Step1Account({
    data,
    updateData,
    nextStep
}) {

    const [errors, setErrors] = useState({});

    function validate() {

        let newErrors = {};

        if (!data.firstName?.trim())
            newErrors.firstName = "First name is required";

        if (!data.lastName?.trim())
            newErrors.lastName = "Last name is required";

        if (!data.email?.trim())
            newErrors.email = "Email is required";

        if (!/\S+@\S+\.\S+/.test(data.email))
            newErrors.email = "Invalid email";

        if (!data.password || data.password.length < 8)
            newErrors.password =
                "Minimum 8 characters";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    }

    function continueStep() {

        if (validate()) {

            nextStep();

        }

    }

    return (

        <StepCard
            title="Create your account"
            subtitle="Let's build your NutritionOS profile."
        >

            <input

                placeholder="First Name"

                value={data.firstName || ""}

                onChange={(e) =>
                    updateData("firstName", e.target.value)
                }

            />

            <span>{errors.firstName}</span>

            <input

                placeholder="Last Name"

                value={data.lastName || ""}

                onChange={(e) =>
                    updateData("lastName", e.target.value)
                }

            />

            <span>{errors.lastName}</span>

            <input

                placeholder="Email"

                value={data.email || ""}

                onChange={(e) =>
                    updateData("email", e.target.value)
                }

            />

            <span>{errors.email}</span>

            <input

                type="password"

                placeholder="Password"

                value={data.password || ""}

                onChange={(e) =>
                    updateData("password", e.target.value)
                }

            />

            <span>{errors.password}</span>

            <NextButton
                onClick={continueStep}
                text="Continue"
            />

        </StepCard>

    );

}