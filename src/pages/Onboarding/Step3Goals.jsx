import { useState } from "react";

import StepCard from "../../components/onboarding/StepCard";
import NextButton from "../../components/onboarding/NextButton";
import BackButton from "../../components/onboarding/BackButton";

export default function Step3Goals({

    data,

    updateData,

    nextStep,

    previousStep

}) {

    const [errors, setErrors] = useState({});

    function validate() {

        let newErrors = {};

        if (!data.goal)
            newErrors.goal = "Please select your goal.";

        if (!data.diet)
            newErrors.diet = "Please select your diet.";

        if (!data.budget)
            newErrors.budget = "Enter your daily budget.";

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

        background: "#111827",

        border: "1px solid rgba(255,255,255,.12)",

        color: "white",

        fontSize: "15px",

        outline: "none",

        boxSizing: "border-box"

    };

    const errorStyle = {

        color: "#ef4444",

        fontSize: "13px",

        marginTop: "8px",

        marginBottom: "15px"

    };

    function SelectCard({

        value,

        title,

        emoji,

        field

    }) {

        const active = data[field] === value;

        return (

            <div

                onClick={() =>

                    updateData(field, value)

                }

                style={{

                    flex: 1,

                    padding: "18px",

                    cursor: "pointer",

                    borderRadius: "18px",

                    background: active
                        ? "rgba(139,92,246,.18)"
                        : "#111827",

                    border: active
                        ? "2px solid #8b5cf6"
                        : "1px solid rgba(255,255,255,.12)",

                    textAlign: "center",

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
                        marginTop: "10px",
                        fontWeight: "600"
                    }}
                >
                    {title}
                </div>

            </div>

        );

    }

    return (

        <StepCard

            title="Nutrition Goals"

            subtitle="Help our AI recommend meals that perfectly match your lifestyle."

        >

            <h3
                style={{
                    color: "white"
                }}
            >
                🎯 Select Goal
            </h3>

            <div
                style={{
                    display: "flex",
                    gap: "15px"
                }}
            >

                <SelectCard

                    field="goal"

                    value="Weight Loss"

                    title="Weight Loss"

                    emoji="🔥"

                />

                <SelectCard

                    field="goal"

                    value="Muscle Gain"

                    title="Muscle Gain"

                    emoji="💪"

                />

                <SelectCard

                    field="goal"

                    value="Maintain"

                    title="Maintain"

                    emoji="⚖"

                />

            </div>

            <div style={errorStyle}>
                {errors.goal}
            </div>

            <h3
                style={{
                    color: "white",
                    marginTop: "10px"
                }}
            >
                🥗 Diet Preference
            </h3>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "15px"
                }}
            >

                <SelectCard

                    field="diet"

                    value="Veg"

                    title="Vegetarian"

                    emoji="🥗"

                />

                <SelectCard

                    field="diet"

                    value="Non Veg"

                    title="Non-Veg"

                    emoji="🍗"

                />

                <SelectCard

                    field="diet"

                    value="Vegan"

                    title="Vegan"

                    emoji="🌱"

                />

                <SelectCard

                    field="diet"

                    value="Eggetarian"

                    title="Eggetarian"

                    emoji="🥚"

                />

            </div>

            <div style={errorStyle}>
                {errors.diet}
            </div>

            <h3
                style={{
                    color: "white"
                }}
            >
                💰 Daily Food Budget
            </h3>

            <input

                style={inputStyle}

                type="number"

                placeholder="₹ 500"

                value={data.budget}

                onChange={(e)=>

                    updateData(

                        "budget",

                        e.target.value

                    )

                }

            />

            <div style={errorStyle}>
                {errors.budget}
            </div>

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