import { ABOUT } from "@/constants/content";
import { SECTION_IDS } from "@/constants/links";
import { FadeInSection } from "@/components/FadeInSection";
import styles from "./styles.module.css";

export function About() {
  return (
    <FadeInSection id={SECTION_IDS.about}>
      <h2 className={styles.heading}>{ABOUT.heading}</h2>
      <p className={styles.subheading}>{ABOUT.subheading}</p>
      {ABOUT.body.map((paragraph, i) => (
        <p key={i} className={styles.body}>
          {paragraph}
        </p>
      ))}

      <div className={styles.valuesSection}>
        <h3 className={styles.valuesHeading}>{ABOUT.values.heading}</h3>
        <p className={styles.valuesSubheading}>{ABOUT.values.subheading}</p>
        {ABOUT.values.body.map((paragraph, i) => (
          <p key={i} className={styles.body}>
            {paragraph}
          </p>
        ))}
      </div>
    </FadeInSection>
  );
}
