import { COMMITTEE } from "@/constants/content";
import { SECTION_IDS } from "@/constants/links";
import { FadeInSection } from "@/components/FadeInSection";
import styles from "./styles.module.css";

export function Committee() {
  return (
    <FadeInSection id={SECTION_IDS.committee}>
      <h2 className={styles.heading}>{COMMITTEE.heading}</h2>
      {COMMITTEE.body.map((p, i) => (
        <p key={i} className={styles.body}>{p}</p>
      ))}
    </FadeInSection>
  );
}
