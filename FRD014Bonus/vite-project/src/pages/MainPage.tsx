import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import Lottie from 'react-lottie-player'

import robot from "../lotterLogo/robot.json"

const MainPage = () =>{

    const navigate = useNavigate()

    return(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
        <div>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <Lottie
                loop
                animationData={robot}
                play
                style={{ width: 1500, height: 1500 }}
                />

            <motion.div whileHover={{ scale: 1.2 }}>
                <h1>I can click / pover </h1>
            </motion.div>

            <h1>Hello</h1>
            <h1>Hello</h1>
            <button onClick={() => navigate("/other")}> goto otherPage </button>
        </div>
        </motion.div>
    )
}

export default MainPage