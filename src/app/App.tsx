import { useState } from "react";
import { AnimatePresence } from "framer-motion";import { LoadingScreen } from "./components/LoadingScreen";
import { VantaBackground } from "./components/VantaBackground";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Certifications } from "./components/Certifications";
import { Achievements } from "./components/Achievements";
import { TechStack } from "./components/TechStack";
import { GitHubStats } from "./components/GitHubStats";
import { LeetCode } from "./components/LeetCode";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Resume } from "./components/Resume";
import { ScrollProgress } from "./components/ScrollProgress";
import { CursorTracker } from "./components/CursorTracker";
import { CursorLight } from "./components/CursorLight";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative min-h-screen cursor-none">
          {/* Full-screen Vanta NET background */}
          <VantaBackground />

          {/* Global UI effects */}
          <CursorLight />
          <CursorTracker />
          <ScrollProgress />

          {/* Sticky nav — dark-only, no theme toggle */}
          <Navbar />

          {/* All sections stack above the background */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Resume />
            <Certifications />
            <Achievements />
            <TechStack />
            <GitHubStats />
            <LeetCode />
            <Contact />
          </main>

          <Footer />
        </div>
      )}
    </>
  );
}
