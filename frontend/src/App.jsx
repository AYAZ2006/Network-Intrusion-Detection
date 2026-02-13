import { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnalyticsCard from "./components/AnalyticsCard";
import HeroSection from "./components/HeroSection";
import MonitoringPanel from "./components/MonitoringPanel";
import Navbar from "./components/Navbar";
import ChartsSection from "./components/ChartsSection";
import LiveFeed from "./components/LiveFeed";
import Footer from "./components/Footer";
import SplashAnimation from "./components/SplashAnimation";
import ScrollToTopProgress from "./components/ScrollToTopProgress";
function App() {
  const liveFeedRef = useRef(null);
  const reportsRef = useRef(null);
  return (
    <>
      <SplashAnimation />
      <div className="bg-[#080A0D]">
        <Navbar onLogsClick={() => {liveFeedRef.current?.scrollIntoView({ behavior: "smooth" });window.scrollBy(0, 2500);}} onReportsClick={() => {reportsRef.current?.scrollIntoView({ behavior: "smooth" });window.scrollBy(0, 500);}}/>
        <HeroSection />
        <MonitoringPanel />
        <AnalyticsCard />
        <ChartsSection />
        <LiveFeed ref={liveFeedRef} />
        <Footer />
        <ScrollToTopProgress />
      </div>
    </>
  );
}

export default App;