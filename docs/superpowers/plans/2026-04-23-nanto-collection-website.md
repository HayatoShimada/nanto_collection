# NANTO Collection Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page event website for NANTO Collection 2027, a community fashion show in Nanto City.

**Architecture:** Next.js App Router with a single page (`page.tsx`) composing 8 section components + a fixed banner. All text lives in `constants/content.ts`, all external URLs in `constants/links.ts`. Styling uses CSS Modules with CSS custom properties for theming. Animations use Framer Motion.

**Tech Stack:** Next.js (App Router), CSS Modules, Framer Motion, Inter + Noto Sans JP + Noto Serif JP (Google Fonts)

**Spec:** `docs/superpowers/specs/2026-04-23-nanto-collection-website-design.md`

**Content source:** `HP_CONTENT.md` is the primary reference for all text content.

---

## File Map

```
src/
  app/
    layout.tsx          — Root layout: font loading, metadata, dark mode off, lang="ja"
    page.tsx            — Composes all section components in order
    globals.css         — CSS custom properties (colors, fonts, max-width), resets
  components/
    Hero/
      index.tsx         — Hero section with scroll-reveal animation (client component)
      styles.module.css — Hero styles
    About/
      index.tsx         — "なんコレって何？" + "大切にしていること" sections
      styles.module.css
    EventInfo/
      index.tsx         — Event details card (date, venue, admission)
      styles.module.css
    Application/
      index.tsx         — Model recruitment, eligibility, recommendations, flow, CTA
      styles.module.css
    Donation/
      index.tsx         — Donation/sponsorship appeal + details + CTA
      styles.module.css
    Committee/
      index.tsx         — Single message from the organizing committee
      styles.module.css
    Faq/
      index.tsx         — Accordion Q&A (client component)
      styles.module.css
    Contact/
      index.tsx         — Organizer info + mailto link
      styles.module.css
    FixedBanner/
      index.tsx         — Fixed bottom bar with 3 anchor buttons (client component)
      styles.module.css
    FadeInSection/
      index.tsx         — Reusable Framer Motion whileInView wrapper (client component)
      styles.module.css
  constants/
    content.ts          — All Japanese text content as typed constants
    links.ts            — External URLs (application form, Stripe, mailto)
  public/
    images/
      hero-placeholder.svg — Placeholder hero image
```

---

### Task 1: Project Setup

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts` (via `create-next-app`)

- [ ] **Step 1: Scaffold Next.js project**

Run from the repo root (`/Users/hayatoshimada/Documents/Code/nanto_collection-1`):

```bash
npx create-next-app@latest . --typescript --app --src-dir --no-tailwind --no-eslint --import-alias "@/*" --use-npm
```

When prompted about overwriting, say yes. This creates the App Router structure under `src/`.

- [ ] **Step 2: Install Framer Motion**

```bash
npm install framer-motion
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts on `http://localhost:3000`, default Next.js page renders.

- [ ] **Step 4: Clean up scaffolded files**

Remove default content from `src/app/page.tsx` and `src/app/globals.css`. Delete `src/app/page.module.css` if created. Keep the files but empty their content (we'll fill them in later tasks).

`src/app/page.tsx`:
```tsx
export default function Home() {
  return <main></main>;
}
```

`src/app/globals.css`:
```css
/* Filled in Task 2 */
```

Delete these if they exist:
- `src/app/page.module.css`
- `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with Framer Motion"
```

---

### Task 2: Global Styles and Layout

**Files:**
- Create: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Write global CSS with custom properties**

`src/app/globals.css`:

```css
:root {
  --color-primary: #555555;
  --color-accent: #f39b8f;
  --color-background: #f6f6f6;
  --color-background-white: #ffffff;
  --color-text: #555555;
  --color-text-light: #bfbfbf;
  --color-border: #e6e6e6;
  --font-heading-en: 'Inter', sans-serif;
  --font-heading-ja: 'Noto Serif JP', serif;
  --font-body: 'Noto Sans JP', sans-serif;
  --max-width: 480px;
  --banner-height: 60px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  color-scheme: light only;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  font-weight: 300;
  color: var(--color-text);
  background-color: var(--color-background);
  line-height: 1.8;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

- [ ] **Step 2: Write root layout with font and metadata**

`src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NANTO Collection 2027",
  description:
    "南砺市民の、南砺市民による、南砺市民のためのファッションショー「NANTO Collection 2027」。2027年3月14日（土）開催。",
  openGraph: {
    title: "NANTO Collection 2027",
    description:
      "南砺市民の、南砺市民による、南砺市民のためのファッションショー",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable} ${notoSerifJP.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify in browser**

Run `npm run dev`. Confirm:
- Page loads with light gray (#f6f6f6) background
- No dark mode applied regardless of system setting
- Inter, Noto Sans JP, Noto Serif JP fonts are loaded (check Network tab)

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: add global styles with CSS variables and root layout"
```

---

### Task 3: Constants

**Files:**
- Create: `src/constants/content.ts`
- Create: `src/constants/links.ts`

- [ ] **Step 1: Create content constants**

`src/constants/content.ts` — All text from `HP_CONTENT.md`:

```ts
export const SITE = {
  title: "NANTO Collection 2027",
  subtitle: "わたしを着る。南砺に立つ。",
  date: "2027年3月14日（土）",
  tagline: "南砺市民の、南砺市民による、南砺市民のためのファッションショー",
} as const;

export const HERO = {
  catchcopy: "わたしを着る。南砺に立つ。",
  date: "2027年3月14日（土）開催",
  tagline: SITE.tagline,
  buttons: {
    apply: "参加モデル応募はこちら",
    donate: "寄付・協賛について",
    contact: "お問い合わせ",
  },
} as const;

export const ABOUT = {
  heading: "なんコレってなに？",
  subheading: SITE.tagline,
  body: [
    "なんコレとは、南砺市民の、南砺市民による、南砺市民のためのファッションショー「NANTO Collection」 です。",
    "自分らしく、自由に、いきいきと、「私がわたしを生きる」 を思いきり楽しみながら表現するステージ。",
    "大切にしたいのは、上手に見せることや、誰かの正解に合わせることではなく、その人自身の想い、その人らしい在り方がまっすぐ立ち上がることです。",
    "ひとりの挑戦が、誰かの心を動かす。ひとりの表現が、まちの空気を変える力になる。",
    "なんコレは、そんなきっかけになることを目指しています。",
  ],
  values: {
    heading: "なんコレが大切にしていること",
    subheading: "自分らしく立つことが、まちを元気にする",
    body: [
      "なんコレが大切にしているのは、「特別な誰か」のステージではなく、南砺で生きる一人ひとりが、自由に自分を表現できる場であるということです。",
      "年齢も、性別も、経験も問いません。必要なのは、「自分を表現してみたい」「一歩踏み出してみたい」という、その気持ちです。",
      "誰かみたいになるためではなく、自分自身を生きるために。",
      "その姿が、きっと誰かの勇気になっていく。なんコレは、そんなあたたかな循環が生まれる場でありたいと思っています。",
    ],
  },
} as const;

export const EVENT_INFO = {
  heading: "開催概要",
  date: "2027年3月14日（土）",
  time: "開場 14:00 ／ 開演 14:30",
  venue: "なんとエナジー文化創造センター ヘリオス 円形劇場",
  venueAddress: "南砺市やかた100",
  admission: "無料",
} as const;

export const APPLICATION = {
  heading: "参加モデル大募集中！",
  body: [
    "南砺市に息づく、すべての方へ。",
    "一日限りのこのステージで、心の声を大切に「わたしを表現する」ことに挑戦してみませんか。",
    "必要なのは、南砺市で自分らしく生きていきたいという思いだけ。",
    "さあ、一緒に踏み出そう。あなたの一歩が、南砺の未来を変える力になります。",
  ],
  eligibility: {
    heading: "応募資格",
    items: [
      "南砺市にお住まいの方",
      "南砺市に通勤・通学している方",
      "南砺市にゆかりのある方",
      "年齢・性別不問",
      "推薦での応募もOK",
    ],
  },
  details: {
    heading: "募集要項",
    capacity: "30〜40人程度（応募多数の場合、抽選とさせていただきます）",
    fee: "無料",
    costumeDescription:
      "「自分が表現したいこと」をテーマに、各自ご用意いただきます。衣装選びや準備については、実行委員会がサポートいたしますので、どうぞお気軽にご相談ください。",
    costumeExamples: [
      "ウェディングドレスをもう一度！",
      "鮮やかなカラードレスをまとって",
      "なかなか着る機会のなくなってしまったお着物を今風にアレンジして",
      "スーツをビシッと、親子、家族、お孫さんとおそろいで",
      "友達同士でテーマを決めて",
    ],
    performanceNote:
      "お一人での出演はもちろん、親子で、お孫さんと、友達同士で、カップルで、グループでの出演も歓迎します。",
    applicationMethod:
      "申込フォームよりお申し込みください。お申し込み完了後、実行委員会よりご連絡させていただきます。",
    deadline: "2026年8月31日（月）",
  },
  recommendations: {
    heading: "こんな方に参加してほしい",
    items: [
      "自分らしさを表現してみたい方",
      "新しいことに挑戦してみたい方",
      "南砺で何か面白いことをしてみたい方",
      "一歩踏み出すきっかけがほしい方",
      "大切な人と一緒に思い出に残る舞台に立ってみたい方",
      "「私がわたしを生きる」を形にしてみたい方",
    ],
    note: "経験の有無は関係ありません。ファッションショーに出たことがない方も、大歓迎です！",
  },
  flow: {
    heading: "応募後の流れ",
    steps: [
      "申込フォームから応募",
      "実行委員会よりご連絡",
      "出演に向けたご案内・ご相談",
      "衣装や表現内容の準備",
      "当日に向けた打ち合わせや練習など",
      "本番当日、午前中にステージでリハーサル",
      "いざ本番へ！",
    ],
    note: "はじめての方にも安心してご参加いただけるよう、実行委員会でサポートしながら準備を進めていきます。",
  },
  buttonText: "参加モデルに応募する",
} as const;

export const DONATION = {
  heading: "寄付金・協賛金のお願い",
  body: [
    "なんコレの想いに共感し、この挑戦を応援したいと思ってくださる方からのご寄付・ご協賛を募っています。",
    "皆さまのご支援が、一人ひとりの表現を後押しし、南砺市の新しい未来を育てていきます。",
    "このステージを、出演する人にとっても、観る人にとっても、「南砺って面白い」「ここで生きるっていいな」と思える場にしていくために。",
    "ぜひお力をお貸しください。",
  ],
  details: {
    heading: "ご支援について",
    unitPrice: "5,000円",
    unitLabel: "一口",
    maxUnits: "10口（5万円）",
    benefit:
      "お名前を当日配布パンフレットに記載させていただきます。※金額に応じて、記載するお名前の大きさが変わります。",
    note: "ご寄付・ご協賛についての詳細は、実行委員会までお気軽にお問い合わせください。",
  },
  buttons: {
    inquiry: "寄付・協賛について問い合わせる",
    apply: "寄付・協賛を申し込む",
  },
} as const;

export const COMMITTEE = {
  heading: "実行委員会より",
  body: [
    "南砺には、まだまだたくさんの魅力があります。そしてその魅力は、このまちで生きる一人ひとりの中に、すでに息づいていると思っています。",
    "なんコレは、特別な誰かをただ"見る"だけの舞台ではなく、南砺に生きる一人ひとりの存在や表現が光る場をつくりたいという思いから生まれました。",
    "自分を生きること。自分の想いをまとって立つこと。その姿はきっと、想像以上に美しく、力強いものです。",
    "この挑戦が、南砺の新しい景色につながっていくことを願っています。",
    "たくさんのご参加、ご来場、ご支援を心よりお待ちしております。",
  ],
} as const;

export const FAQ = {
  heading: "よくある質問",
  items: [
    {
      question: "ファッションショー未経験でも参加できますか？",
      answer:
        "はい、もちろんです。経験の有無は問いません。はじめての方にも安心してご参加いただけるよう、実行委員会がサポートします。",
    },
    {
      question: "一人で参加するのが不安です。",
      answer:
        "お一人での参加も大歓迎です。不安なことがあれば、事前にお気軽にご相談ください。",
    },
    {
      question: "家族や友人と一緒に出演できますか？",
      answer:
        "はい、可能です。親子、お孫さんと、友人同士、カップル、グループなど、さまざまな出演形態を想定しています。",
    },
    {
      question: "衣装について相談できますか？",
      answer:
        "はい。衣装選びや準備については実行委員会がサポートしますので、お気軽にご相談ください。",
    },
    {
      question: "年齢制限はありますか？",
      answer:
        "ありません。年齢・性別を問わずご参加いただけます。",
    },
  ],
} as const;

export const CONTACT = {
  heading: "お問い合わせ",
  organizer: "南砺市さわやかネットワーク なんコレ実行委員会",
  label: "お問い合わせ先",
  person: "米倉宛",
  buttons: {
    apply: "参加モデル応募はこちら",
    inquiry: "寄付・協賛について問い合わせる",
  },
} as const;

export const FIXED_BANNER = {
  apply: "応募",
  donate: "協賛",
  contact: "問合せ",
} as const;
```

- [ ] **Step 2: Create links constants**

`src/constants/links.ts`:

```ts
export const LINKS = {
  applicationForm: "#application",
  stripeCheckout: "#donation",
  email: "nancolle2027@gmail.com",
  mailto: "mailto:nancolle2027@gmail.com",
} as const;

export const SECTION_IDS = {
  hero: "hero",
  about: "about",
  eventInfo: "event-info",
  application: "application",
  donation: "donation",
  committee: "committee",
  faq: "faq",
  contact: "contact",
} as const;
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/constants/
git commit -m "feat: add content and links constants from HP_CONTENT.md"
```

---

### Task 4: FadeInSection Wrapper

**Files:**
- Create: `src/components/FadeInSection/index.tsx`
- Create: `src/components/FadeInSection/styles.module.css`

- [ ] **Step 1: Create the reusable fade-in wrapper**

`src/components/FadeInSection/index.tsx`:

```tsx
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
```

- [ ] **Step 2: Create styles**

`src/components/FadeInSection/styles.module.css`:

```css
.section {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 80px 24px;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/FadeInSection/
git commit -m "feat: add FadeInSection reusable animation wrapper"
```

---

### Task 5: Hero Section

**Files:**
- Create: `src/components/Hero/index.tsx`
- Create: `src/components/Hero/styles.module.css`
- Create: `public/images/hero-placeholder.svg`

- [ ] **Step 1: Create hero placeholder image**

`public/images/hero-placeholder.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" fill="none">
  <rect width="400" height="800" fill="#f0f0f0"/>
  <circle cx="200" cy="180" r="60" fill="#ccc"/>
  <rect x="150" y="260" width="100" height="200" rx="20" fill="#ccc"/>
  <rect x="140" y="460" width="50" height="200" rx="10" fill="#ccc"/>
  <rect x="210" y="460" width="50" height="200" rx="10" fill="#ccc"/>
  <text x="200" y="750" text-anchor="middle" fill="#999" font-size="16">モデル写真</text>
</svg>
```

- [ ] **Step 2: Create Hero component**

`src/components/Hero/index.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HERO } from "@/constants/content";
import { SECTION_IDS } from "@/constants/links";
import styles from "./styles.module.css";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const clipBottom = useTransform(scrollYProgress, [0, 0.6], [40, 0]);
  const clipPath = useTransform(
    clipBottom,
    (v) => `inset(0 0 ${v}% 0)`
  );

  return (
    <div ref={containerRef} className={styles.container} id={SECTION_IDS.hero}>
      <div className={styles.stickyWrapper}>
        <div className={styles.catchcopyWrapper}>
          <h1 className={styles.title}>{HERO.catchcopy}</h1>
          <p className={styles.date}>{HERO.date}</p>
          <p className={styles.tagline}>{HERO.tagline}</p>
        </div>
        <motion.div className={styles.imageWrapper} style={{ y: imageY, clipPath }}>
          <img
            src="/images/hero-placeholder.svg"
            alt="NANTO Collection 2027"
            className={styles.heroImage}
          />
        </motion.div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create Hero styles**

`src/components/Hero/styles.module.css`:

```css
.container {
  position: relative;
  height: 200vh;
  background: var(--color-background-white);
}

.stickyWrapper {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  max-width: var(--max-width);
  margin: 0 auto;
}

.catchcopyWrapper {
  position: absolute;
  z-index: 1;
  text-align: center;
  padding: 0 24px;
}

.title {
  font-family: var(--font-heading-ja);
  font-size: 1.75rem;
  font-weight: 300;
  color: var(--color-primary);
  letter-spacing: 0.15em;
  margin-bottom: 20px;
  line-height: 1.6;
}

.date {
  font-family: var(--font-heading-en);
  font-size: 0.8125rem;
  font-weight: 300;
  color: var(--color-text);
  margin-bottom: 8px;
  letter-spacing: 0.1em;
}

.tagline {
  font-size: 0.75rem;
  font-weight: 300;
  color: var(--color-text-light);
  letter-spacing: 0.05em;
}

.imageWrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.heroImage {
  width: 60%;
  max-width: 300px;
  height: auto;
  object-fit: contain;
}
```

- [ ] **Step 4: Verify in browser**

Run `npm run dev`. Confirm:
- Hero takes up 2 viewport heights
- Catchcopy text is centered
- Scrolling reveals more of the placeholder image
- Image clips from bottom to top as you scroll

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero/ public/images/
git commit -m "feat: add Hero section with scroll-reveal animation"
```

---

### Task 6: About Section

**Files:**
- Create: `src/components/About/index.tsx`
- Create: `src/components/About/styles.module.css`

- [ ] **Step 1: Create About component**

`src/components/About/index.tsx`:

```tsx
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
```

- [ ] **Step 2: Create About styles**

`src/components/About/styles.module.css`:

```css
.heading {
  font-family: var(--font-heading-ja);
  font-size: 1.375rem;
  font-weight: 400;
  color: var(--color-primary);
  margin-bottom: 12px;
  letter-spacing: 0.1em;
}

.subheading {
  font-size: 0.8125rem;
  color: var(--color-accent);
  font-weight: 400;
  margin-bottom: 32px;
  letter-spacing: 0.05em;
}

.body {
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 2.2;
  margin-bottom: 16px;
}

.valuesSection {
  margin-top: 64px;
}

.valuesHeading {
  font-family: var(--font-heading-ja);
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--color-primary);
  margin-bottom: 8px;
  letter-spacing: 0.1em;
}

.valuesSubheading {
  font-size: 0.8125rem;
  color: var(--color-accent);
  font-weight: 400;
  margin-bottom: 32px;
  letter-spacing: 0.05em;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/About/
git commit -m "feat: add About section"
```

---

### Task 7: EventInfo Section

**Files:**
- Create: `src/components/EventInfo/index.tsx`
- Create: `src/components/EventInfo/styles.module.css`

- [ ] **Step 1: Create EventInfo component**

`src/components/EventInfo/index.tsx`:

```tsx
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
```

- [ ] **Step 2: Create EventInfo styles**

`src/components/EventInfo/styles.module.css`:

```css
.heading {
  font-family: var(--font-heading-ja);
  font-size: 1.375rem;
  font-weight: 400;
  color: var(--color-primary);
  margin-bottom: 32px;
  letter-spacing: 0.1em;
}

.card {
  background: var(--color-background-white);
  border-radius: 12px;
  padding: 32px 24px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  font-family: var(--font-heading-en);
  font-size: 0.6875rem;
  font-weight: 400;
  color: var(--color-accent);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.value {
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.8;
}

.address {
  font-size: 0.75rem;
  color: var(--color-text-light);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/EventInfo/
git commit -m "feat: add EventInfo section"
```

---

### Task 8: Application Section

**Files:**
- Create: `src/components/Application/index.tsx`
- Create: `src/components/Application/styles.module.css`

- [ ] **Step 1: Create Application component**

`src/components/Application/index.tsx`:

```tsx
import { APPLICATION } from "@/constants/content";
import { LINKS, SECTION_IDS } from "@/constants/links";
import { FadeInSection } from "@/components/FadeInSection";
import styles from "./styles.module.css";

export function Application() {
  return (
    <FadeInSection id={SECTION_IDS.application}>
      <h2 className={styles.heading}>{APPLICATION.heading}</h2>
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
```

- [ ] **Step 2: Create Application styles**

`src/components/Application/styles.module.css`:

```css
.heading {
  font-family: var(--font-heading-ja);
  font-size: 1.375rem;
  font-weight: 400;
  color: var(--color-primary);
  margin-bottom: 20px;
  letter-spacing: 0.1em;
}

.body {
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 2.2;
  margin-bottom: 12px;
}

.block {
  margin-top: 48px;
}

.subheading {
  font-family: var(--font-heading-ja);
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-primary);
  margin-bottom: 20px;
  letter-spacing: 0.08em;
}

.list {
  list-style: none;
  padding: 0;
}

.listItem {
  font-size: 0.875rem;
  font-weight: 300;
  padding: 6px 0 6px 20px;
  position: relative;
}

.listItem::before {
  content: "";
  position: absolute;
  left: 0;
  top: 14px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
}

.detailList {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detailItem {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detailLabel {
  font-family: var(--font-heading-en);
  font-size: 0.6875rem;
  font-weight: 400;
  color: var(--color-accent);
  letter-spacing: 0.1em;
}

.examplesBlock {
  margin-top: 20px;
}

.examplesLabel {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--color-text-light);
  margin-bottom: 8px;
}

.note {
  font-size: 0.75rem;
  font-weight: 300;
  color: var(--color-text-light);
  margin-top: 16px;
  line-height: 1.8;
}

.steps {
  list-style: none;
  padding: 0;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 0;
  font-size: 0.875rem;
  font-weight: 300;
  border-bottom: 1px solid var(--color-border);
}

.stepNumber {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  font-family: var(--font-heading-en);
  font-size: 0.6875rem;
  font-weight: 400;
  flex-shrink: 0;
}

.cta {
  display: block;
  width: 100%;
  margin-top: 48px;
  padding: 16px;
  text-align: center;
  background: var(--color-accent);
  color: #fff;
  font-weight: 400;
  font-size: 0.875rem;
  border-radius: 8px;
  letter-spacing: 0.05em;
  transition: opacity 0.2s;
}

.cta:hover {
  opacity: 0.85;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Application/
git commit -m "feat: add Application section"
```

---

### Task 9: Donation Section

**Files:**
- Create: `src/components/Donation/index.tsx`
- Create: `src/components/Donation/styles.module.css`

- [ ] **Step 1: Create Donation component**

`src/components/Donation/index.tsx`:

```tsx
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
```

- [ ] **Step 2: Create Donation styles**

`src/components/Donation/styles.module.css`:

```css
.heading {
  font-family: var(--font-heading-ja);
  font-size: 1.375rem;
  font-weight: 400;
  color: var(--color-primary);
  margin-bottom: 20px;
  letter-spacing: 0.1em;
}

.body {
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 2.2;
  margin-bottom: 12px;
}

.card {
  background: var(--color-background-white);
  border-radius: 12px;
  padding: 28px 24px;
  margin-top: 32px;
}

.detailHeading {
  font-family: var(--font-heading-ja);
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-primary);
  margin-bottom: 20px;
}

.detailList {
  display: flex;
  gap: 32px;
  margin-bottom: 20px;
}

.detailItem {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detailLabel {
  font-family: var(--font-heading-en);
  font-size: 0.6875rem;
  font-weight: 400;
  color: var(--color-accent);
  letter-spacing: 0.1em;
}

.detailValue {
  font-size: 1.25rem;
  font-weight: 400;
}

.benefit {
  font-size: 0.75rem;
  font-weight: 300;
  line-height: 1.8;
  color: var(--color-text-light);
  margin-bottom: 8px;
}

.note {
  font-size: 0.75rem;
  font-weight: 300;
  color: var(--color-text-light);
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 32px;
}

.cta {
  display: block;
  width: 100%;
  padding: 16px;
  text-align: center;
  background: var(--color-accent);
  color: #fff;
  font-weight: 400;
  font-size: 0.875rem;
  border-radius: 8px;
  letter-spacing: 0.05em;
  transition: opacity 0.2s;
}

.cta:hover {
  opacity: 0.85;
}

.ctaSecondary {
  display: block;
  width: 100%;
  padding: 16px;
  text-align: center;
  background: transparent;
  color: var(--color-primary);
  font-weight: 400;
  font-size: 0.875rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  letter-spacing: 0.05em;
  transition: opacity 0.2s;
}

.ctaSecondary:hover {
  opacity: 0.85;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Donation/
git commit -m "feat: add Donation section"
```

---

### Task 10: Committee Section

**Files:**
- Create: `src/components/Committee/index.tsx`
- Create: `src/components/Committee/styles.module.css`

- [ ] **Step 1: Create Committee component**

`src/components/Committee/index.tsx`:

```tsx
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
```

- [ ] **Step 2: Create Committee styles**

`src/components/Committee/styles.module.css`:

```css
.heading {
  font-family: var(--font-heading-ja);
  font-size: 1.375rem;
  font-weight: 400;
  color: var(--color-primary);
  margin-bottom: 32px;
  letter-spacing: 0.1em;
}

.body {
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 2.2;
  margin-bottom: 16px;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Committee/
git commit -m "feat: add Committee section"
```

---

### Task 11: FAQ Section (Accordion)

**Files:**
- Create: `src/components/Faq/index.tsx`
- Create: `src/components/Faq/styles.module.css`

- [ ] **Step 1: Create FAQ component**

`src/components/Faq/index.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ } from "@/constants/content";
import { SECTION_IDS } from "@/constants/links";
import { FadeInSection } from "@/components/FadeInSection";
import styles from "./styles.module.css";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.item}>
      <button
        className={styles.question}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>Q. {question}</span>
        <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}>
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className={styles.answerWrapper}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className={styles.answer}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  return (
    <FadeInSection id={SECTION_IDS.faq}>
      <h2 className={styles.heading}>{FAQ.heading}</h2>
      <div className={styles.list}>
        {FAQ.items.map((item, i) => (
          <FaqItem key={i} question={item.question} answer={item.answer} />
        ))}
      </div>
    </FadeInSection>
  );
}
```

- [ ] **Step 2: Create FAQ styles**

`src/components/Faq/styles.module.css`:

```css
.heading {
  font-family: var(--font-heading-ja);
  font-size: 1.375rem;
  font-weight: 400;
  color: var(--color-primary);
  margin-bottom: 32px;
  letter-spacing: 0.1em;
}

.list {
  display: flex;
  flex-direction: column;
}

.item {
  border-bottom: 1px solid var(--color-border);
}

.question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-text);
  text-align: left;
  gap: 12px;
}

.icon {
  font-family: var(--font-heading-en);
  font-size: 1.125rem;
  font-weight: 200;
  color: var(--color-accent);
  transition: transform 0.3s;
  flex-shrink: 0;
}

.iconOpen {
  transform: rotate(45deg);
}

.answerWrapper {
  overflow: hidden;
}

.answer {
  font-size: 0.8125rem;
  font-weight: 300;
  line-height: 2;
  color: var(--color-text-light);
  padding: 0 0 24px 0;
}
```

- [ ] **Step 3: Verify in browser**

Run `npm run dev`. Confirm:
- Tapping a question opens the answer with smooth animation
- The "+" rotates to "x" when open
- Tapping again closes with animation
- Multiple items can be opened independently

- [ ] **Step 4: Commit**

```bash
git add src/components/Faq/
git commit -m "feat: add FAQ section with accordion animation"
```

---

### Task 12: Contact Section

**Files:**
- Create: `src/components/Contact/index.tsx`
- Create: `src/components/Contact/styles.module.css`

- [ ] **Step 1: Create Contact component**

`src/components/Contact/index.tsx`:

```tsx
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
```

- [ ] **Step 2: Create Contact styles**

`src/components/Contact/styles.module.css`:

```css
.heading {
  font-family: var(--font-heading-ja);
  font-size: 1.375rem;
  font-weight: 400;
  color: var(--color-primary);
  margin-bottom: 32px;
  letter-spacing: 0.1em;
}

.info {
  margin-bottom: 24px;
}

.label {
  font-family: var(--font-heading-en);
  font-size: 0.6875rem;
  font-weight: 400;
  color: var(--color-accent);
  letter-spacing: 0.15em;
  margin-bottom: 4px;
}

.value {
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.8;
}

.email {
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.person {
  font-size: 0.75rem;
  color: var(--color-text-light);
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 40px;
  padding-bottom: calc(var(--banner-height) + 24px);
}

.cta {
  display: block;
  width: 100%;
  padding: 16px;
  text-align: center;
  background: var(--color-accent);
  color: #fff;
  font-weight: 400;
  font-size: 0.875rem;
  border-radius: 8px;
  letter-spacing: 0.05em;
  transition: opacity 0.2s;
}

.cta:hover {
  opacity: 0.85;
}

.ctaSecondary {
  display: block;
  width: 100%;
  padding: 16px;
  text-align: center;
  background: transparent;
  color: var(--color-primary);
  font-weight: 400;
  font-size: 0.875rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  letter-spacing: 0.05em;
  transition: opacity 0.2s;
}

.ctaSecondary:hover {
  opacity: 0.85;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact/
git commit -m "feat: add Contact section"
```

---

### Task 13: FixedBanner

**Files:**
- Create: `src/components/FixedBanner/index.tsx`
- Create: `src/components/FixedBanner/styles.module.css`

- [ ] **Step 1: Create FixedBanner component**

`src/components/FixedBanner/index.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FIXED_BANNER } from "@/constants/content";
import { SECTION_IDS } from "@/constants/links";
import styles from "./styles.module.css";

export function FixedBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className={styles.banner}
      initial={{ y: "100%" }}
      animate={{ y: visible ? "0%" : "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <button
        className={styles.button}
        onClick={() => scrollTo(SECTION_IDS.application)}
      >
        {FIXED_BANNER.apply}
      </button>
      <button
        className={styles.button}
        onClick={() => scrollTo(SECTION_IDS.donation)}
      >
        {FIXED_BANNER.donate}
      </button>
      <button
        className={styles.button}
        onClick={() => scrollTo(SECTION_IDS.contact)}
      >
        {FIXED_BANNER.contact}
      </button>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create FixedBanner styles**

`src/components/FixedBanner/styles.module.css`:

```css
.banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  gap: 0;
  background: var(--color-primary);
  height: var(--banner-height);
  max-width: var(--max-width);
  margin: 0 auto;
}

.button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 400;
  cursor: pointer;
  transition: background 0.2s;
  letter-spacing: 0.1em;
}

.button:not(:last-child) {
  border-right: 1px solid rgba(255, 255, 255, 0.15);
}

.button:hover {
  background: rgba(255, 255, 255, 0.08);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/FixedBanner/
git commit -m "feat: add FixedBanner with scroll-triggered visibility"
```

---

### Task 14: Assemble Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Compose all sections in page.tsx**

`src/app/page.tsx`:

```tsx
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { EventInfo } from "@/components/EventInfo";
import { Application } from "@/components/Application";
import { Donation } from "@/components/Donation";
import { Committee } from "@/components/Committee";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { FixedBanner } from "@/components/FixedBanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <EventInfo />
      <Application />
      <Donation />
      <Committee />
      <Faq />
      <Contact />
      <FixedBanner />
    </main>
  );
}
```

- [ ] **Step 2: Verify full page in browser**

Run `npm run dev`. Confirm:
- All sections render in correct order
- Hero scroll animation works (image reveals on scroll)
- Each section fades in when scrolled into view
- FAQ accordion opens/closes smoothly
- Fixed banner appears after scrolling past hero
- Banner buttons scroll to correct sections
- Layout is centered with max-width 480px
- Fonts are Inter (English), Noto Serif JP (headings), Noto Sans JP (body) with thin/light weights
- Overall aesthetic is minimal, clean, with ample whitespace and gray-toned color palette

- [ ] **Step 3: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Run build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble all sections in page.tsx"
```

---

### Task 15: Final Verification and Polish

- [ ] **Step 1: Test mobile viewport**

Open browser DevTools, set viewport to 375px width (iPhone SE). Verify:
- All content fits within viewport
- No horizontal overflow
- Text is readable
- Buttons are tappable (minimum 44px height)
- Fixed banner is usable

- [ ] **Step 2: Test desktop viewport**

Set viewport to 1440px width. Verify:
- Content is centered with side margins
- Max-width constraint is respected
- No layout breaks

- [ ] **Step 3: Test smooth scrolling**

Click each fixed banner button. Verify:
- Smooth scroll to target section
- Target section is not hidden behind fixed banner

- [ ] **Step 4: Fix any issues found**

Address any visual or functional issues discovered during testing.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final polish and fixes"
```
