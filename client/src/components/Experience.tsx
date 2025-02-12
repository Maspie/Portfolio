import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Solutions Inc.",
    period: "2022 - Present",
    description: "Led development of enterprise web applications using React and Node.js. Implemented CI/CD pipelines and mentored junior developers.",
  },
  {
    title: "Full Stack Developer",
    company: "Digital Innovations Co.",
    period: "2020 - 2022",
    description: "Developed and maintained multiple client projects. Improved application performance by 40% through optimization techniques.",
  },
  {
    title: "Frontend Developer",
    company: "Creative Web Agency",
    period: "2018 - 2020",
    description: "Created responsive web applications using React and TypeScript. Collaborated with designers to implement pixel-perfect UIs.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Work Experience
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 pb-12 border-l border-primary last:pb-0"
            >
              <div className="absolute left-0 top-0 w-3 h-3 bg-primary rounded-full -translate-x-1.5" />
              
              <div className="bg-card p-6 rounded-lg border hover:border-primary transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                </div>
                <p className="text-primary mb-2">{exp.company}</p>
                <p className="text-muted-foreground text-sm mb-3">{exp.period}</p>
                <p className="text-muted-foreground">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
