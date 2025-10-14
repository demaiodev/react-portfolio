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
      className={`p-4 border rounded-xl shadow-lg transition-all duration-300 cursor-default`}
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
              key={t}
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
            className={`flex items-center space-x-1 hover:scale-110 text-sm font-medium underline`}
            style={{ color: "var(--accent-600)" }}
          >
            <LinkIcon className="w-5 h-5" />
            <span>Visit</span>
          </a>
        )}

        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center space-x-1 hover:scale-110 text-sm font-medium underline`}
          style={{ color: "var(--accent-600)" }}
        >
          <Github className="w-5 h-5" />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
