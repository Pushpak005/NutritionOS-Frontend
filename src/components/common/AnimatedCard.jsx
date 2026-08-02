import { motion } from "framer-motion";

export default function AnimatedCard({ children, delay = 0 }) {

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 30
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            whileHover={{
                scale: 1.02
            }}

            transition={{
                duration: 0.4,
                delay
            }}

            style={{
                width: "100%"
            }}

        >

            {children}

        </motion.div>

    );

}