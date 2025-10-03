import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Code, User, LayoutGrid, ScrollText } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import { useTheme } from "../theme-store";

type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const Navbar: React.FC = () => {
  const { currentTheme } = useTheme();
  const location = useLocation();
  const navItems: NavItem[] = [
    { to: "/", label: "Home", icon: Code },
    { to: "/about", label: "About", icon: User },
    { to: "/projects", label: "Projects", icon: LayoutGrid },
    { to: "/resume", label: "Resume", icon: ScrollText },
  ];

  return (
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
            const Icon = item.icon;
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
                <Icon className="w-4 h-4" />
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

export default Navbar;
