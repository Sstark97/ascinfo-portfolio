import {useEffect, useState} from "react";
import {DarkModeIcon} from "@components/react/themeMode/DarkModeIcon.tsx";
import {LightModeIcon} from "@components/react/themeMode/LightModeIcon.tsx";

export const ThemeMode = () => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        setInitialTheme();
    }, []);

    const changeTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(nextTheme);
        localStorage.setItem('theme', nextTheme);
        setTheme(nextTheme);
    };

    const setInitialTheme = () => {
        const theme = localStorage.getItem('theme') ?? 'dark';
        document.documentElement.classList.add(theme);
    }

    return (
        <button onClick={changeTheme}>
            {theme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
        </button>
    );
};