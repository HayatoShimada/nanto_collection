"use client";

import { SECTION_IDS } from "@/constants/links";
import styles from "./styles.module.css";

export function Hero() {
  return (
    <div className={styles.container} id={SECTION_IDS.hero}>
      <div className={styles.imageWrapper}>
        <img
          src="/images/hero.jpg"
          alt="NANTO Collection 2027"
          className={styles.heroImage}
        />
      </div>
    </div>
  );
}
