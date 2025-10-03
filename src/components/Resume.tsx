import React from "react";
import { FileDown } from "lucide-react";

const Resume: React.FC<{ textColor?: string }> = ({ textColor }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "public/2025Resume.pdf";
    link.setAttribute("download", "ChrisDemaio2025Resume.pdf"); // Set desired filename
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  return (
    <div className="flex flex-col items-start justify-start h-full py-20">
      <h1
        className="text-4xl font-extrabold mb-8 transition-colors flex items-center w-full"
        style={{ color: textColor }}
      >
        My Resume
        <button
          title="Download PDF of resume"
          aria-label="Download PDF of resume"
          className="cursor-pointer ml-auto p-4"
          style={{ color: "var(--accent-600)" }}
          onClick={handleDownload}
        >
          <div className="flex items-center">
            <FileDown className="w-8 h-8" />
            <span className="text-xs">Download</span>
          </div>
        </button>
      </h1>
      <div>
        <h2 className="text-xl font-bold mt-4">
          <span style={{ color: "var(--accent-600)" }}>
            Professional Software Developer{" "}
          </span>
          |{" "}
          <span style={{ color: "var(--accent-600)" }}>
            DXC Technology - Tampa, FL{" "}
          </span>
          | <span style={{ color: "var(--accent-600)" }}>2020 – 2025</span>
        </h2>
        <ul>
          <li>
            Engineered and deployed a highly-available learning management
            system using Vue.js, React.js, and Node.js, supporting over 500,000
            active users with a track record of 99.9% uptime.
          </li>
          <li>
            Transformed the core user experience by refactoring the web
            application to support seamless cross-device compatibility, filling
            a critical product gap. This included engineering and launching new
            offline services that allowed users to save and view content,
            directly improving user satisfaction and long-term engagement.
          </li>
          <li>
            Optimized the user experience and accessibility of the Vue
            application by creating a remediation plan informed by Lighthouse
            audits, increasing the overall a11y score by 72% (from 55 to 95).
          </li>
          <li>
            Coordinated with backend teams to define and integrate new APIs
            using Postman, enabling new features that increased user retention
            by 45%.
          </li>
          <li>
            Implemented an automated end-to-end testing suite with Cypress,
            boosting overall code coverage to 75% and reducing regression bugs
            by 50%.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold mt-4">
          <span style={{ color: "var(--accent-600)" }}>
            Full Stack Software Developer{" "}
          </span>
          |{" "}
          <span style={{ color: "var(--accent-600)" }}>
            PropLogix - Sarasota, FL{" "}
          </span>
          | <span style={{ color: "var(--accent-600)" }}>2019 – 2020</span>
        </h2>
        <ul>
          <li>
            Engineered and delivered a proprietary real estate application,
            managing the full software development lifecycle from discovery to
            deployment. The application leveraged a .NET back-end with Entity
            Framework, an Angular user interface, and an MSSQL database
          </li>
          <li>
            Collaborated with an agile team of engineers, product managers, and
            QA to deliver 100% of all MVP commitments on or ahead of schedule,
            consistently exceeding project expectations.
          </li>
          <li>
            Facilitated regular syncs with global development teams to
            streamline workflows and delegate tasks, resulting in improved
            cross-functional efficiency and accelerated project timelines.
          </li>
          <li>
            Boosted the application's accessibility score to over 90% by
            leveraging Google's Material Design to create clean, modern, and
            re-usable components.
          </li>
          <li>
            Reduced front-end bugs by 40% by establishing a comprehensive
            testing framework using Jasmine, which significantly improved code
            reliability and a more stable user experience.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold mt-4">
          <span style={{ color: "var(--accent-600)" }}>Data Engineer</span> |{" "}
          <span style={{ color: "var(--accent-600)" }}>
            Mercedes Medical - Sarasota, FL{" "}
          </span>
          | <span style={{ color: "var(--accent-600)" }}>2018 – 2019</span>
        </h2>
        <ul>
          <li>
            Engineered a scalable web crawler using Node.js and Puppeteer to
            build a comprehensive database, extracting critical information from
            public sources for a new product initiative.
          </li>
          <li>
            Designed and built a data processing pipeline with Node.js to
            normalize and structure raw data, improving data quality and
            preparing it for seamless integration into business systems
          </li>
          <li>
            Partnered with leadership to translate business needs into technical
            solutions, automating the import and formatting of data to provide
            the sales team with a fresh pipeline of high-quality leads
          </li>
          <li>
            This automated solution reduced manual data entry by 90%, saving the
            company over 200 hours per month and eliminating submission errors.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold mt-4">
          <span style={{ color: "var(--accent-600)" }}>Skills</span>
        </h2>
        <ul>
          <li>Languages: JavaScript, TypeScript, C#, Python, SQL</li>
          <li>
            Frameworks: Vue.js, React.js, Next.js, Node.js, Angular, .NET,
            Entity Framework, TailwindCSS
          </li>
          <li>Databases: MSSQL, PostgreSQL, MySQL, Supabase</li>
          <li>
            Tools: Git, Docker, Jenkins, Postman, Cypress, Puppeteer, Datadog
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-bold mt-4">
          <span style={{ color: "var(--accent-600)" }}>Certifications</span>
        </h2>
        <ul>
          <li>
            Career Essentials in Software Development{" "}
            <span style={{ color: "var(--accent-600)" }}>
              (Microsoft and LinkedIn)
            </span>
          </li>
          <li>
            Career Essentials in GitHub{" "}
            <span style={{ color: "var(--accent-600)" }}>
              (GitHub and LinkedIn)
            </span>
          </li>
          <li>
            Career Essentials in Generative AI{" "}
            <span style={{ color: "var(--accent-600)" }}>
              (Microsoft and LinkedIn)
            </span>
          </li>
          <li>
            JavaScript Foundations Professional{" "}
            <span style={{ color: "var(--accent-600)" }}>(Mozilla)</span>
          </li>
          <li>
            Microsoft Copilot for Productivity{" "}
            <span style={{ color: "var(--accent-600)" }}>
              (Microsoft and LinkedIn)
            </span>
          </li>
          <li>
            Microsoft Security Essentials{" "}
            <span style={{ color: "var(--accent-600)" }}>
              (Microsoft and LinkedIn)
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Resume;
