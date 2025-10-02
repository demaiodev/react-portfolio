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
    accent: string;
    bg: string;
    navBg: string;
    text: string;
    navText: string;
    indicator: React.FC<React.ComponentProps<"svg">>;
  }
> = {
  // Light Themes
  ocean: {
    name: "Ocean",
    accent: "blue",
    bg: "bg-blue-100",
    navBg: "bg-white",
    text: "text-gray-900",
    navText: "text-gray-600",
    indicator: Droplet,
  },
  forest: {
    name: "Forest",
    accent: "emerald",
    bg: "bg-green-50",
    navBg: "bg-white",
    text: "text-gray-800",
    navText: "text-gray-600",
    indicator: Leaf,
  },
  sunset: {
    name: "Sunset",
    accent: "rose",
    bg: "bg-yellow-50",
    navBg: "bg-white",
    text: "text-gray-900",
    navText: "text-gray-600",
    indicator: Sunset,
  },
  // Dark Themes
  midnight: {
    name: "Midnight",
    accent: "indigo",
    bg: "bg-gray-900",
    navBg: "bg-gray-800",
    text: "text-gray-100",
    navText: "text-gray-400",
    indicator: Moon,
  },
  aubergine: {
    name: "Aubergine",
    accent: "purple",
    bg: "bg-black",
    navBg: "bg-black",
    text: "text-gray-300",
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

  // Button style ensures visibility against the light/dark navbar background
  const buttonClass = isLightTheme
    ? `bg-gray-200 hover:bg-gray-300 text-${currentTheme.accent}-600` // Light theme: Neutral background, accent icon
    : `bg-${currentTheme.accent}-600 hover:bg-${currentTheme.accent}-700 text-white`; // Dark theme: Accent background, white icon

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        // Updated class for visibility
        className={`p-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none ${buttonClass}`}
        aria-label="Select color theme"
      >
        <Palette className="w-5 h-5" />
      </button>
      {isOpen && (
        // Theme selector popup uses fixed light/dark mode styles for readability
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden z-20 border border-gray-200 dark:border-gray-700">
          <div className="p-3 text-sm font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">
            Select Theme
          </div>
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
                className={`w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between`}
              >
                <div className="flex items-center space-x-2">
                  <IndicatorIcon
                    className={`w-4 h-4 text-${theme.accent}-600`}
                  />
                  <span>{theme.name}</span>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 ${theme.bg} ${
                    themeId === id
                      ? `border-${theme.accent}-500 ring-2 ring-${theme.accent}-500`
                      : "border-gray-300"
                  }`}
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
      className={`sticky top-0 z-50 p-4 shadow-md ${currentTheme.navBg} border-b border-gray-200 transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className={`text-xl font-bold text-${currentTheme.accent}-600`}
        >
          demaiodev
        </Link>
        <div className="flex space-x-4 items-center">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center space-x-1 p-2 rounded-lg transition-all duration-200 ${
                currentTheme.navText
              } 
                ${
                  location.pathname === item.to
                    ? `font-semibold text-${currentTheme.accent}-600 bg-${currentTheme.accent}-100` // Active link accent color
                    : `hover:text-${currentTheme.accent}-500 hover:bg-gray-100` // Hover state uses theme accent
                }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
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
          className={`text-6xl font-extrabold ${currentTheme.text} mb-4 transition-colors`}
        >
          Hi, I'm{" "}
          <span className={`text-${currentTheme.accent}-600`}>Chris.</span>
        </h1>
        <p className={`text-2xl ${currentTheme.text} mb-8`}>
          Full Stack Web Developer
        </p>
        <p className={`text-md ${currentTheme.text} mb-8`}>
          I have about 8 Years of experience creating web applications using
          JavaScript and Node.js.
        </p>
        <Link
          to="/projects"
          className={`px-6 py-3 bg-${currentTheme.accent}-600 text-${currentTheme.accent} border border-${currentTheme.accent} font-semibold rounded-full shadow-lg hover:bg-${currentTheme.accent}-700 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2`}
        >
          <span>View My Work</span>
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
                index === currentImage
                  ? `bg-${currentTheme.accent}-500 w-5`
                  : "bg-gray-400 bg-opacity-70"
              }`}
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
        "A reproduction of a dice mini-game from a video game I played once.",
      url: "https://knucklebuck.netlify.app",
      github: "https://github.com/demaiodev/knucklebuck_2",
    },
    {
      id: 3,
      title: "Dorya",
      description:
        "A tool I wrote with Next.js to practice Tekken fundamentals.",
      url: "https://dorya.netlify.app",
      github: "https://github.com/demaiodev/dorya",
    },
    {
      id: 4,
      title: "Cookie Clicker Automation",
      description:
        "A browser-based automation implementation to further automate the classic game 'Cookie Clicker'.",
      url: "https://orteil.dashnet.org/cookieclicker/",
      github: "https://github.com/demaiodev/cookie-clicker-class",
    },
    {
      id: 5,
      title: "Hintify",
      description:
        "Browser extension that grabs data from the hints page, for when you get stuck and don't want to flip between tabs.",
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
      className={`p-6 border rounded-xl shadow-lg ${currentTheme.navBg} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
    >
      <h3
        className={`text-2xl font-semibold mb-2 text-${currentTheme.accent}-600`}
      >
        {title}
      </h3>
      <p className={`text-base ${currentTheme.text} mb-4`}>{description}</p>
      <div className="flex space-x-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center space-x-2 text-sm font-medium text-${currentTheme.accent}-500 hover:text-${currentTheme.accent}-700 transition-colors`}
        >
          <LinkIcon className="w-4 h-4" />
          <span>Live Site</span>
        </a>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center space-x-2 text-sm font-medium ${currentTheme.navText} hover:text-gray-900 transition-colors`}
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

  return (
    // Apply the theme's base background and text color to the entire application wrapper
    <div
      className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} transition-colors duration-300`}
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
