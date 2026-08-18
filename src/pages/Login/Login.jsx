import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/authService";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import "../../styles/login.css";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin() {

        setError("");

        if (!email || !password) {

            setError("Please enter email and password.");

            return;

        }

        try {

            setLoading(true);

            const response = await login(

                email,

                password

            );

            if (!response.access_token) {

                setError("Login failed.");

                return;

            }

            localStorage.setItem(

                "access_token",

                response.access_token

            );

            navigate("/dashboard");

        }

        catch (err) {

            console.error(err);

            setError(

                err.response?.data?.detail ||

                "Unable to login."

            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="login-container">

            <div

                className="login-card"

                style={{

                    maxWidth: "480px",

                    borderRadius: "28px",

                    padding: "45px",

                    background: "rgba(25,25,35,.80)",

                    backdropFilter: "blur(18px)",

                    border: "1px solid rgba(255,255,255,.08)"

                }}

            >

                <div

                    className="logo-section"

                    style={{

                        textAlign: "center",

                        marginBottom: "35px"

                    }}

                >

                    <h1
                        style={{
                            fontSize: "40px"
                        }}
                    >
                        🥗 NutritionOS
                    </h1>

                    <p
                        style={{
                            color: "#94a3b8"
                        }}
                    >
                        AI Powered Nutrition Operating System
                    </p>

                </div>

                <Input

                    label="Email"

                    icon="📧"

                    type="email"

                    placeholder="Enter your email"

                    value={email}

                    onChange={(e)=>

                        setEmail(

                            e.target.value

                        )

                    }

                />

                <Input

                    label="Password"

                    icon="🔒"

                    type="password"

                    placeholder="Enter your password"

                    value={password}

                    onChange={(e)=>

                        setPassword(

                            e.target.value

                        )

                    }

                />

                {

                    error && (

                        <div

                            style={{

                                color: "#ef4444",

                                textAlign: "center",

                                marginBottom: "18px"

                            }}

                        >

                            {error}

                        </div>

                    )

                }

                <Button

                    onClick={handleLogin}

                    disabled={loading}

                >

                    {

                        loading

                            ? "Signing In..."

                            : "Sign In"

                    }

                </Button>

                <p

                    style={{

                        color: "#94a3b8",

                        textAlign: "center",

                        marginTop: "30px"

                    }}

                >

                    Don't have an account?

                    <span

                        onClick={()=>

                            navigate("/register")

                        }

                        style={{

                            color: "#8b5cf6",

                            cursor: "pointer",

                            marginLeft: "8px",

                            fontWeight: "700"

                        }}

                    >

                        Create Account

                    </span>

                </p>

            </div>

        </div>

    );

}