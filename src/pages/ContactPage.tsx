
import React, { useEffect } from 'react';
import Contact from '@/components/sections/Contact';
import { motion } from 'framer-motion';

const ContactPage = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-24"
    >
      <Contact />
    </motion.div>
  );
};

export default ContactPage;
