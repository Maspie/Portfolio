import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Download, Send } from "lucide-react";
import { TypeAnimation } from 'react-type-animation';

export function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto grid md:grid-cols-2 gap-8 items-center"
      >
        {/* Left Column - Text Content */}
        <div className="text-left space-y-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-lg text-primary mb-2">Welcome to my portfolio</h2>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
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
            </h1>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground h-[60px]"
          >
            <TypeAnimation
              sequence={[
                'A Full Stack Developer',
                2000,
                'Building Beautiful UIs',
                2000,
                'Creating Seamless Experiences',
                2000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Passionate about crafting beautiful and functional web experiences
            that make a difference.
          </motion.p>

          <motion.div 
            className="flex gap-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="gap-2 relative overflow-hidden group">
                <Download className="w-4 h-4 group-hover:animate-bounce" />
                Download CV
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary/50 scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="secondary" className="gap-2 relative overflow-hidden group">
                <Send className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                Contact Me
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary/50 scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column - Skills Preview */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative hidden md:block"
        >
          <div className="relative w-full h-[400px] bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg p-6">
            <div className="absolute inset-0 backdrop-blur-sm rounded-lg" />
            {/* We'll add floating skill icons here in the next iteration */}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}