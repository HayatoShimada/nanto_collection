import { CONTACT } from "@/constants/content";
import { LINKS, SECTION_IDS } from "@/constants/links";
import { FadeInSection } from "@/components/FadeInSection";
import styles from "./styles.module.css";

export function Contact() {
  return (
    <FadeInSection id={SECTION_IDS.contact}>
      <h2 className={styles.heading}>{CONTACT.heading}</h2>
      <div className={styles.info}>
        <p className={styles.label}>主催</p>
        <p className={styles.value}>{CONTACT.organizer}</p>
      </div>
      <div className={styles.info}>
        <p className={styles.label}>{CONTACT.label}</p>
        <p className={styles.value}>
          <a href={LINKS.mailto} className={styles.email}>{LINKS.email}</a>
          <br />
          <span className={styles.person}>（{CONTACT.person}）</span>
        </p>
      </div>
      <div className={styles.buttons}>
        <a href={LINKS.applicationForm} target="_blank" rel="noopener noreferrer" className={styles.cta}>
          {CONTACT.buttons.apply}
        </a>
        <a href={LINKS.mailto} className={styles.ctaSecondary}>
          {CONTACT.buttons.inquiry}
        </a>
      </div>
    </FadeInSection>
  );
}
