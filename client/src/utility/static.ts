import { Developer } from "../models/Developer";

export const getDevelopers = (): Developer[] => {
  return [
    {
      name: "AYK",
      tagline: "full stack software engineer",
      description: "Full stack software engineer | Git master",
      imgUrl: "https://avatars.githubusercontent.com/u/41294736?v=4",
    },
    {
      name: "Taha (TBA)",
      tagline: "MERN Stack Developer",
      description: "Working as a backend developer",
      imgUrl: "https://avatars.githubusercontent.com/u/30070810?v=4",
    },

    {
      name: "Rabia",
      tagline: "Frontend Developer",
      description: "Frontend Developer",
      imgUrl:
        "https://i2.wp.com/nofiredrills.com/wp-content/uploads/2016/10/myavatar.png?fit=400%2C400&ssl=1",
    },
    {
      name: "Jagadesh",
      tagline: "Team lead",
      description: "Manages team meetings, tasks and updates!",
      imgUrl: "https://avatars.githubusercontent.com/u/29826501?v=4",
    },
    {
      name: "Obada",
      tagline: "Frontend/DevOps",
      description: "Our frontend & DevOps champ!",
      imgUrl: "https://avatars.githubusercontent.com/u/80964042?v=4",
    },
  ];
};
