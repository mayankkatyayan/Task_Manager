
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full w-10 h-10"
        aria-label="Toggle theme"
      >
        {theme === 'light' && <Sun className="h-5 w-5 text-amber-500 transition-all" />}
        {theme === 'dark' && <Moon className="h-5 w-5 text-indigo-400 transition-all" />}
        {theme === 'synthwave' && <Palette className="h-5 w-5 text-primary transition-all" />}
      </Button>
    </motion.div>
  );
};

export default ThemeSwitcher;
