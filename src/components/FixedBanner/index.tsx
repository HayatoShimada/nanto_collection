"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FIXED_BANNER } from "@/constants/content";
import { SECTION_IDS } from "@/constants/links";
import styles from "./styles.module.css";

export function FixedBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className={styles.banner}
      initial={{ y: "100%" }}
      animate={{ y: visible ? "0%" : "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <button
        className={styles.button}
        onClick={() => scrollTo(SECTION_IDS.application)}
      >
        {FIXED_BANNER.apply}
      </button>
      <button
        className={styles.button}
        onClick={() => scrollTo(SECTION_IDS.donation)}
      >
        {FIXED_BANNER.donate}
      </button>
      <button
        className={styles.button}
        onClick={() => scrollTo(SECTION_IDS.contact)}
      >
        {FIXED_BANNER.contact}
      </button>
    </motion.div>
  );
}
