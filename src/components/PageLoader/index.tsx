"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./styles.module.css";

export function PageLoader({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = "/images/background.png";
    if (img.complete) {
      setLoaded(true);
      return;
    }
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(true);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
