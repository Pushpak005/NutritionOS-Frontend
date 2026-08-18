import { useEffect, useState } from "react";

import { getNutritionScore } from "../../services/scoreService";

import {
  requestHealthPermissions,
  getHealthConnectSteps
} from "../../services/healthConnect";


export default function HealthSnapshot({
  profile,
  consumed
}) {

  const [score, setScore] = useState(null);

  const [steps, setSteps] = useState(0);

  const [healthConnected, setHealthConnected] = useState(false);

  const [healthLoading, setHealthLoading] = useState(false);


  useEffect(() => {

    async function loadScore() {

      try {

        const data = await getNutritionScore();

        setScore(data);

      }

      catch (error) {

        console.error(
          "Nutrition score error:",
          error
        );

      }

    }

    loadScore();

  }, []);


  async function connectHealth() {

    try {

      setHealthLoading(true);


      const permissionResult =
        await requestHealthPermissions();


      if (!permissionResult?.granted) {

        setHealthConnected(false);

        return;

      }


      const stepsResult =
        await getHealthConnectSteps();


      setSteps(
        stepsResult?.steps || 0
      );

      setHealthConnected(true);

    }

    catch (error) {

      console.error(
        "Health Connect error:",
        error
      );

      setHealthConnected(false);

    }

    finally {

      setHealthLoading(false);

    }

  }


  const calories =
    consumed?.calories || 0;

  const protein =
    consumed?.protein || 0;

  const dailyCalories =
    profile?.daily_calories || 0;

  const dailyProtein =
    profile?.daily_protein || 0;


  const caloriePercentage =
    dailyCalories > 0
      ? Math.min(
          (calories / dailyCalories) * 100,
          100
        )
      : 0;


  const proteinPercentage =
    dailyProtein > 0
      ? Math.min(
          (protein / dailyProtein) * 100,
          100
        )
      : 0;


  return (

    <section
      className="health-snapshot"
      style={{
        width: "100%",
        boxSizing: "border-box",
        marginBottom: "24px"
      }}
    >

      {/* HEADER */}

      <div
        style={{
          marginBottom: "16px"
        }}
      >

        <div
          style={{
            color: "#8B5CF6",
            fontSize: "13px",
            fontWeight: "700",
            marginBottom: "5px"
          }}
        >
          YOUR HEALTH TODAY
        </div>


        <h2
          style={{
            margin: 0,
            color: "white",
            fontSize: "26px",
            fontWeight: "800"
          }}
        >
          How you're doing today
        </h2>


        <p
          style={{
            margin: "6px 0 0",
            color: "#94A3B8",
            fontSize: "14px"
          }}
        >
          Your current nutrition and activity snapshot.
        </p>

      </div>


      {/* MAIN GRID */}

      <div
        className="health-snapshot-grid"
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(180px,0.8fr) minmax(0,2fr)",
          gap: "14px",
          width: "100%",
          minWidth: 0
        }}
      >


        {/* NUTRITION SCORE */}

        <div
          style={{
            background:
              "linear-gradient(145deg,#1E1B4B,#312E81)",
            borderRadius: "20px",
            padding: "20px",
            color: "white",
            border:
              "1px solid rgba(139,92,246,.25)",
            boxSizing: "border-box",
            minWidth: 0
          }}
        >

          <div
            style={{
              fontSize: "13px",
              color: "#C4B5FD",
              fontWeight: "700"
            }}
          >
            🏆 NUTRITION SCORE
          </div>


          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "4px",
              marginTop: "12px"
            }}
          >

            <span
              style={{
                fontSize: "48px",
                lineHeight: 1,
                fontWeight: "800"
              }}
            >
              {score?.score ?? "--"}
            </span>

            <span
              style={{
                color: "#A5B4FC",
                fontSize: "16px"
              }}
            >
              /100
            </span>

          </div>


          <div
            style={{
              marginTop: "14px",
              height: "7px",
              background:
                "rgba(255,255,255,.12)",
              borderRadius: "999px",
              overflow: "hidden"
            }}
          >

            <div
              style={{
                width:
                  `${Math.min(score?.score || 0, 100)}%`,
                height: "100%",
                background: "#8B5CF6",
                borderRadius: "999px"
              }}
            />

          </div>


          <p
            style={{
              margin: "12px 0 0",
              color: "#CBD5E1",
              fontSize: "13px"
            }}
          >
            Based on today's nutrition intake.
          </p>

        </div>


        {/* STATS */}

        <div
          className="health-stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(2,minmax(0,1fr))",
            gap: "14px",
            minWidth: 0
          }}
        >


          {/* CALORIES */}

          <div
            className="health-stat-card"
            style={{
              background: "#111827",
              border:
                "1px solid rgba(255,255,255,.08)",
              borderRadius: "20px",
              padding: "18px",
              color: "white",
              minWidth: 0,
              boxSizing: "border-box"
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >

              <span
                style={{
                  fontSize: "14px",
                  color: "#CBD5E1"
                }}
              >
                🔥 Calories
              </span>

              <span
                style={{
                  fontSize: "12px",
                  color: "#94A3B8"
                }}
              >
                {caloriePercentage.toFixed(0)}%
              </span>

            </div>


            <div
              style={{
                marginTop: "10px",
                fontSize: "25px",
                fontWeight: "800"
              }}
            >
              {calories}

              <span
                style={{
                  fontSize: "13px",
                  color: "#94A3B8",
                  fontWeight: "400"
                }}
              >
                {" "} / {dailyCalories} kcal
              </span>

            </div>


            <div
              style={{
                marginTop: "10px",
                height: "6px",
                background: "#1F2937",
                borderRadius: "999px",
                overflow: "hidden"
              }}
            >

              <div
                style={{
                  width:
                    `${caloriePercentage}%`,
                  height: "100%",
                  background: "#EF4444"
                }}
              />

            </div>

          </div>


          {/* PROTEIN */}

          <div
            className="health-stat-card"
            style={{
              background: "#111827",
              border:
                "1px solid rgba(255,255,255,.08)",
              borderRadius: "20px",
              padding: "18px",
              color: "white",
              minWidth: 0,
              boxSizing: "border-box"
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >

              <span
                style={{
                  fontSize: "14px",
                  color: "#CBD5E1"
                }}
              >
                🥩 Protein
              </span>

              <span
                style={{
                  fontSize: "12px",
                  color: "#94A3B8"
                }}
              >
                {proteinPercentage.toFixed(0)}%
              </span>

            </div>


            <div
              style={{
                marginTop: "10px",
                fontSize: "25px",
                fontWeight: "800"
              }}
            >
              {protein}

              <span
                style={{
                  fontSize: "13px",
                  color: "#94A3B8",
                  fontWeight: "400"
                }}
              >
                {" "} / {dailyProtein} g
              </span>

            </div>


            <div
              style={{
                marginTop: "10px",
                height: "6px",
                background: "#1F2937",
                borderRadius: "999px",
                overflow: "hidden"
              }}
            >

              <div
                style={{
                  width:
                    `${proteinPercentage}%`,
                  height: "100%",
                  background: "#22C55E"
                }}
              />

            </div>

          </div>


          {/* STEPS */}

          <div
            className="health-stat-card"
            style={{
              background: "#111827",
              border:
                "1px solid rgba(255,255,255,.08)",
              borderRadius: "20px",
              padding: "18px",
              color: "white",
              minWidth: 0,
              boxSizing: "border-box"
            }}
          >

            <div
              style={{
                color: "#CBD5E1",
                fontSize: "14px"
              }}
            >
              🏃 Steps
            </div>


            <div
              style={{
                marginTop: "10px",
                fontSize: "25px",
                fontWeight: "800"
              }}
            >
              {steps.toLocaleString()}
            </div>


            <div
              style={{
                marginTop: "5px",
                color: "#94A3B8",
                fontSize: "12px"
              }}
            >
              {healthConnected
                ? "Connected to Health Connect"
                : "Health Connect not connected"}
            </div>


            <button
              onClick={connectHealth}
              disabled={healthLoading}
              style={{
                marginTop: "10px",
                background: "transparent",
                border: "1px solid rgba(139,92,246,.5)",
                color: "#C4B5FD",
                borderRadius: "10px",
                padding: "7px 10px",
                fontSize: "12px",
                fontWeight: "700",
                cursor:
                  healthLoading
                    ? "default"
                    : "pointer"
              }}
            >
              {healthLoading
                ? "Connecting..."
                : healthConnected
                  ? "Refresh Steps"
                  : "Connect"}
            </button>

          </div>


          {/* GOAL */}

          <div
            className="health-stat-card"
            style={{
              background: "#111827",
              border:
                "1px solid rgba(255,255,255,.08)",
              borderRadius: "20px",
              padding: "18px",
              color: "white",
              minWidth: 0,
              boxSizing: "border-box"
            }}
          >

            <div
              style={{
                color: "#CBD5E1",
                fontSize: "14px"
              }}
            >
              🎯 Goal
            </div>


            <div
              style={{
                marginTop: "10px",
                fontSize: "21px",
                fontWeight: "800"
              }}
            >
              {profile?.goal || "Nutrition"}
            </div>


            <div
              style={{
                marginTop: "7px",
                color: "#94A3B8",
                fontSize: "12px"
              }}
            >
              Daily budget ₹{profile?.daily_budget ?? "--"}
            </div>

          </div>

        </div>

      </div>


      {/* MOBILE */}

      <style>
        {`

          @media (max-width: 767px) {

            .health-snapshot-grid {
              grid-template-columns: 1fr !important;
              gap: 10px !important;
            }

            .health-stats-grid {
              grid-template-columns:
                repeat(2,minmax(0,1fr)) !important;
              gap: 10px !important;
            }

            .health-stat-card {
              padding: 14px !important;
              border-radius: 16px !important;
            }

            .health-snapshot h2 {
              font-size: 23px !important;
            }

          }

          @media (max-width: 360px) {

            .health-stats-grid {
              grid-template-columns: 1fr !important;
            }

          }

        `}
      </style>

    </section>

  );
}