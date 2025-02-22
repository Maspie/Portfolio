import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import GlowingClockBackground from "@/components/CatEyesBackground";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ y: 0 });
  }, []);

  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: 100 }}
      onDragEnd={(event, info) => {
        if (info.offset.y > 50) {
          controls.start({ y: 0 });
          window.location.reload();
        }
      }}
      animate={controls}
      className="min-h-screen"
    >
      <GlowingClockBackground />
      <Navigation />

      <motion.main
        drag="x"
        dragConstraints={{ left: -300, right: 300 }}
        className="flex flex-col gap-16"
      >
        {/* 🟢 Scroll Reveal Effect on Sections */}
        <motion.div style={{ y: translateY }}>
          <Hero />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Skills />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Experience />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Projects />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Contact />
        </motion.div>
      </motion.main>
    </motion.div>
  );
}
