import React from "react";
import { Droplet, Leaf, Sun, Moon, Star } from "lucide-react";

export type ThemeId = "ocean" | "forest" | "sunset" | "midnight" | "aubergine";

export const themes: Record<
  ThemeId,
  {
    name: string;
    accent: string;
    accent100: string;
    accent500: string;
    accent600: string;
    accent700: string;
    bg: string;
    navBg: string;
    navBgColor?: string;
    text: string;
    textColor: string;
    navText: string;
    indicator: React.FC<React.SVGProps<SVGSVGElement>>;
  }
> = {
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
    indicator: (props) => React.createElement(Droplet, props),
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
    indicator: (props) => React.createElement(Leaf, props),
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
    indicator: (props) => React.createElement(Sun, props),
  },
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
    indicator: (props) => React.createElement(Moon, props),
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
    indicator: (props) => React.createElement(Star, props),
  },
};

export default themes;
