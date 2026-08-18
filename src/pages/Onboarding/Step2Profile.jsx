import { useState } from "react";

import StepCard from "../../components/onboarding/StepCard";
import NextButton from "../../components/onboarding/NextButton";
import BackButton from "../../components/onboarding/BackButton";

export default function Step2Profile({

    data,
    updateData,
    nextStep,
    previousStep

}) {

    const [errors, setErrors] = useState({});

    function validate() {

        let newErrors = {};

        if (!data.age)
            newErrors.age = "Age is required";

        if (!data.gender)
            newErrors.gender = "Please select gender";

        if (!data.height)
            newErrors.height = "Height is required";

        if (!data.weight)
            newErrors.weight = "Weight is required";

        if (Number(data.age) < 13)
            newErrors.age = "Minimum age is 13";

        if (Number(data.height) < 80)
            newErrors.height = "Invalid height";

        if (Number(data.weight) < 20)
            newErrors.weight = "Invalid weight";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    }

    function continueStep() {

        if (validate()) {

            nextStep();

        }

    }

    const inputStyle = {

        width: "100%",

        padding: "16px",

        borderRadius: "16px",

        border: "1px solid rgba(255,255,255,.12)",

        background: "#111827",

        color: "white",

        fontSize: "15px",

        outline: "none",

        boxSizing: "border-box"

    };

    const errorStyle = {

        color: "#ef4444",

        fontSize: "13px",

        marginTop: "6px",

        marginBottom: "12px"

    };

    function GenderCard({ value, emoji }) {

        const active = data.gender === value;

        return (

            <div

                onClick={() => updateData("gender", value)}

                style={{

                    flex: 1,

                    cursor: "pointer",

                    padding: "18px",

                    borderRadius: "18px",

                    textAlign: "center",

                    border: active
                        ? "2px solid #8b5cf6"
                        : "1px solid rgba(255,255,255,.12)",

                    background: active
                        ? "rgba(139,92,246,.15)"
                        : "#111827",

                    transition: ".25s"

                }}

            >

                <div
                    style={{
                        fontSize: "34px"
                    }}
                >
                    {emoji}
                </div>

                <div
                    style={{
                        color: "white",
                        marginTop: "10px"
                    }}
                >
                    {value}
                </div>

            </div>

        );

    }

    return (

        <StepCard

            title="Personal Information"

            subtitle="These values help NutritionOS calculate your calories, BMI and daily nutrition."

        >

            <input

                style={inputStyle}

                type="number"

                placeholder="🎂 Age"

                value={data.age}

                onChange={(e)=>

                    updateData("age",e.target.value)

                }

            />

            <div style={errorStyle}>{errors.age}</div>

            <div

                style={{

                    display:"flex",

                    gap:"15px",

                    marginBottom:"10px"

                }}

            >

                <GenderCard

                    value="Male"

                    emoji="👨"

                />

                <GenderCard

                    value="Female"

                    emoji="👩"

                />

                <GenderCard

                    value="Other"

                    emoji="🧑"

                />

            </div>

            <div style={errorStyle}>{errors.gender}</div>

            <input

                style={inputStyle}

                type="number"

                placeholder="📏 Height (cm)"

                value={data.height}

                onChange={(e)=>

                    updateData("height",e.target.value)

                }

            />

            <div style={errorStyle}>{errors.height}</div>

            <input

                style={inputStyle}

                type="number"

                placeholder="⚖ Weight (kg)"

                value={data.weight}

                onChange={(e)=>

                    updateData("weight",e.target.value)

                }

            />

            <div style={errorStyle}>{errors.weight}</div>

            <div

                style={{

                    display:"flex",

                    gap:"15px",

                    marginTop:"25px"

                }}

            >

                <BackButton

                    onClick={previousStep}

                />

                <NextButton

                    onClick={continueStep}

                    text="Continue"

                />

            </div>

        </StepCard>

    );

}