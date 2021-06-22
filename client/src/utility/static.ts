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

export const dummyDeveloper: Developer = {
    name: "",
    tagline: "",
    description: "",
    imgUrl: "",
};

const dummyBgImages = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80",
    "https://images.unsplash.com/photo-1526925539332-aa3b66e35444?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1301&q=80",
];

export const getRandomBg = () => {
    return dummyBgImages[
        Math.floor(Math.random() * dummyBgImages.length - 1 + 1)
    ];
};
