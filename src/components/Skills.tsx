import { motion } from "framer-motion";
import {
  Network, Shield, Server, Globe, Database, Code2, GitBranch,
  Terminal, Container, Search, Wifi, Lock
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Skill {
  name: string;
  icon: LucideIcon;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    title: "Networking",
    skills: [
      { name: "VLANs", icon: Network },
      { name: "Routing & Switching", icon: Wifi },
      { name: "DHCP / DNS", icon: Server },
      { name: "Network Design", icon: Globe },
      { name: "Firewalls & Security", icon: Shield },
      { name: "High Availability", icon: Lock },
    ],
  },
  {
    title: "Web Development",
    skills: [
      { name: "React", icon: Code2 },
      { name: "Node.js", icon: Terminal },
      { name: "Python", icon: Code2 },
      { name: "TypeScript", icon: Code2 },
      { name: "PostgreSQL", icon: Database },
      { name: "Express / FastAPI", icon: Server },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Cisco Packet Tracer", icon: Network },
      { name: "Wireshark", icon: Search },
      { name: "Git / GitHub", icon: GitBranch },
      { name: "Docker", icon: Container },
      { name: "Postman", icon: Terminal },
      { name: "Linux", icon: Terminal },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 sm:py-28 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-primary text-sm mb-2 tracking-widest uppercase">Expertise</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Skills & Technologies</h2>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-12">
          {categories.map((cat, catIdx) => (
            <div key={cat.title}>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-lg font-semibold text-foreground mb-6 font-mono"
              >
                <span className="text-primary">//</span> {cat.title}
              </motion.h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {cat.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 + catIdx * 0.1 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px hsl(187 85% 53% / 0.3)" }}
                    className="glass-card rounded-xl p-4 flex flex-col items-center gap-3 cursor-default transition-colors hover:border-primary/40"
                  >
                    <skill.icon className="text-primary" size={24} />
                    <span className="text-sm text-muted-foreground text-center font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
