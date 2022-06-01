import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"


const OtherPage = () =>{

    const navigate = useNavigate()

    return(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
        <div>
            <h1>Yolooooo</h1>
            <button onClick={() => navigate("/")}> goto mainPage </button>

        </div>
        </motion.div>

    )
}

export default OtherPage