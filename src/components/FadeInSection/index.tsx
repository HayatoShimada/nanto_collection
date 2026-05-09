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
    <motion.section
      id={id}
      className={`${styles.section} ${className ?? ""}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
