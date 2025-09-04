import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import Weather from "./WeatherCard";
import Navbar from "./Navbar";

export default function HeroPage() {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white dark:text-white transition">
        {/* Navbar */}
        <Navbar></Navbar>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-24 relative">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 pt-7 mt-8"><span className="text-blue-400">Agnitha</span> Weather</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">Your go-to app for real-time weather updates and forecasts.</p>
            <button/>
        </section>

        {/* Cards Section */}
        <section className="gap-6 px-8 pb-16 justify-center items-center align-middle flex flex-wrap">
          <Weather></Weather>
        </section>
      </div>
    </div>
  );
}
