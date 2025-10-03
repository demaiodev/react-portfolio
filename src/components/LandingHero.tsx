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
      <Link to="/projects">
        <div
          className="
        group relative rounded-xl p-[2px] 
        shadow-aura-hover 
        transition-all duration-300 ease-out
        pointer
      "
        >
          <div
            className="
          absolute inset-0 z-0 rounded-xl
          bg-gradient-to-r from-blue-500 via-indigo-600  to-green-600 
          opacity-0 
          transition-opacity duration-300 ease-out
          group-hover:opacity-100 
          group-hover:scale-[1.03] /* Slight scale for visual pop */
        "
          ></div>
          <button
            className="
          relative z-10 px-8 py-3 text-lg font-bold text-white rounded-[10px] 
          bg-gray-800 
          transition-colors duration-300 ease-out 
          group-hover:bg-gray-700 flex items-center space-x-2 shadow-lg 
        "
          >
            <span>Recent Work</span>
            <ArrowRight />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default LandingHero;
