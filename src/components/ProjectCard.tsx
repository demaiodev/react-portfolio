import React from "react";
import { Link as LinkIcon, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  url: string;
  github: string;
  tech: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  url,
  github,
  tech,
}) => {
  return (
    <div
      className={`p-6 border rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl`}
      style={{
        borderColor: "var(--accent-500)",
        backgroundColor: "var(--nav-bg)",
      }}
    >
      <h3
        className="text-2xl font-semibold mb-1"
        style={{ color: "var(--accent-600)" }}
      >
        {title}
      </h3>
      <div className="mb-2">
        {tech.map((t) => {
          return (
            <span
              className="text-xs mr-2 rounded-xl p-1 px-2"
              style={{
                color: "var(--accent-100)",
                backgroundColor: "var(--accent-600)",
              }}
            >
              {t}
            </span>
          );
        })}
      </div>

      <p className={`text-base mb-4`}>{description}</p>
      <div className="flex space-x-4">
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center space-x-1 hover:underline text-sm font-medium transition-colors`}
            style={{ color: "var(--accent-500)" }}
          >
            <LinkIcon className="w-4 h-4" />
            <span>Visit</span>
          </a>
        )}

        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center space-x-1 hover:underline text-sm font-medium transition-colors`}
          style={{ color: "var(--accent-500)" }}
        >
          <Github className="w-4 h-4" />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
