import { useState } from "react";
import { useNavigate } from "react-router-dom";

import StepCard from "../../components/onboarding/StepCard";
import BackButton from "../../components/onboarding/BackButton";

import { register, login } from "../../services/authService";
import { updateProfile } from "../../services/profileService";

export default function Finish({

    data,

    previousStep

}) {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    async function createProfile() {

        try {

            setLoading(true);

            // =============================
            // Register User
            // =============================

            const registerResponse = await register({

                name: `${data.firstName} ${data.lastName}`,

                email: data.email,

                password: data.password

            });

            if (!registerResponse.success) {

                alert(registerResponse.message);

                return;

            }

            // =============================
            // Login User
            // =============================

            const loginResponse = await login(

                data.email,

                data.password

            );

            if (!loginResponse.access_token) {

                alert("Unable to login after registration.");

                return;

            }

            localStorage.setItem(

                "access_token",

                loginResponse.access_token

            );

            // =============================
            // Save Profile
            // =============================

            await updateProfile({

                name: `${data.firstName} ${data.lastName}`,

                age: Number(data.age),

                gender: data.gender,

                height_cm: Number(data.height),

                weight_kg: Number(data.weight),

                goal: data.goal,

                activity_level: data.activityLevel,

                daily_budget: Number(data.budget),

                diet_preferences: data.diet

            });

            alert("🎉 Welcome to NutritionOS!");

            navigate("/dashboard");

        }

        catch (err) {

            console.error(err);

            alert(

                err.response?.data?.detail ||

                err.message ||

                "Something went wrong."

            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <StepCard

            title="🎉 You're Ready!"

            subtitle="Review your information before creating your AI Nutrition Operating System."

        >

            <div
                style={{
                    background: "#111827",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "20px",
                    padding: "24px",
                    color: "white",
                    lineHeight: "2"
                }}
            >

                <p><strong>👤 Name:</strong> {data.firstName} {data.lastName}</p>

                <p><strong>📧 Email:</strong> {data.email}</p>

                <p><strong>🎂 Age:</strong> {data.age}</p>

                <p><strong>⚧ Gender:</strong> {data.gender}</p>

                <p><strong>📏 Height:</strong> {data.height} cm</p>

                <p><strong>⚖ Weight:</strong> {data.weight} kg</p>

                <p><strong>🎯 Goal:</strong> {data.goal}</p>

                <p><strong>🥗 Diet:</strong> {data.diet}</p>

                <p><strong>💰 Daily Budget:</strong> ₹{data.budget}</p>

                <p><strong>🏃 Activity:</strong> {data.activityLevel}</p>

                <p><strong>😴 Sleep:</strong> {data.sleepHours} hrs</p>

                <p><strong>💪 Workouts:</strong> {data.workoutsPerWeek} / week</p>

            </div>

            <button

                onClick={createProfile}

                disabled={loading}

                style={{

                    marginTop: "30px",

                    width: "100%",

                    padding: "18px",

                    border: "none",

                    borderRadius: "18px",

                    cursor: "pointer",

                    background:
                        "linear-gradient(135deg,#8b5cf6,#6366f1)",

                    color: "white",

                    fontSize: "17px",

                    fontWeight: "700",

                    transition: "0.25s",

                    boxShadow:
                        "0 15px 35px rgba(99,102,241,.35)"

                }}

            >

                {

                    loading

                        ? "🚀 Creating your NutritionOS..."

                        : "🚀 Create My NutritionOS"

                }

            </button>

            <BackButton

                onClick={previousStep}

            />

        </StepCard>

    );

}