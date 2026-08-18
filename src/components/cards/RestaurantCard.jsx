import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";

export default function RestaurantCard({

    restaurant

}) {

    const navigate = useNavigate();

    return (

        <div

            style={{

                background: "#111827",

                border: "1px solid rgba(255,255,255,.08)",

                borderRadius: "22px",

                padding: "24px",

                marginBottom: "22px",

                color: "white",

                transition: ".25s",

                boxShadow: "0 8px 24px rgba(0,0,0,.18)",

                cursor: "pointer"

            }}

        >

            <div

                style={{

                    display: "flex",

                    justifyContent: "space-between",

                    alignItems: "center"

                }}

            >

                <div>

                    <h2

                        style={{

                            marginBottom: "8px",

                            fontSize: "28px"

                        }}

                    >

                        🍽 {restaurant.restaurant_name}

                    </h2>

                    <p

                        style={{

                            color: "#CBD5E1"

                        }}

                    >

                        📍 {restaurant.area}

                    </p>

                    <p

                        style={{

                            color: "#CBD5E1"

                        }}

                    >

                        ⭐ {restaurant.rating}

                    </p>

                    <p

                        style={{

                            color: "#CBD5E1"

                        }}

                    >

                        🚚 {restaurant.delivery_time} mins

                    </p>

                </div>

                <div

                    style={{

                        background: "#22C55E",

                        color: "white",

                        padding: "10px 18px",

                        borderRadius: "999px",

                        fontWeight: "700",

                        fontSize: "14px"

                    }}

                >

                    🏪 Restaurant

                </div>

            </div>

            <div

                style={{

                    marginTop: "24px"

                }}

            >

                <Button

                    onClick={() =>

                        navigate(

                            `/restaurants/${restaurant.restaurant_id}/menu`

                        )

                    }

                >

                    View Restaurant

                </Button>

            </div>

        </div>

    );

}