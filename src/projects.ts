function genId() {
  let id = 1;
  return function () {
    return id++;
  };
}

const idGenerator = genId();

export default [
  {
    id: idGenerator(),
    title: "React Gadgets",
    tech: ["React", "Vite", "TypeScript", "Tailwind"],
    description:
      "Miniature React component library using Vite, Typescript and Tailwind. Hosted on Netlify. Made for fun, and for practice.",
    url: "https://react-gadgets.netlify.app",
    github: "https://github.com/demaiodev/react-gadgets",
  },
  {
    id: idGenerator(),
    title: "Knucklebuck",
    tech: ["React", "Vite", "TypeScript", "Tailwind"],
    description:
      "Reproduction of a dice game, written in React with Typescript and Vite (originally written with Svelte). Hosted on Netlify.",
    url: "https://knucklebuck.netlify.app",
    github: "https://github.com/demaiodev/knucklebuck_2",
  },
  {
    id: idGenerator(),
    title: "O'Reilly Mock UI",
    tech: ["React", "Vite", "TypeScript", "Cypress"],
    description:
      "A small recreation of the O'Reilly website's UI, using React, Vite, and TypeScript. Includes routing and basic Cypress tests.",
    url: "",
    github: "https://github.com/demaiodev/orm-view",
  },
  {
    id: idGenerator(),
    title: "Movie Reviews",
    tech: ["React", "Vite", "TypeScript", "Supabase"],
    description:
      "An app for saving movies from the IMDB API, allowing you to review the movies and note who recommended the movie to you.",
    url: "",
    github: "https://github.com/demaiodev/movie-list_vite-ts",
  },
  {
    id: idGenerator(),
    title: "PyBot",
    tech: ["Python", "Disnake", "VPS", "Vultr"],
    description:
      "A Discord bot made using Pythong and the package Disnake. Added several API's and commands for jokes, AI images, games, etc.",
    url: "",
    github: "https://github.com/demaiodev/pybot",
  },
  {
    id: idGenerator(),
    title: "tinyWatch",
    tech: ["Node.js", "VPS", "Vultr"],
    description:
      "Node.js application that scrapes cryptocurrency prices and uses a mail service to send alerts for favorable trades.",
    url: "",
    github: "https://github.com/demaiodev/tinyWatch",
  },
  {
    id: idGenerator(),
    title: "Dorya",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    description:
      "Tool I wrote with Next.js to practice Tekken's 'Electric Wind God Fist' using the Gamepad Web API. Hosted on Netlify.",
    url: "https://dorya.netlify.app",
    github: "https://github.com/demaiodev/dorya",
  },
  {
    id: idGenerator(),
    title: "Hintify",
    tech: ["JavaScript"],
    description:
      "Browser extension for the NYT Spelling Bee game that grabs the daily puzzle's hints and injects it into the game's document.",
    url: "",
    github: "https://github.com/demaiodev/nyt-spelling-bee-hints",
  },

  {
    id: idGenerator(),
    title: "CookieClickerClass",
    tech: ["JavaScript"],
    description:
      "Console-based vanilla JavaScript implementation to further automate the classic clicker game 'Cookie Clicker'.",
    url: "",
    github: "https://github.com/demaiodev/cookie-clicker-class",
  },
];
