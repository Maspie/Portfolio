"use client";

import Particles from "@tsparticles/react";
import { loadSlim } from "tsparticles-slim";
import { Engine } from "tsparticles-engine";

export default function ParticlesBackground() {
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine); // Loads the lightweight version
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "#0a0212", // Dark blackish-purple background
        },
        particles: {
          number: {
            value: 100,
            density: { enable: true, area: 800 },
          },
          color: { value: "#8b5cf6" }, // Purple
          shape: { type: "circle" },
          opacity: { value: 0.7, random: true },
          size: { value: 3, random: true },
          links: {
            enable: true,
            distance: 120,
            color: "#8b5cf6",
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            outModes: "out",
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            grab: { distance: 150, links: { opacity: 0.8 } },
            push: { quantity: 2 },
          },
        },
        fullScreen: { enable: true, zIndex: -1 }, // Makes background full page
        detectRetina: true,
      }}
    />
  );
}
