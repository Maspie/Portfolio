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
        className="container mx-auto grid md:grid-cols-2 gap-8 items-center pt-16"
      >
        {/* Left Column - Text Content */}
        <div className="text-left space-y-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-lg text-primary mb-2">Welcome to my portfolio</h2>
            <div className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              <TypeAnimation
                sequence={[
                  'Hi, I\'m Jane Doe',
                  2000,
                  'A Web Developer',
                  2000,
                  'An ML Enthusiast',
                  2000,
                ]}
                wrapper="div"
                speed={50}
                repeat={Infinity}
                className="bg-gradient-to-r from-primary to-purple-500 dark:to-blue-500 text-transparent bg-clip-text"
                style={{ backgroundSize: "200% 200%" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground h-[60px]"
          >
            <TypeAnimation
              sequence={[
                'Building Beautiful UIs',
                2000,
                'Creating Seamless Experiences',
                2000,
                'Developing ML Solutions',
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

        {/* Right Column - Dynamic Background for Chatbot */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative hidden md:flex justify-center items-center"
        >
          <div className="relative w-[90%] h-[500px] rounded-lg overflow-hidden mx-auto my-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 animate-pulse" />
            <div className="absolute inset-0 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shine" />
            </div>
            <motion.div
              animate={{
                background: [
                  'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
                  'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
                  'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0"
            />
            {/* Placeholder for future chatbot implementation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground text-lg">AI Chatbot Coming Soon</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}