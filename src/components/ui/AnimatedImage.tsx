
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  effect?: 'zoom' | 'fade' | 'slide' | 'float' | 'rotate';
}

export const AnimatedImage: React.FC<AnimatedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  effect = 'fade'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setHasError(true);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  const variants = {
    zoom: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.5 } }
    },
    slide: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    },
    float: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
          duration: 0.5,
          y: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }
      }
    },
    rotate: {
      hidden: { opacity: 0, rotate: -5 },
      visible: { 
        opacity: 1, 
        rotate: 0,
        transition: { 
          duration: 0.5,
          rotate: {
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }
      }
    }
  };

  if (hasError) {
    return (
      <div 
        className={cn(
          "bg-muted flex items-center justify-center rounded-md",
          className
        )}
        style={{ width: width || '100%', height: height || 300 }}
      >
        <span className="text-muted-foreground">Image failed to load</span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden" style={{ width: width || 'auto', height: height || 'auto' }}>
      {!isLoaded && (
        <div 
          className={cn(
            "bg-muted animate-pulse rounded-md",
            className
          )}
          style={{ width: '100%', height: height || 300 }}
        />
      )}
      
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "object-cover transition-all duration-500",
          { "opacity-0": !isLoaded },
          className
        )}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={variants[effect]}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default AnimatedImage;
