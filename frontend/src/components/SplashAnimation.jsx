import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../animations/Cyber Attack.json";

export default function SplashAnimation() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 6000); // duration animation stays
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}   // 👈 smooth fade out
          transition={{ duration: 1 }} // fade time
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Lottie animationData={animationData} loop={false} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
