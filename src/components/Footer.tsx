import { motion } from 'framer-motion';
import { Mail, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative bg-gradient-to-t from-background via-background to-transparent border-t border-accent-teal/20">
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="font-heading text-3xl font-bold text-primary">
              Cao Văn Nguyên
            </h3>
            <p className="font-paragraph text-foreground/70 text-sm">
              Video Editor chuyên về nội dung mạng xã hội
            </p>
            <p className="font-paragraph text-foreground/70 text-sm">
              Biến footage thành câu chuyện đáng nhớ
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="font-heading text-xl font-semibold text-accent-teal">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="font-paragraph text-foreground/70 hover:text-primary transition-colors duration-300 text-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('showreels')?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-paragraph text-foreground/70 hover:text-primary transition-colors duration-300 text-sm"
                >
                  Showreels
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-paragraph text-foreground/70 hover:text-primary transition-colors duration-300 text-sm"
                >
                  About Me
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="font-heading text-xl font-semibold text-accent-teal">
              Get In Touch
            </h4>
            <div className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors duration-300">
              <Mail className="w-4 h-4" />
              <a href="mailto:contact@caovannguyen.com" className="font-paragraph text-sm">
                contact@caovannguyen.com
              </a>
            </div>
            
            <div className="flex gap-4 pt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-glassmorphism-overlay backdrop-blur-sm rounded border border-accent-teal/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-foreground hover:text-primary transition-colors duration-300" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-glassmorphism-overlay backdrop-blur-sm rounded border border-accent-teal/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-foreground hover:text-primary transition-colors duration-300" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-glassmorphism-overlay backdrop-blur-sm rounded border border-accent-teal/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5 text-foreground hover:text-primary transition-colors duration-300" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-accent-teal/20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-foreground/60 text-sm text-center md:text-left">
              © {currentYear} Cao Văn Nguyên. All rights reserved.
            </p>
            <p className="font-paragraph text-foreground/60 text-sm text-center md:text-right">
              Crafted with precision and passion
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-teal/5 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
}
