"use client";

import { motion } from "framer-motion";
import styles from "./styles.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function FadeInSection({ children, className, id }: Props) {
  return (
    <section id={id} className={`${styles.section} ${className ?? ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
