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
            newErrors.activityLevel = "Select activity level";

        if (!data.sleepHours)
            newErrors.sleepHours = "Enter sleep hours";

        if (!data.workoutsPerWeek)
            newErrors.workoutsPerWeek = "Enter workouts per week";

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

            title="Lifestyle"

            subtitle="Help AI understand your daily routine."

        >

            <div className="form-group">

                <label>Activity Level</label>

                <select

                    value={data.activityLevel}

                    onChange={(e)=>

                        updateData("activityLevel",e.target.value)

                    }

                >

                    <option value="">

                        Select Activity

                    </option>

                    <option>

                        Sedentary

                    </option>

                    <option>

                        Lightly Active

                    </option>

                    <option>

                        Moderately Active

                    </option>

                    <option>

                        Very Active

                    </option>

                    <option>

                        Athlete

                    </option>

                </select>

                <small>{errors.activityLevel}</small>

            </div>

            <div className="form-group">

                <label>Average Sleep (Hours)</label>

                <input

                    type="number"

                    placeholder="8"

                    value={data.sleepHours}

                    onChange={(e)=>

                        updateData("sleepHours",e.target.value)

                    }

                />

                <small>{errors.sleepHours}</small>

            </div>

            <div className="form-group">

                <label>Gym Sessions / Week</label>

                <input

                    type="number"

                    placeholder="4"

                    value={data.workoutsPerWeek}

                    onChange={(e)=>

                        updateData("workoutsPerWeek",e.target.value)

                    }

                />

                <small>{errors.workoutsPerWeek}</small>

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