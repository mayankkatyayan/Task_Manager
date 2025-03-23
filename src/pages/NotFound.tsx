
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div 
        className="text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-8xl font-bold mb-4 text-gradient-primary synthwave-glow">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! This page doesn't exist.</p>
        <Button size="lg" className="rounded-full" asChild>
          <a href="/">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </a>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
