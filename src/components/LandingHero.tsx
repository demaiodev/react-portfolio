import React from "react";
import { ArrowRight, Linkedin, Github } from "lucide-react";
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
      <p className={`text-2xl mb-4`}>Full-Stack Engineer & Web Developer.</p>
      <div className="flex mb-4 justify-center items-center">
        <div
          className=" mx-1 p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none"
          style={{
            color: "var(--accent-100)",
            backgroundColor: "var(--accent-600)",
          }}
        >
          <Link
            to="https://www.linkedin.com/in/christopher-demaio/"
            target="_blank"
          >
            <Linkedin size={35} />
          </Link>
        </div>
        <div
          className=" mx-1 p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none"
          style={{
            color: "var(--accent-100)",
            backgroundColor: "var(--accent-600)",
          }}
        >
          <Link to="https://github.com/demaiodev" target="_blank">
            <Github size={35} />
          </Link>
        </div>
      </div>
      <p className={`text-md mb-16`}>
        I've been creating web applications and software using{" "}
        <span className="font-bold" style={{ color: "var(--accent-600)" }}>
          JavaScript
        </span>
        ,{" "}
        <span className="font-bold" style={{ color: "var(--accent-600)" }}>
          TypeScript
        </span>
        , and{" "}
        <span className="font-bold" style={{ color: "var(--accent-600)" }}>
          Node.js
        </span>{" "}
        for{" "}
        <span className="font-bold" style={{ color: "var(--accent-600)" }}>
          8 years
        </span>
        .
      </p>
      <Link to="/projects">
        <div
          className="
        group relative rounded-xl p-[2px] 
        shadow-aura-hover 
        transition-all duration-300 ease-out
      "
        >
          <div
            className="
          absolute inset-0 z-0 rounded-xl
          bg-gradient-to-r from-blue-400 via-indigo-500  to-green-400 
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
            <span>Recent Works</span>
            <ArrowRight />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default LandingHero;
