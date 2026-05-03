import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";

interface TimelineItem {
  type: "education" | "work";
  title: string;
  organization: string;
  period: string;
  description: string;
}

const timeline: TimelineItem[] = [
  {
    type: "education",
    title: "Bachelor of Science — Information Technology",
    organization: "Haramaya University",
    period: "2024 – Present",
    description:
      "3rd year IT student with a focus on networking, software development, and system design. Building expertise toward a career as a Cloud & Network Engineer.",
  },
];

const typeIcon = {
  education: GraduationCap,
  work: Briefcase,
};

const Experience = () => {
  return (
    <section id="experience" className="py-20 sm:py-28 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-primary text-sm mb-2 tracking-widest uppercase">
            Background
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Experience & Education
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden sm:block" />

          <div className="space-y-8">
            {timeline.map((item, i) => {
              const Icon = typeIcon[item.type];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative sm:pl-16"
                >
                  {/* Icon dot on timeline */}
                  <div className="hidden sm:flex absolute left-0 top-1 w-12 h-12 rounded-full glass-card border border-primary/30 items-center justify-center cyan-glow">
                    <Icon className="text-primary" size={20} />
                  </div>

                  {/* Card */}
                  <div className="glass-card rounded-xl p-6 hover:border-primary/30 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 sm:hidden">
                        <Icon className="text-primary shrink-0" size={18} />
                        <h3 className="text-base font-semibold text-foreground">
                          {item.title}
                        </h3>
                      </div>
                      <h3 className="hidden sm:block text-base font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <span className="font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-md shrink-0">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-primary/80 mb-3">
                      {item.organization}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
