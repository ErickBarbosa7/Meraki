import { useEffect, useState } from "react";

function getInitialDark(): boolean {
  if (typeof window === "undefined") return false;
  const stored = window.localStorage.getItem("meraki-theme");
  if (stored === "dark") return true;
  if (stored === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function DarkModeToggle() {
  const [dark, setDark] = useState(getInitialDark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem("meraki-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed right-6 top-6 z-10 rounded-full border border-meraki-primary/40 px-4 py-2 text-[10px] font-medium uppercase tracking-widest text-meraki-primary outline-none transition-all duration-300 hover:bg-meraki-primary hover:text-meraki-bg focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-meraki-primary"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}