import { useState } from "react";

import StepCard from "../../components/onboarding/StepCard";
import NextButton from "../../components/onboarding/NextButton";
import BackButton from "../../components/onboarding/BackButton";

export default function Step4Lifestyle({

    data,

    updateData,

    nextStep,

    previousStep

}) {

    const [errors, setErrors] = useState({});

    function validate() {

        let newErrors = {};

        if (!data.activityLevel)
            newErrors.activityLevel = "Please select activity level.";

        if (!data.sleepHours)
            newErrors.sleepHours = "Enter sleep hours.";

        if (!data.workoutsPerWeek)
            newErrors.workoutsPerWeek = "Enter workouts per week.";

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

        marginTop: "6px",

        marginBottom: "12px"

    };

    function ActivityCard({

        value,

        emoji,

        title

    }) {

        const active = data.activityLevel === value;

        return (

            <div

                onClick={() =>

                    updateData(

                        "activityLevel",

                        value

                    )

                }

                style={{

                    cursor: "pointer",

                    padding: "18px",

                    borderRadius: "18px",

                    textAlign: "center",

                    background: active
                        ? "rgba(139,92,246,.18)"
                        : "#111827",

                    border: active
                        ? "2px solid #8b5cf6"
                        : "1px solid rgba(255,255,255,.12)",

                    transition: ".25s"

                }}

            >

                <div
                    style={{
                        fontSize: "30px"
                    }}
                >
                    {emoji}
                </div>

                <div
                    style={{
                        color: "white",
                        marginTop: "10px",
                        fontWeight: "600",
                        fontSize: "14px"
                    }}
                >
                    {title}
                </div>

            </div>

        );

    }

    return (

        <StepCard

            title="Lifestyle"

            subtitle="Help NutritionOS understand your daily routine."

        >

            <h3
                style={{
                    color: "white"
                }}
            >
                🏃 Activity Level
            </h3>

            <div

                style={{

                    display: "grid",

                    gridTemplateColumns: "1fr 1fr",

                    gap: "15px"

                }}

            >

                <ActivityCard

                    value="Sedentary"

                    title="Sedentary"

                    emoji="🛋️"

                />

                <ActivityCard

                    value="Lightly Active"

                    title="Light"

                    emoji="🚶"

                />

                <ActivityCard

                    value="Moderately Active"

                    title="Moderate"

                    emoji="🏃"

                />

                <ActivityCard

                    value="Very Active"

                    title="Very Active"

                    emoji="🏋️"

                />

                <ActivityCard

                    value="Athlete"

                    title="Athlete"

                    emoji="🥇"

                />

            </div>

            <div style={errorStyle}>
                {errors.activityLevel}
            </div>

            <h3
                style={{
                    color: "white"
                }}
            >
                😴 Average Sleep
            </h3>

            <input

                style={inputStyle}

                type="number"

                placeholder="8 Hours"

                value={data.sleepHours}

                onChange={(e)=>

                    updateData(

                        "sleepHours",

                        e.target.value

                    )

                }

            />

            <div style={errorStyle}>
                {errors.sleepHours}
            </div>

            <h3
                style={{
                    color: "white"
                }}
            >
                💪 Gym Sessions / Week
            </h3>

            <input

                style={inputStyle}

                type="number"

                placeholder="4"

                value={data.workoutsPerWeek}

                onChange={(e)=>

                    updateData(

                        "workoutsPerWeek",

                        e.target.value

                    )

                }

            />

            <div style={errorStyle}>
                {errors.workoutsPerWeek}
            </div>

            <div

                style={{

                    display: "flex",

                    gap: "15px",

                    marginTop: "25px"

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