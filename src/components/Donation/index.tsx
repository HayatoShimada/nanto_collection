import { DONATION } from "@/constants/content";
import { LINKS, SECTION_IDS } from "@/constants/links";
import { FadeInSection } from "@/components/FadeInSection";
import styles from "./styles.module.css";

export function Donation() {
  return (
    <FadeInSection id={SECTION_IDS.donation}>
      <h2 className={styles.heading}>{DONATION.heading}</h2>
      {DONATION.body.map((p, i) => (
        <p key={i} className={styles.body}>{p}</p>
      ))}

      <div className={styles.card}>
        <h3 className={styles.detailHeading}>{DONATION.details.heading}</h3>
        <dl className={styles.detailList}>
          <div className={styles.detailItem}>
            <dt className={styles.detailLabel}>{DONATION.details.unitLabel}</dt>
            <dd className={styles.detailValue}>{DONATION.details.unitPrice}</dd>
          </div>
          <div className={styles.detailItem}>
            <dt className={styles.detailLabel}>上限</dt>
            <dd className={styles.detailValue}>{DONATION.details.maxUnits}</dd>
          </div>
        </dl>
        <p className={styles.benefit}>{DONATION.details.benefit}</p>
        <p className={styles.note}>{DONATION.details.note}</p>
      </div>

      <div className={styles.buttons}>
        <a href={LINKS.mailto} className={styles.ctaSecondary}>
          {DONATION.buttons.inquiry}
        </a>
        <a href={LINKS.stripeCheckout} target="_blank" rel="noopener noreferrer" className={styles.cta}>
          {DONATION.buttons.apply}
        </a>
      </div>
    </FadeInSection>
  );
}
