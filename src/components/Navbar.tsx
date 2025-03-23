
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';
import { Button } from './ui/button';
import { Menu, X, Download } from 'lucide-react';
import { personalData } from '@/data/portfolioData';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    {
      'py-4 bg-transparent': !isScrolled && !mobileMenuOpen,
      'py-2 glass-panel glass-panel-dark glass-panel-synthwave shadow-sm': isScrolled || mobileMenuOpen
    }
  );

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-bold tracking-tighter"
          >
            <span className="text-gradient-primary synthwave-glow">
              {personalData.name.split(' ')[0]}<span className="text-foreground">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>
          
          {/* Right Side - Theme Switch & Resume */}
          <div className="flex items-center space-x-2">
            <ThemeSwitcher />
            
            {/* CV Download Button */}
            <Button 
              variant="default" 
              size="sm" 
              className="hidden md:flex items-center gap-1 rounded-full"
              asChild
            >
              <a href={personalData.resumeUrl} download>
                <Download className="h-4 w-4 mr-1" />
                Resume
              </a>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 hover:bg-primary/10 rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                
                <Button 
                  variant="default" 
                  size="sm" 
                  className="mt-2 flex items-center justify-center gap-1"
                  asChild
                >
                  <a href={personalData.resumeUrl} download>
                    <Download className="h-4 w-4 mr-1" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
