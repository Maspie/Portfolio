import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Download, Send } from "lucide-react";

export function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative"
    >
      <motion.h1 
        className="text-4xl md:text-6xl font-bold mb-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Hi, I'm{" "}
        <motion.span 
          className="bg-gradient-to-r from-primary to-purple-500 dark:to-blue-500 text-transparent bg-clip-text"
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ backgroundSize: "200% 200%" }}
        >
          Jane Doe
        </motion.span>
      </motion.h1>

      <motion.p 
        className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        A passionate Full Stack Developer crafting beautiful and functional web experiences
      </motion.p>

      <motion.div 
        className="flex flex-col sm:flex-row gap-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Button 
          className="gap-2 relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="w-4 h-4 group-hover:animate-bounce" />
          Download CV
        </Button>
        <Button 
          variant="secondary" 
          className="gap-2 relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Send className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          Contact Me
        </Button>
      </motion.div>
    </motion.div>
  );
}