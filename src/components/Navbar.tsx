import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, ArrowUp } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const useActiveSection = () => {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = navItems.map((item) => item.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 glass"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo — text only, no icon */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-mono font-semibold text-lg text-primary tracking-tight"
              aria-label="Scroll to top"
            >
              Feyisa Girma
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleClick(item.href)}
                    className={`relative text-sm font-medium transition-colors duration-300 ${
                      isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary"
                      />
                    )}
                  </button>
                );
              })}
              <button
                onClick={() => handleClick("#contact")}
                className="btn-primary-cyber text-sm px-4 py-2"
              >
                Hire Me
              </button>
              <a
                href="/cv.pdf"
                download="Feyisa_Girma_CV.pdf"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Download size={15} />
                CV
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-border"
            >
              <div className="px-4 py-4 space-y-3">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href;
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleClick(item.href)}
                      className={`block w-full text-left py-2 transition-colors ${
                        isActive
                          ? "text-primary font-medium"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
                <a
                  href="/cv.pdf"
                  download="Feyisa_Girma_CV.pdf"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors py-2"
                >
                  <Download size={15} />
                  Download CV
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Scroll-to-top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="fixed bottom-8 right-6 z-50 w-10 h-10 rounded-full glass border border-primary/30 text-primary flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all duration-300 cyan-glow"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
