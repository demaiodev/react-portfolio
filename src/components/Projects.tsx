import React from "react";
import projects from "../projects";
import ProjectCard from "./ProjectCard";

const Projects: React.FC<{ textColor?: string }> = ({ textColor }) => {
  return (
    <>
      <h2 className={`text-4xl font-bold mb-8 ${textColor}`}>
        Personal Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </>
  );
};

export default Projects;
