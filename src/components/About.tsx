import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-20 sm:py-28 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-primary text-sm mb-2 tracking-widest uppercase">About</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">About Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl border border-primary/20 cyan-glow overflow-hidden">
              <img
                src="/my photo.jpg"
                alt="Feyisa Girma"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent -z-10 blur-sm" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4"
          >
            <p className="text-muted-foreground leading-relaxed">
              I'm a passionate <span className="text-foreground font-medium">Network Engineer</span> and{" "}
              <span className="text-foreground font-medium">Full-Stack Developer</span> specializing in
              designing secure, scalable network infrastructures for hotels, hospitals, and campuses.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I combine deep networking expertise — VLANs, routing, firewalls, and high-availability
              architectures — with modern full-stack development using React, Node.js, Python, and
              PostgreSQL to build robust, end-to-end digital solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My goal is to bridge the gap between infrastructure and application development,
              delivering solutions that are both technically excellent and user-centric.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
