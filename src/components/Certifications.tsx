import { motion } from "framer-motion";
import { Award, Clock } from "lucide-react";

interface Certification {
  name: string;
  issuer: string;
  status: "completed" | "in-progress";
  description: string;
}

const certifications: Certification[] = [
  {
    name: "Cisco Certified Network Associate (CCNA)",
    issuer: "Cisco",
    status: "in-progress",
    description:
      "Studying routing & switching, VLANs, OSPF, ACLs, and network security fundamentals toward CCNA certification.",
  },
  {
    name: "AWS / Cloud Engineering",
    issuer: "Amazon Web Services",
    status: "in-progress",
    description:
      "Working toward cloud certification as part of a long-term goal to specialise in cloud infrastructure and DevOps.",
  },
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 sm:py-28 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-primary text-sm mb-2 tracking-widest uppercase">
            Credentials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Certifications
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-xl p-6 hover:border-primary/30 transition-colors"
            >
              {/* Status badge */}
              <div className="flex items-center gap-2 mb-4">
                {cert.status === "completed" ? (
                  <>
                    <Award className="text-primary" size={18} />
                    <span className="text-xs font-mono text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-md">
                      Completed
                    </span>
                  </>
                ) : (
                  <>
                    <Clock className="text-yellow-400" size={18} />
                    <span className="text-xs font-mono text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2.5 py-1 rounded-md">
                      In Progress
                    </span>
                  </>
                )}
              </div>

              <h3 className="text-base font-semibold text-foreground mb-1">
                {cert.name}
              </h3>
              <p className="text-sm font-medium text-primary/80 mb-3">
                {cert.issuer}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {cert.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
