import { APPLICATION } from "@/constants/content";
import { LINKS, SECTION_IDS } from "@/constants/links";
import { FadeInSection } from "@/components/FadeInSection";
import styles from "./styles.module.css";

export function Application() {
  return (
    <FadeInSection id={SECTION_IDS.application}>
      <h2 className={styles.heading}>{APPLICATION.heading}</h2>
      <img src="/images/4.jpg" alt="参加モデル大募集" className={styles.image} />
      {APPLICATION.body.map((p, i) => (
        <p key={i} className={styles.body}>{p}</p>
      ))}

      <div className={styles.block}>
        <h3 className={styles.subheading}>{APPLICATION.eligibility.heading}</h3>
        <ul className={styles.list}>
          {APPLICATION.eligibility.items.map((item, i) => (
            <li key={i} className={styles.listItem}>{item}</li>
          ))}
        </ul>
      </div>

      <div className={styles.block}>
        <h3 className={styles.subheading}>{APPLICATION.details.heading}</h3>
        <dl className={styles.detailList}>
          <div className={styles.detailItem}>
            <dt className={styles.detailLabel}>定員</dt>
            <dd>{APPLICATION.details.capacity}</dd>
          </div>
          <div className={styles.detailItem}>
            <dt className={styles.detailLabel}>出演料</dt>
            <dd>{APPLICATION.details.fee}</dd>
          </div>
          <div className={styles.detailItem}>
            <dt className={styles.detailLabel}>衣装について</dt>
            <dd>{APPLICATION.details.costumeDescription}</dd>
          </div>
          <div className={styles.detailItem}>
            <dt className={styles.detailLabel}>出演形態</dt>
            <dd>{APPLICATION.details.performanceNote}</dd>
          </div>
          <div className={styles.detailItem}>
            <dt className={styles.detailLabel}>申込方法</dt>
            <dd>{APPLICATION.details.applicationMethod}</dd>
          </div>
          <div className={styles.detailItem}>
            <dt className={styles.detailLabel}>申込締切</dt>
            <dd>{APPLICATION.details.deadline}</dd>
          </div>
        </dl>
        <div className={styles.examplesBlock}>
          <p className={styles.examplesLabel}>衣装の例：</p>
          <ul className={styles.list}>
            {APPLICATION.details.costumeExamples.map((ex, i) => (
              <li key={i} className={styles.listItem}>{ex}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.block}>
        <h3 className={styles.subheading}>{APPLICATION.recommendations.heading}</h3>
        <ul className={styles.list}>
          {APPLICATION.recommendations.items.map((item, i) => (
            <li key={i} className={styles.listItem}>{item}</li>
          ))}
        </ul>
        <p className={styles.note}>{APPLICATION.recommendations.note}</p>
      </div>

      <div className={styles.block}>
        <h3 className={styles.subheading}>{APPLICATION.flow.heading}</h3>
        <ol className={styles.steps}>
          {APPLICATION.flow.steps.map((step, i) => (
            <li key={i} className={styles.step}>
              <span className={styles.stepNumber}>{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <p className={styles.note}>{APPLICATION.flow.note}</p>
      </div>

      <a href={LINKS.applicationForm} target="_blank" rel="noopener noreferrer" className={styles.cta}>
        {APPLICATION.buttonText}
      </a>
    </FadeInSection>
  );
}
