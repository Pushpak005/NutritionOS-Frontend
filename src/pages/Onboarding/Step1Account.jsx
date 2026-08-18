import { useState } from "react";

import StepCard from "../../components/onboarding/StepCard";
import NextButton from "../../components/onboarding/NextButton";
import Input from "../../components/ui/Input";

export default function Step1Account({
    data,
    updateData,
    nextStep
}) {

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    function validate() {

        let newErrors = {};

        if (!data.firstName?.trim())
            newErrors.firstName = "First name is required";

        if (!data.lastName?.trim())
            newErrors.lastName = "Last name is required";

        if (!data.email?.trim())
            newErrors.email = "Email is required";

        if (data.email && !/\S+@\S+\.\S+/.test(data.email))
            newErrors.email = "Invalid email";

        if (!data.password || data.password.length < 8)
            newErrors.password = "Minimum 8 characters";

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

            subtitle="Let's build your personal AI Nutrition Operating System."

        >

            <Input

                icon="👤"

                placeholder="First Name"

                value={data.firstName || ""}

                error={errors.firstName}

                onChange={(e) =>
                    updateData("firstName", e.target.value)
                }

            />

            <Input

                icon="👤"

                placeholder="Last Name"

                value={data.lastName || ""}

                error={errors.lastName}

                onChange={(e) =>
                    updateData("lastName", e.target.value)
                }

            />

            <Input

                icon="📧"

                type="email"

                placeholder="Email Address"

                value={data.email || ""}

                error={errors.email}

                onChange={(e) =>
                    updateData("email", e.target.value)
                }

            />

            <div
                style={{
                    position: "relative"
                }}
            >

                <Input

                    icon="🔒"

                    type={
                        showPassword
                            ? "text"
                            : "password"
                    }

                    placeholder="Password"

                    value={data.password || ""}

                    error={errors.password}

                    onChange={(e) =>
                        updateData("password", e.target.value)
                    }

                    style={{
                        paddingRight: "55px"
                    }}

                />

                <span

                    onClick={() =>
                        setShowPassword(!showPassword)
                    }

                    style={{

                        position: "absolute",

                        right: "18px",

                        top: "18px",

                        cursor: "pointer",

                        color: "#94a3b8",

                        fontSize: "18px"

                    }}

                >

                    {showPassword ? "🙈" : "👁"}

                </span>

            </div>

            <NextButton

                onClick={continueStep}

                text="Continue"

            />

        </StepCard>

    );

}