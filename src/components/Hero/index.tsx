"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HERO } from "@/constants/content";
import { SECTION_IDS } from "@/constants/links";
import styles from "./styles.module.css";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.8], [1.4, 1]);

  return (
    <div ref={containerRef} className={styles.container} id={SECTION_IDS.hero}>
      <div className={styles.stickyWrapper}>
        <div className={styles.catchcopyWrapper}>
          <h1 className={styles.title}>わたしを着る。<br />南砺に立つ。</h1>
          <p className={styles.date}>{HERO.date}</p>
          <p className={styles.tagline}>{HERO.tagline}</p>
        </div>
        <motion.div className={styles.imageWrapper} style={{ scale: imageScale }}>
          <img
            src="/images/hero.png"
            alt="NANTO Collection 2027"
            className={styles.heroImage}
          />
        </motion.div>
      </div>
    </div>
  );
}
