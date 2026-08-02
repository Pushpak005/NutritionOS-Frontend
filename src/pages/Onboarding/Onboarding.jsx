import { useState } from "react";

import ProgressBar from "../../components/onboarding/ProgressBar";

import Step1Account from "./Step1Account";
import Step2Profile from "./Step2Profile";
import Step3Goals from "./Step3Goals";
import Step4Lifestyle from "./Step4Lifestyle";
import Step5Devices from "./Step5Devices";
import Finish from "./Finish";

export default function Onboarding() {

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({

        // Account
        firstName: "",
        lastName: "",
        email: "",
        password: "",

        // Profile
        age: "",
        gender: "",
        height: "",
        weight: "",

        // Goals
        goal: "",
        diet: "",
        budget: "",

        // Lifestyle
        activityLevel: "",
        sleepHours: "",
        workoutsPerWeek: "",

        // Devices
        connectFitbit: false,
        connectGoogleFit: false,
        connectAppleHealth: false,
        connectGarmin: false

    });

    function updateData(key, value) {

        setFormData(prev => ({
            ...prev,
            [key]: value
        }));

    }

    function nextStep() {

        setStep(prev => prev + 1);

    }

    function previousStep() {

        setStep(prev => prev - 1);

    }

    return (

        <div>

            <ProgressBar

                step={step}

                total={6}

            />

            {

                step === 1 && (

                    <Step1Account

                        data={formData}

                        updateData={updateData}

                        nextStep={nextStep}

                    />

                )

            }

            {

                step === 2 && (

                    <Step2Profile

                        data={formData}

                        updateData={updateData}

                        nextStep={nextStep}

                        previousStep={previousStep}

                    />

                )

            }

            {

                step === 3 && (

                    <Step3Goals

                        data={formData}

                        updateData={updateData}

                        nextStep={nextStep}

                        previousStep={previousStep}

                    />

                )

            }

            {

                step === 4 && (

                    <Step4Lifestyle

                        data={formData}

                        updateData={updateData}

                        nextStep={nextStep}

                        previousStep={previousStep}

                    />

                )

            }

            {

                step === 5 && (

                    <Step5Devices

                        data={formData}

                        updateData={updateData}

                        nextStep={nextStep}

                        previousStep={previousStep}

                    />

                )

            }

            {

                step === 6 && (

                    <Finish

                        data={formData}

                        previousStep={previousStep}

                    />

                )

            }

        </div>

    );

}