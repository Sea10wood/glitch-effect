'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

type Props = {
  children: ReactNode;
};

export default function PageTransition({ children }: Props) {
  const pathname = usePathname();
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    // Dynamically import the JSON file
    import('@/app/assets/liquid.json').then((data) => {
      setAnimationData(JSON.parse(JSON.stringify(data))); // Create a copy of the object
    });

    // Trigger animation when navigating
    setShowAnimation(true);

    // Hide animation after it completes (adjust based on your animation duration)
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 1500); // Adjust the time to match the length of your animation

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{filter: 'blur(10px)', scale: 1.1 }}
        animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
        exit={{filter: 'blur(20px)', scale: 0.9 }}
        transition={{ duration: 0.8, ease: [0.6, 0.01, 0, 0.9] }}
        className="w-full min-h-screen relative"
      >
        {showAnimation && animationData && (
          <div className="absolute top-0 left-0 w-full min-h-screen z-50">
            <Lottie animationData={animationData} loop={false} />
          </div>
        )}
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
