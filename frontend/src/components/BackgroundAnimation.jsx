import Lottie from "lottie-react";
import animationData from "../animations/Cyber Attack.json";

function BackgroundAnimation() {
  return (
    <Lottie animationData={animationData} loop autoplay style={{position: "fixed",width: "100%",height: "100%",zIndex: 0}}
    />
  );
}

export default BackgroundAnimation;
