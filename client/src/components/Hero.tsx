import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Download, Send } from "lucide-react";
import { TypeAnimation } from 'react-type-animation';
import Particles from "@tsparticles/react";
import { loadSlim } from "tsparticles-slim";
import { Engine } from "tsparticles-engine";

function ParticlesBackground() {
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "#0a0212" },
        particles: {
          number: { value: 100, density: { enable: true, area: 800 } },
          color: { value: "#8b5cf6" },
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
          move: { enable: true, speed: 1.5, direction: "none", outModes: "out" },
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
        fullScreen: { enable: true, zIndex: -1 },
        detectRetina: true,
      }}
    />
  );
}

export function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative bg-black">
      <ParticlesBackground />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto grid md:grid-cols-2 gap-8 items-center pt-16 relative z-10"
      >
        <div className="text-left space-y-6">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <h2 className="text-lg text-primary mb-2">Welcome to my portfolio</h2>
            <div className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              <TypeAnimation
                sequence={['Hi, I\'m Jane Doe', 2000, 'A Web Developer', 2000, 'An ML Enthusiast', 2000]}
                wrapper="div"
                speed={50}
                repeat={Infinity}
                className="bg-gradient-to-r from-primary to-purple-500 dark:to-blue-500 text-transparent bg-clip-text"
                style={{ backgroundSize: "200% 200%" }}
              />
            </div>
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl md:text-2xl text-muted-foreground h-[60px]">
            <TypeAnimation
              sequence={['Building Beautiful UIs', 2000, 'Creating Seamless Experiences', 2000, 'Developing ML Solutions', 2000]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p className="text-lg text-muted-foreground max-w-2xl" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
            Passionate about crafting beautiful and functional web experiences that make a difference.
          </motion.p>

          <motion.div className="flex gap-4" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="gap-2 relative overflow-hidden group">
                <Download className="w-4 h-4 group-hover:animate-bounce" />
                Download CV
                <span className="absolute inset-0 w-full h-full bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="secondary" className="gap-2 relative overflow-hidden group">
                <Send className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                Contact Me
                <span className="absolute inset-0 w-full h-full bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
