import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const LandingHero: React.FC<{ textColor?: string }> = ({ textColor }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-20">
      <h1
        className="text-6xl font-extrabold mb-4 transition-colors"
        style={{ color: textColor }}
      >
        Hi, I'm <span style={{ color: "var(--accent-600)" }}>Chris.</span>
      </h1>
      <p className={`text-2xl mb-8`}>Full Stack Web Developer</p>
      <p className={`text-md mb-8`}>
        I've been creating web applications and software using JavaScript,
        TypeScript and Node.js for 8 years.
      </p>
      <Link
        to="/projects"
        className={`px-6 py-3 font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2`}
        style={{
          backgroundColor: "var(--accent-600)",
          color: "var(--accent-contrast-text)",
          border: `1px solid var(--accent-500)`,
        }}
      >
        <span>Recent Work</span>
        <ArrowRight />
      </Link>
    </div>
  );
};

export default LandingHero;
