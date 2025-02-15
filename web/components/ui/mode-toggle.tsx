"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";

export function ModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);
    else setDarkMode(false);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <div>
      {darkMode ? (
        <Button onClick={() => setDarkMode(!darkMode)} variant={"outline"}>
          <Sun size={15} />
        </Button>
      ) : (
        <Button onClick={() => setDarkMode(!darkMode)} variant={"outline"}>
          <Moon size={15} />
        </Button>
      )}
    </div>
  );
}
