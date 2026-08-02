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

    return (

        <StepCard

            title="Personal Information"

            subtitle="These values help our AI personalise your nutrition."

        >

            <div className="form-group">

                <label>Age</label>

                <input

                    type="number"

                    placeholder="Enter your age"

                    value={data.age}

                    onChange={(e)=>

                        updateData("age",e.target.value)

                    }

                />

                <small>{errors.age}</small>

            </div>

            <div className="form-group">

                <label>Gender</label>

                <select

                    value={data.gender}

                    onChange={(e)=>

                        updateData("gender",e.target.value)

                    }

                >

                    <option value="">

                        Select Gender

                    </option>

                    <option value="Male">

                        Male

                    </option>

                    <option value="Female">

                        Female

                    </option>

                    <option value="Other">

                        Other

                    </option>

                </select>

                <small>{errors.gender}</small>

            </div>

            <div className="form-group">

                <label>Height (cm)</label>

                <input

                    type="number"

                    placeholder="170"

                    value={data.height}

                    onChange={(e)=>

                        updateData("height",e.target.value)

                    }

                />

                <small>{errors.height}</small>

            </div>

            <div className="form-group">

                <label>Weight (kg)</label>

                <input

                    type="number"

                    placeholder="70"

                    value={data.weight}

                    onChange={(e)=>

                        updateData("weight",e.target.value)

                    }

                />

                <small>{errors.weight}</small>

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