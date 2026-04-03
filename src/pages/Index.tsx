import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <footer className="py-8 text-center text-sm text-muted-foreground font-mono border-t border-border">
        <p>© {new Date().getFullYear()} dev.portfolio — Built with precision.</p>
      </footer>
    </div>
  );
};

export default Index;
