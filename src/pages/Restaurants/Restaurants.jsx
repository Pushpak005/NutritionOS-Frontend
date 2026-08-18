import { useEffect, useMemo, useState } from "react";

import { getRestaurants } from "../../services/restaurantService";

import RestaurantCard from "../../components/cards/RestaurantCard";
import Input from "../../components/ui/Input";

export default function Restaurants() {

    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [area, setArea] = useState("All");

    useEffect(() => {

        async function loadRestaurants() {

            try {

                const data = await getRestaurants();

                setRestaurants(data);

            }

            catch (err) {

                console.error(err);

            }

            finally {

                setLoading(false);

            }

        }

        loadRestaurants();

    }, []);

    const areas = useMemo(() => {

        return [

            "All",

            ...new Set(

                restaurants.map(

                    restaurant => restaurant.area

                )

            )

        ];

    }, [restaurants]);

    const filteredRestaurants = restaurants.filter(

        (restaurant) => {

            const matchesSearch =

                restaurant.restaurant_name

                    .toLowerCase()

                    .includes(

                        search.toLowerCase()

                    );

            const matchesArea =

                area === "All" ||

                restaurant.area === area;

            return (

                matchesSearch &&

                matchesArea

            );

        }

    );

    if (loading) {

        return (

            <h2

                style={{

                    color: "white",

                    textAlign: "center",

                    marginTop: "100px"

                }}

            >

                Loading Restaurants...

            </h2>

        );

    }

    return (

        <div

            style={{

                maxWidth: "1200px",

                margin: "0 auto",

                padding: "30px",

                color: "white"

            }}

        >

            <h1>

                🍽 Browse Restaurants

            </h1>

            <div

                style={{

                    display: "flex",

                    gap: "15px",

                    marginTop: "25px",

                    marginBottom: "35px",

                    alignItems: "center"

                }}

            >

                <div style={{ flex: 1 }}>

                    <Input

                        icon="🔍"

                        placeholder="Search restaurants..."

                        value={search}

                        onChange={(e) =>

                            setSearch(

                                e.target.value

                            )

                        }

                    />

                </div>

                <select

                    value={area}

                    onChange={(e) =>

                        setArea(

                            e.target.value

                        )

                    }

                    style={{

                        padding: "16px",

                        borderRadius: "16px",

                        background: "#111827",

                        color: "white",

                        border: "1px solid rgba(255,255,255,.12)",

                        outline: "none",

                        minWidth: "180px"

                    }}

                >

                    {

                        areas.map((areaName) => (

                            <option

                                key={areaName}

                                value={areaName}

                            >

                                {areaName}

                            </option>

                        ))

                    }

                </select>

            </div>

            {

                filteredRestaurants.length === 0 && (

                    <h3

                        style={{

                            textAlign: "center",

                            color: "#94a3b8"

                        }}

                    >

                        No restaurants found.

                    </h3>

                )

            }

            {

                filteredRestaurants.map(

                    (restaurant) => (

                        <RestaurantCard

                            key={

                                restaurant.restaurant_id

                            }

                            restaurant={restaurant}

                        />

                    )

                )

            }

        </div>

    );

}