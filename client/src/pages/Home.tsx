import { Navigation } from "@/components/Navigation";
import { CatEyesBackground } from "@/components/CatEyesBackground";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";

export default function Home() {
  return (
    <div className="min-h-screen">
      <CatEyesBackground />
      <Navigation />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
      </main>
    </div>
  );
}