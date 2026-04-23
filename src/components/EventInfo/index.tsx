import { EVENT_INFO } from "@/constants/content";
import { SECTION_IDS } from "@/constants/links";
import { FadeInSection } from "@/components/FadeInSection";
import styles from "./styles.module.css";

export function EventInfo() {
  return (
    <FadeInSection id={SECTION_IDS.eventInfo}>
      <h2 className={styles.heading}>{EVENT_INFO.heading}</h2>
      <div className={styles.card}>
        <dl className={styles.list}>
          <div className={styles.item}>
            <dt className={styles.label}>日時</dt>
            <dd className={styles.value}>
              {EVENT_INFO.date}
              <br />
              {EVENT_INFO.time}
            </dd>
          </div>
          <div className={styles.item}>
            <dt className={styles.label}>会場</dt>
            <dd className={styles.value}>
              {EVENT_INFO.venue}
              <br />
              <span className={styles.address}>（{EVENT_INFO.venueAddress}）</span>
            </dd>
          </div>
          <div className={styles.item}>
            <dt className={styles.label}>入場料</dt>
            <dd className={styles.value}>{EVENT_INFO.admission}</dd>
          </div>
        </dl>
      </div>
    </FadeInSection>
  );
}
