import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext(null);

const ThemeContextProvider = (props) => {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved ? saved === "dark" : false;
    });

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme", 
            darkMode ? "dark" : "light"
        );
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const toggleTheme = () => setDarkMode(prev => !prev);

    const contextValue = { darkMode, toggleTheme };

    return (
        <ThemeContext.Provider value={contextValue}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;