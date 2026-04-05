import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center network-grid overflow-hidden">
      {/* Floating particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            top: `${15 + i * 14}%`,
            left: `${10 + i * 15}%`,
            animation: `float-particle ${4 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-primary text-sm mb-4 tracking-widest uppercase">
            Welcome to my portfolio
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 text-foreground leading-tight">
            Hi, I'm <span className="text-gradient-cyan">Feyisa Girma</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-2 font-light">
            Network Engineer <span className="text-primary">|</span> Full-Stack Developer
          </p>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-sm sm:text-base">
            Designing secure, scalable networks and building modern web applications
            that drive digital transformation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#contact" className="btn-primary-cyber">
            Contact Me
          </a>
          <a href="#projects" className="btn-secondary-cyber">
            View Projects
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="text-muted-foreground animate-bounce" size={28} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
