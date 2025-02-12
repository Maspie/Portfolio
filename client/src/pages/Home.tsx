import { Navigation } from "@/components/Navigation";
import { CatEyesBackground } from "@/components/CatEyesBackground";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <CatEyesBackground />
      <Navigation />
      <main>
        <Hero />
        {/* Other sections will be added here */}
      </main>
    </div>
  );
}
