import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, ArrowUp, Sun, Moon } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const NAVBAR_HEIGHT = 64; // px — matches h-16

const scrollToSection = (href: string) => {
  const id = href.replace("#", "");
  const el = document.getElementById(id);

  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
  window.scrollTo({ top, behavior: "smooth" });
};

const useActiveSection = () => {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = navItems.map((item) => item.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: `-${NAVBAR_HEIGHT}px 0px -50% 0px`, threshold: 0 }
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
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    if (isOpen) {
      // Close menu first, then scroll after animation completes (250ms)
      setIsOpen(false);
      setTimeout(() => scrollToSection(href), 300);
    } else {
      scrollToSection(href);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 glass"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Brand */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-mono font-semibold text-base sm:text-lg text-primary tracking-tight shrink-0"
              aria-label="Scroll to top"
            >
              Feyisa Girma
            </button>

            {/* Desktop nav — visible md and up */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleClick(item.href)}
                    className={`relative text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
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

              {/* Theme toggle */}
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label="Toggle theme"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="md:hidden text-foreground p-1"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile / tablet menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden glass border-t border-border overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href;
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleClick(item.href)}
                      className={`flex w-full items-center text-left px-3 py-3 rounded-lg transition-colors text-sm font-medium ${
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}

                <div className="pt-2 border-t border-border flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleClick("#contact")}
                    className="btn-primary-cyber text-sm px-4 py-2 w-full sm:w-auto text-center"
                  >
                    Hire Me
                  </button>
                  <a
                    href="/cv.pdf"
                    download="Feyisa_Girma_CV.pdf"
                    className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-4 py-2 border border-border rounded-lg hover:border-primary/40"
                  >
                    <Download size={15} />
                    Download CV
                  </a>
                  <button
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    aria-label="Toggle theme"
                    className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-4 py-2 border border-border rounded-lg hover:border-primary/40"
                  >
                    {isDark ? <Sun size={15} /> : <Moon size={15} />}
                    {isDark ? "Light Mode" : "Dark Mode"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Scroll-to-top FAB */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full glass border border-primary/30 text-primary flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all duration-300 cyan-glow"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
