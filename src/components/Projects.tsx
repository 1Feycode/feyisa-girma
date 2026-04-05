import { motion } from "framer-motion";
import { ExternalLink, Lock, FileText, Network, Github } from "lucide-react";

interface ProjectLink {
  label: string;
  href: string;
  icon: "docs" | "topology" | "github";
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  status?: "live" | "upcoming";
  links?: ProjectLink[];
}

const projects: Project[] = [
  {
    title: "Small Office Network Design",
    description:
      "Complete small office network infrastructure featuring VLAN segmentation, DHCP/DNS services, NAT/PAT for internet access, ACLs for traffic filtering, and inter-VLAN routing. Fully simulated and documented with Cisco Packet Tracer.",
    tags: ["VLANs", "DHCP", "NAT", "ACLs", "Cisco", "Routing"],
    status: "live",
    links: [
      { label: "Docs", href: "https://github.com/feynet1", icon: "docs" },
      { label: "Topology", href: "https://github.com/feynet1", icon: "topology" },
    ],
  },
  {
    title: "Hotel Network Design",
    description:
      "End-to-end network infrastructure for a multi-floor hotel with VLANs, guest isolation, and centralized management. Simulated in Cisco Packet Tracer.",
    tags: ["VLANs", "DHCP", "Cisco", "Network Security"],
    links: [
      { label: "Docs", href: "https://github.com/feynet1", icon: "docs" },
      { label: "Topology", href: "https://github.com/feynet1", icon: "topology" },
    ],
  },
  {
    title: "Hospital Network Design",
    description:
      "High-availability network for a hospital environment with redundant links, segmented traffic for medical devices, and HIPAA-compliant security.",
    tags: ["HA", "Firewalls", "Routing", "Redundancy"],
    links: [
      { label: "Docs", href: "https://github.com/feynet1", icon: "docs" },
      { label: "Topology", href: "https://github.com/feynet1", icon: "topology" },
    ],
  },
  {
    title: "Campus Network Design",
    description:
      "Scalable campus-wide network supporting thousands of users across multiple buildings with inter-VLAN routing and centralized DNS/DHCP.",
    tags: ["Scalability", "DNS", "Switching", "Design"],
    links: [
      { label: "Docs", href: "https://github.com/feynet1", icon: "docs" },
      { label: "Topology", href: "https://github.com/feynet1", icon: "topology" },
    ],
  },
  {
    title: "Enterprise Secure Network",
    description:
      "Currently building a zero-trust enterprise network with advanced firewall policies, IDS/IPS integration, and automated monitoring.",
    tags: ["Zero Trust", "IDS/IPS", "Monitoring", "Automation"],
    status: "live",
    links: [
      { label: "Docs", href: "https://github.com/feynet1", icon: "docs" },
      { label: "Topology", href: "https://github.com/feynet1", icon: "topology" },
    ],
  },
  {
    title: "Cloud-Native Infrastructure & Automation",
    description:
      "Upcoming project focusing on cloud infrastructure with Terraform, Kubernetes, and CI/CD pipelines for automated deployments.",
    tags: ["Cloud", "Terraform", "K8s", "CI/CD"],
    status: "upcoming",
    links: [
      { label: "Docs", href: "https://github.com/feynet1", icon: "docs" },
      { label: "GitHub Demo", href: "https://github.com/feynet1", icon: "github" },
    ],
  },
];

const linkIcons = {
  docs: FileText,
  topology: Network,
  github: Github,
};

const Projects = () => {
  return (
    <section id="projects" className="py-20 sm:py-28 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-primary text-sm mb-2 tracking-widest uppercase">Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Featured Projects</h2>
        </motion.div>

        <div className="max-w-5xl mx-auto columns-1 md:columns-2 gap-6 space-y-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={
                project.status !== "upcoming"
                  ? { scale: 1.03, boxShadow: "0 0 30px hsl(187 85% 53% / 0.25)" }
                  : undefined
              }
              className={`break-inside-avoid glass-card rounded-xl p-6 relative overflow-hidden transition-colors hover:border-primary/30 ${
                project.status === "upcoming" ? "opacity-60" : ""
              }`}
            >
              {/* Status badges */}
              {project.status === "live" && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-primary pulse-live inline-block" />
                  <span className="text-xs font-mono text-primary">Live — In Progress</span>
                </div>
              )}
              {project.status === "upcoming" && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-background/60 backdrop-blur-sm rounded-xl">
                  <div className="text-center">
                    <Lock className="text-primary mx-auto mb-2" size={24} />
                    <span className="font-mono text-sm text-primary">Coming Soon</span>
                  </div>
                </div>
              )}

              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                {!project.status && (
                  <ExternalLink className="text-muted-foreground hover:text-primary transition-colors shrink-0 mt-1" size={16} />
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action links */}
              {project.links && project.links.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                  {project.links.map((link) => {
                    const Icon = linkIcons[link.icon];
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-md border border-primary/20 text-primary/80 hover:text-primary hover:bg-primary/10 hover:border-primary/40 transition-all duration-200"
                      >
                        <Icon size={13} />
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
