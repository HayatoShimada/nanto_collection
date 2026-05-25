import { FadeInSection } from "@/components/FadeInSection";
import styles from "./styles.module.css";

export function TitleSection() {
  return (
    <FadeInSection id="title-section">
      <div className={styles.container}>
        <div className={styles.imageColumn}>
          <img src="/images/1.jpg" alt="Photo 1" className={styles.image} />
        </div>
        
        <div className={styles.textColumn}>
          <div className={styles.logoText}>
            <p className={styles.logoJa}>なんコレ</p>
            <p className={styles.logoEn}>NANTO<br />collection<br />2027</p>
          </div>
          <div className={styles.dateBlock}>
            <p className={styles.dateLabel}>開催日時</p>
            <p className={styles.date}>2027年3月14日(日)</p>
          </div>

        </div>

        <div className={styles.imageColumn}>
          <img src="/images/5.jpg" alt="Photo 5" className={styles.image} />
        </div>
      </div>
    </FadeInSection>
  );
}
