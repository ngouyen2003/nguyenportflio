import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-accent-teal/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 py-4">
        <nav className="flex items-center justify-between">
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-heading text-2xl md:text-3xl font-bold text-primary hover:text-accent-teal transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CVN
          </motion.button>

          <div className="flex items-center gap-6 md:gap-8">
            <button
              onClick={() => scrollToSection('showreels')}
              className="font-paragraph text-sm md:text-base text-foreground hover:text-primary transition-colors duration-300 relative group"
            >
              Showreels
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className="font-paragraph text-sm md:text-base text-foreground hover:text-primary transition-colors duration-300 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </button>

            <a
              href="#contact"
              className="px-4 md:px-6 py-2 bg-primary text-primary-foreground font-paragraph text-sm md:text-base rounded border-2 border-primary hover:bg-transparent hover:text-primary transition-all duration-300"
            >
              Contact
            </a>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
