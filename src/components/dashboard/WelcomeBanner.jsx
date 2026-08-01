import { motion } from "framer-motion";

export default function WelcomeBanner({ name, goal }) {

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";

    return (

        <motion.div

            initial={{ opacity: 0, y: -20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.6 }}

            style={{

                background: "linear-gradient(135deg,#7c3aed,#5b21b6)",

                padding: "30px",

                borderRadius: "20px",

                color: "white",

                marginBottom: "30px"

            }}

        >

            <h1>

                {greeting}, {name} 👋

            </h1>

            <p>

                Goal : {goal}

            </p>

        </motion.div>

    );

}