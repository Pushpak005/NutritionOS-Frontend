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
            newErrors.goal = "Select a goal";

        if (!data.diet)
            newErrors.diet = "Select a diet";

        if (!data.budget)
            newErrors.budget = "Enter your budget";

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

            title="Nutrition Goals"

            subtitle="Your AI recommendations will be personalised using these preferences."

        >

            <div className="form-group">

                <label>Goal</label>

                <select

                    value={data.goal}

                    onChange={(e)=>

                        updateData("goal",e.target.value)

                    }

                >

                    <option value="">

                        Select Goal

                    </option>

                    <option value="Weight Loss">

                        Weight Loss

                    </option>

                    <option value="Muscle Gain">

                        Muscle Gain

                    </option>

                    <option value="Maintain">

                        Maintain Weight

                    </option>

                </select>

                <small>{errors.goal}</small>

            </div>

            <div className="form-group">

                <label>Diet Preference</label>

                <select

                    value={data.diet}

                    onChange={(e)=>

                        updateData("diet",e.target.value)

                    }

                >

                    <option value="">

                        Select Diet

                    </option>

                    <option value="Veg">

                        Vegetarian

                    </option>

                    <option value="Non Veg">

                        Non Vegetarian

                    </option>

                    <option value="Vegan">

                        Vegan

                    </option>

                </select>

                <small>{errors.diet}</small>

            </div>

            <div className="form-group">

                <label>Daily Food Budget (₹)</label>

                <input

                    type="number"

                    placeholder="500"

                    value={data.budget}

                    onChange={(e)=>

                        updateData("budget",e.target.value)

                    }

                />

                <small>{errors.budget}</small>

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