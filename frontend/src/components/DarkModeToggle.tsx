import { useEffect, useState } from "react";

function getStored(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setStored(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {}
}

function getInitialLight(): boolean {
  if (typeof window === "undefined") return false;
  return getStored("oli-theme") === "light";
}

export default function DarkModeToggle() {
  const [light, setLight] = useState(getInitialLight);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    setStored("oli-theme", light ? "light" : "dark");
  }, [light]);

  return (
    <button
      type="button"
      onClick={() => setLight((l) => !l)}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      className="fixed right-5 top-5 z-10 rounded-full border border-oli-primary/30 p-2.5 text-oli-primary outline-none transition-all duration-300 hover:bg-oli-primary hover:text-oli-bg hover:border-oli-primary focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-oli-accent"
    >
      {light ? (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
    </button>
  );
}