import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Download, Send } from "lucide-react";

export function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col justify-center items-center text-center px-4"
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Hi, I'm{" "}
        <span className="bg-gradient-to-r from-primary to-purple-500 dark:to-blue-500 text-transparent bg-clip-text">
          Jane Doe
        </span>
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
        A passionate Full Stack Developer crafting beautiful and functional web experiences
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Download CV
        </Button>
        <Button variant="secondary" className="gap-2">
          <Send className="w-4 h-4" />
          Contact Me
        </Button>
      </div>
    </motion.div>
  );
}
