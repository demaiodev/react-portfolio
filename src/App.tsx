import React, { useState, createContext, useContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// Added Star and Sparkles for the new themes
import {
  Code,
  User,
  LayoutGrid,
  ArrowRight,
  Github,
  Link as LinkIcon,
  Palette,
  Droplet,
  Leaf,
  Sunset,
  Moon,
  Sparkles,
} from "lucide-react";

// --- 0. COLOR SCHEME DEFINITION & UTILITIES ---
type ThemeId = "ocean" | "forest" | "sunset" | "midnight" | "aubergine";

// Define the fixed themes with their specific Tailwind classes
const themes: Record<
  ThemeId,
  {
    name: string;
    accent: string; // short name (for reference)
    accent100: string;
    accent500: string;
    accent600: string;
    accent700: string;
    bg: string;
    navBg: string;
    navBgColor?: string;
    text: string; // tailwind class for text (kept for compatibility)
    textColor: string; // hex color for inline styles
    navText: string;
    indicator: React.FC<React.ComponentProps<"svg">>;
  }
> = {
  // Light Themes
  ocean: {
    name: "Ocean",
    accent: "blue",
    accent100: "#dbeafe",
    accent500: "#3b82f6",
    accent600: "#2563eb",
    accent700: "#1d4ed8",
    bg: "bg-blue-100",
    navBg: "bg-white",
    navBgColor: "#ffffff",
    text: "text-gray-900",
    textColor: "#111827",
    navText: "text-gray-600",
    indicator: Droplet,
  },
  forest: {
    name: "Forest",
    accent: "emerald",
    accent100: "#d1fae5",
    accent500: "#10b981",
    accent600: "#059669",
    accent700: "#047857",
    bg: "bg-green-50",
    navBg: "bg-white",
    navBgColor: "#ffffff",
    text: "text-gray-800",
    textColor: "#1f2937",
    navText: "text-gray-600",
    indicator: Leaf,
  },
  sunset: {
    name: "Sunset",
    accent: "rose",
    accent100: "#fff1f2",
    accent500: "#fb7185",
    accent600: "#e11d48",
    accent700: "#9f1239",
    bg: "bg-yellow-50",
    navBg: "bg-white",
    navBgColor: "#ffffff",
    text: "text-gray-900",
    textColor: "#111827",
    navText: "text-gray-600",
    indicator: Sunset,
  },
  // Dark Themes
  midnight: {
    name: "Midnight",
    accent: "indigo",
    accent100: "#eef2ff",
    accent500: "#6366f1",
    accent600: "#4f46e5",
    accent700: "#4338ca",
    bg: "bg-gray-900",
    navBg: "bg-gray-800",
    navBgColor: "#1f2937",
    text: "text-gray-100",
    textColor: "#f9fafb",
    navText: "text-gray-400",
    indicator: Moon,
  },
  aubergine: {
    name: "Aubergine",
    accent: "purple",
    accent100: "#f3e8ff",
    accent500: "#8b5cf6",
    accent600: "#7c3aed",
    accent700: "#6d28d9",
    bg: "bg-black",
    navBg: "bg-black",
    navBgColor: "#000000",
    text: "text-gray-300",
    textColor: "#d1d5db",
    navText: "text-gray-400",
    indicator: Sparkles,
  },
};

// --- 1. THEME CONTEXT ---
interface ThemeContextType {
  themeId: ThemeId;
  currentTheme: (typeof themes)[ThemeId];
  setThemeId: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Theme State now combines mode and accent color
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    return (localStorage.getItem("themeId") as ThemeId) || "ocean";
  });

  const currentTheme = themes[themeId] || themes.ocean;

  const handleSetThemeId = (id: ThemeId) => {
    setThemeId(id);
    localStorage.setItem("themeId", id);
  };

  return (
    <ThemeContext.Provider
      value={{ themeId, currentTheme, setThemeId: handleSetThemeId }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// --- 2. COMPONENTS ---

// New unified selector replaces the old ThemeToggle and ColorSelector
const ThemeSelector: React.FC = () => {
  const { themeId, currentTheme, setThemeId } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Determine if the current theme is light based on navbar background
  const isLightTheme =
    currentTheme.navBg.includes("white") ||
    currentTheme.navBg.includes("gray-100");

  // Inline styles for the theme button to reliably use accent colors
  const buttonStyle: React.CSSProperties = isLightTheme
    ? { backgroundColor: undefined, color: "var(--accent-600)" }
    : {
        backgroundColor: "var(--accent-600)",
        color: "var(--accent-contrast-text)",
        boxShadow: `0 0 0 3px var(--accent-100-rgba)`,
      };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        // Updated class for visibility
        className={`p-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none`}
        style={buttonStyle}
        aria-label="Select color theme"
      >
        <Palette className="w-5 h-5" />
      </button>
      {isOpen && (
        // Theme selector popup uses the theme's navBg / text color so it matches selected theme
        <div
          className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl overflow-hidden z-20 border transition-colors`}
          style={{
            backgroundColor: "var(--nav-bg)",
            color: "var(--text-color)",
          }}
        >
          <div className="p-3 text-sm font-semibold border-b">Select Theme</div>
          {Object.keys(themes).map((key) => {
            const id = key as ThemeId;
            const theme = themes[id];
            const IndicatorIcon = theme.indicator;

            return (
              <button
                key={id}
                onClick={() => {
                  setThemeId(id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 transition-colors flex items-center justify-between hover:brightness-95`}
                style={{ color: "var(--text-color)" }}
              >
                <div className="flex items-center space-x-2">
                  <IndicatorIcon
                    className="w-4 h-4"
                    style={{ color: theme.accent600 || theme.accent500 }}
                  />
                  <span>{theme.name}</span>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2`}
                  style={{
                    backgroundColor: theme.accent100,
                    borderColor: themeId === id ? theme.accent500 : "#d1d5db",
                    boxShadow:
                      themeId === id
                        ? `0 0 0 3px ${theme.accent100}80`
                        : undefined,
                  }}
                ></div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Navbar: React.FC = () => {
  const { currentTheme } = useTheme();
  const location = useLocation();
  const navItems = [
    { to: "/", label: "Home", icon: Code },
    { to: "/about", label: "About", icon: User },
    { to: "/projects", label: "Projects", icon: LayoutGrid },
  ];

  return (
    // Navbar now uses the dynamic navBg and navText for its base colors
    <nav
      className={`sticky top-0 p-4 shadow-md transition-colors duration-300`}
      style={{ backgroundColor: "var(--nav-bg)", zIndex: 1000 }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold"
          style={{ color: "var(--accent-600)" }}
        >
          demaiodev
        </Link>
        <div className="flex space-x-4 items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center space-x-1 p-2 rounded-lg transition-all duration-200 ${currentTheme.navText}`}
                style={
                  isActive
                    ? {
                        fontWeight: 600,
                        color: "var(--accent-600)",
                        backgroundColor: "var(--accent-100)",
                      }
                    : undefined
                }
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
          <ThemeSelector />
        </div>
      </div>
    </nav>
  );
};

// --- 3. PAGE FRAMEWORK (with Animation) ---

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -50 },
};

const PageTransitionWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={{ type: "tween", duration: 0.4 }}
    className="min-h-[calc(100vh-64px)] p-8 max-w-6xl mx-auto"
  >
    {children}
  </motion.div>
);

// Utility: convert #rrggbb to rgba with alpha
function hexToRgba(hex: string, alpha = 1) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Utility: pick black or white depending on which contrasts better with the background
function getContrastText(hex: string) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  // Perceived luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#111827" : "#ffffff";
}

// --- 4. INDIVIDUAL PAGES ---

// Landing Page (Homepage)
const LandingPage: React.FC = () => {
  const { currentTheme } = useTheme();
  // Defensive check to prevent runtime errors during theme/router initialization
  if (!currentTheme) return null;

  return (
    <PageTransitionWrapper>
      <div className="flex flex-col items-center justify-center h-full text-center py-20">
        <h1
          className="text-6xl font-extrabold mb-4 transition-colors"
          style={{ color: currentTheme.textColor }}
        >
          Hi, I'm <span style={{ color: "var(--accent-600)" }}>Chris.</span>
        </h1>
        <p className={`text-2xl ${currentTheme.text} mb-8`}>
          Full Stack Web Developer
        </p>
        <p className={`text-md ${currentTheme.text} mb-8`}>
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
    </PageTransitionWrapper>
  );
};

// About Me Page (Placeholder Carousel)
const AboutPage: React.FC = () => {
  const { currentTheme } = useTheme();
  const [currentImage, setCurrentImage] = useState(0);

  // Defensive check to prevent runtime errors during theme/router initialization
  if (!currentTheme) return null;

  // Placeholder images now use the safe hex code
  const images = [
    "../pics/IMG_5257.jpg",
    "../pics/IMG_6343.jpg",
    "../pics/IMG_5082.jpg",
    "../pics/IMG_5706.webp",
  ];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <PageTransitionWrapper>
      <h2 className={`text-4xl font-bold mb-8 ${currentTheme.text}`}>
        About Me
      </h2>
      <p className={`${currentTheme.text} mb-2`}>
        I'm 34 and I live in Sarasota, Florida. I like it here, except the
        weather during the summer. Also hurricanes happen, a lot.
      </p>
      <p className={`${currentTheme.text} mb-2`}>
        When I'm not programming, I'm probably playing video games. My current
        Steam game rotation is Tekken, Factorio, Deadlock and Age of Empires II.
        I also enjoy playing and creating music - I like to pretend I can play
        the guitar, and I also play the piano. I use Ableton or FL Studio to
        record and produce songs.
      </p>
      <p className={`${currentTheme.text} mb-2`}>
        I have 2 four-legged creatures in my house. I have a Persian cat named
        Pancake (because her face is smushed) and an English Cream golden
        retriever named Charlie. Of course I have included pictures of them,
        because I like to share. Charlie and I are avid tennis ball fetchers,
        and Pancake is a milk-drinking machine. She needs a special bowl because
        she is without a snout.
      </p>

      {/* Sleek Carousel Placeholder */}
      <div className="relative w-full overflow-hidden rounded-xl shadow-2xl">
        <div className="aspect-video w-full">
          <img
            key={currentImage}
            src={images[currentImage]}
            alt={`Carousel Image ${currentImage + 1}`}
            // Using object-cover to ensure images scale correctly
            className="w-full h-full object-cover transition-opacity duration-700"
          />
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded-full transition-all"
        >
          {"<"}
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded-full transition-all"
        >
          {">"}
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImage ? "w-5" : "bg-gray-400 bg-opacity-70"
              }`}
              style={
                index === currentImage
                  ? { backgroundColor: "var(--accent-500)" }
                  : undefined
              }
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </PageTransitionWrapper>
  );
};

// Projects Page
const ProjectsPage: React.FC = () => {
  const { currentTheme } = useTheme();
  const projects = [
    {
      id: 1,
      title: "React Gadgets",
      description:
        "A collection of components I wrote to practice developing React applications using Vite, Typescript and TailwindCSS.",
      url: "https://react-gadgets.netlify.app",
      github: "https://github.com/demaiodev/react-gadgets",
    },
    {
      id: 2,
      title: "Knucklebuck",
      description:
        "A reproduction of a dice mini-game from 'Cult of the Lamb', written in React with Typescript.",
      url: "https://knucklebuck.netlify.app",
      github: "https://github.com/demaiodev/knucklebuck_2",
    },
    {
      id: 3,
      title: "Dorya",
      description:
        "A tool I wrote with Next.js to practice Tekken fundamentals using the Gamepad WebAPI.",
      url: "https://dorya.netlify.app",
      github: "https://github.com/demaiodev/dorya",
    },
    {
      id: 4,
      title: "Cookie Clicker Automation",
      description:
        "A console-based JavaScript implementation to further automate the classic game 'Cookie Clicker'.",
      url: "https://orteil.dashnet.org/cookieclicker/",
      github: "https://github.com/demaiodev/cookie-clicker-class",
    },
    {
      id: 5,
      title: "Hintify",
      description:
        "Browser extension that grabs data from the NYT hints page, for when you get stuck and don't want to flip between tabs.",
      url: "https://www.nytimes.com/puzzles/spelling-bee",
      github: "https://github.com/demaiodev/nyt-spelling-bee-hints",
    },
    {
      id: 6,
      title: "tinyWatch",
      description:
        "A Node.js application that scrapes cryptocurrency prices and uses a mail service to send alerts for favorable trades.",
      url: "https://app.tinyman.org/swap?asset_in=0&asset_out=31566704",
      github: "https://github.com/demaiodev/tinyWatch",
    },
  ];

  // Defensive check to prevent runtime errors during theme/router initialization
  if (!currentTheme) return null;

  const ProjectCard: React.FC<(typeof projects)[0]> = ({
    title,
    description,
    url,
    github,
  }) => (
    // Project card background is made slightly darker/lighter than the body for contrast
    <div
      className={`p-6 border rounded-xl shadow-lg ${currentTheme.navBg} transition-all duration-300 hover:shadow-2xl`}
    >
      <h3
        className="text-2xl font-semibold mb-2"
        style={{ color: "var(--accent-600)" }}
      >
        {title}
      </h3>
      <p className={`text-base ${currentTheme.text} mb-4`}>{description}</p>
      <div className="flex space-x-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center space-x-2 text-sm font-medium transition-colors`}
          style={{ color: "var(--accent-500)" }}
        >
          <LinkIcon className="w-4 h-4" />
          <span>Live Site</span>
        </a>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center space-x-2 text-sm font-medium transition-colors`}
          style={{ color: "var(--accent-500)" }}
        >
          <Github className="w-4 h-4" />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );

  return (
    <PageTransitionWrapper>
      <h2 className={`text-4xl font-bold mb-8 ${currentTheme.text}`}>
        Personal Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </PageTransitionWrapper>
  );
};

// --- 5. MAIN APP COMPONENT ---

const App: React.FC = () => {
  const { currentTheme } = useTheme();
  const location = useLocation();
  // Prepare CSS variables for theme colors and adaptive contrast
  const accent500 = currentTheme.accent500;
  const accent600 = currentTheme.accent600;
  const accent100 = currentTheme.accent100;
  const contrastText = getContrastText(accent600);

  const rootStyle = {
    // background and text still use Tailwind classes for base layout, but variables drive accent colors
    "--accent-100": accent100,
    "--accent-500": accent500,
    "--accent-600": accent600,
    "--accent-700": currentTheme.accent700,
    "--accent-100-rgba": hexToRgba(accent100, 0.18),
    "--accent-contrast-text": contrastText,
    "--text-color": currentTheme.textColor,
    "--nav-bg": currentTheme.navBgColor || undefined,
  } as React.CSSProperties;

  return (
    // Apply the theme's base background and text color to the entire application wrapper and set CSS variables
    <div
      className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} transition-colors duration-300`}
      style={rootStyle}
    >
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

// --- 6. WRAPPER FOR CONTEXT ---

const RootApp: React.FC = () => (
  <Router>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Router>
);

export default RootApp;
