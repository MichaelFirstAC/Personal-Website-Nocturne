import React from 'react';
import { motion } from 'motion/react';

interface AnimatedRevealProps {
  children: React.ReactNode;
  className?: string;
  isHero?: boolean;
  delay?: number;
  duration?: number;
  yOffset?: number;
  intensity?: 'subtle' | 'standard' | 'dramatic';
  showParticles?: boolean;
  id?: string;
}

/**
 * Butter-smooth, GPU-accelerated animated reveal component.
 * Uses hardware-accelerated transform & opacity with spring/cubic-bezier easing.
 * Eliminates scroll jank, CPU repaints, and frame drops.
 */
export const ScrollReveal: React.FC<AnimatedRevealProps> = ({
  children,
  className = '',
  isHero = false,
  delay = 0,
  duration = 0.6,
  yOffset = 24,
  id,
}) => {
  if (isHero) {
    return (
      <motion.div
        id={id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
          delay,
        }}
        className={`relative ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
      transition={{
        duration,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Backward-compatible alias for existing imports
export const DisintegrateOnScroll = ScrollReveal;
export default ScrollReveal;
