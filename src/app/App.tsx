import { useState, useEffect } from "react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CursorTracker } from "./components/CursorTracker";
import { SectionReveal } from "./components/SectionReveal";
import { MotionBackground } from "./components/MotionBackground";
import { Navbar } from "./components/Navbar";
import { ScrollProgress } from "./components/ScrollProgress";
import { Resume } from "./components/Resume";
import { LoadingScreen } from "./components/LoadingScreen";
import { CursorLight } from "./components/CursorLight";
import { useTheme } from "./ui/ThemeProvider";
import Login from "./pages/Login";
import AdminDashboard from "./pages/Admin";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"portfolio" | "login" | "admin">("portfolio");
  const [token, setToken] = useState<string | null>(localStorage.getItem("adminToken"));

  useEffect(() => {
    // Check if we should show admin based on hash
    if (window.location.hash === "#admin") {
      if (token) setView("admin");
      else setView("login");
    }
  }, [token]);

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("adminToken", newToken);
    setView("admin");
    window.location.hash = "#admin";
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("adminToken");
    setView("portfolio");
    window.location.hash = "";
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  if (view === "login") {
    return <Login onLogin={handleLogin} />;
  }

  if (view === "admin" && token) {
    return <AdminDashboard token={token} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen cursor-none relative">
      <CursorLight />
      <ScrollProgress />
      <CursorTracker />
      <Navbar onThemeToggle={toggleTheme} isDark={theme === 'dark'} />
      <div className="relative z-10">
        <section id="hero">
          <MotionBackground variant="hero">
            <Hero />
          </MotionBackground>
        </section>
        <SectionReveal label="About Me" id="about">
          <MotionBackground variant="about">
            <About />
          </MotionBackground>
        </SectionReveal>
        <SectionReveal label="Resume" id="resume">
          <MotionBackground variant="about">
            <Resume />
          </MotionBackground>
        </SectionReveal>
        <SectionReveal label="Featured Projects" id="projects">
          <MotionBackground variant="projects">
            <Projects />
          </MotionBackground>
        </SectionReveal>
        <SectionReveal label="Skills & Expertise" id="skills">
          <MotionBackground variant="skills">
            <Skills />
          </MotionBackground>
        </SectionReveal>
        <SectionReveal label="Get In Touch" id="contact">
          <MotionBackground variant="contact">
            <Contact />
          </MotionBackground>
        </SectionReveal>
        <Footer />
        
        {/* Admin trigger removed to avoid layout spacer */}
      </div>
    </div>
  );
}