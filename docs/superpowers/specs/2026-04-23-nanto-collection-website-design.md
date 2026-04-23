# NANTO Collection Website - Design Spec

## Overview

NANTO Collection (なんコレ) のイベントウェブサイト。2027/03/14に南砺市で開催されるコミュニティファッションショーの告知・募集・寄付受付を行う単一ページサイト。

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** CSS Modules + CSS変数
- **Animation:** Framer Motion
- **Hosting:** Vercel
- **Font:** M PLUS Rounded 1c (Google Fonts, next/font/google)

## Design Constraints

- インラインCSS厳禁。全スタイルはCSS Modulesファイルで管理
- カラー・フォントはCSS変数で一元管理し、後から一括変更可能
- 全テキストコンテンツは `constants/content.ts` に定数として定義（`HP_CONTENT.md` が主要な参考資料。DESIGN.mdよりHP_CONTENT.mdを優先する）
- 外部リンク（応募フォームURL、Stripe URL、メールアドレス等）は `constants/links.ts` に分離
- ダークモード無効。常にライトモード表示（`color-scheme: light only;`）

## Layout

- モバイルファースト（max-width: 480px, margin: 0 auto）
- デスクトップでは中央寄せ + 左右余白
- 参考: https://tsuchiya-randoseru.jp/collections/depsoa

## Color Palette (Initial)

参考: https://brand.un-dimension.com/vol7

```css
:root {
  --color-primary: #4457af;      /* 深い青 */
  --color-accent-pink: #FFB4E2;  /* ピンク */
  --color-accent-red: #E24266;   /* 赤系アクセント */
  --color-background: #ffffff;
  --color-text: #333333;
  --font-heading: 'M PLUS Rounded 1c', sans-serif;
  --font-body: 'M PLUS Rounded 1c', sans-serif;
  --max-width: 480px;
}
```

後からクライアント指定で変更予定。CSS変数を変えるだけで全体反映。

## Project Structure

```
src/
  app/
    layout.tsx          # ルートレイアウト（フォント、メタデータ、ダークモード無効）
    page.tsx            # メインページ（各セクションを並べる）
    globals.css         # CSS変数、共通スタイル
  components/
    Hero/
      index.tsx
      styles.module.css
    About/
      index.tsx
      styles.module.css
    EventInfo/
      index.tsx
      styles.module.css
    Application/
      index.tsx
      styles.module.css
    Donation/
      index.tsx
      styles.module.css
    Committee/
      index.tsx
      styles.module.css
    Faq/
      index.tsx
      styles.module.css
    Contact/
      index.tsx
      styles.module.css
    FixedBanner/
      index.tsx
      styles.module.css
  constants/
    content.ts          # 全テキストコンテンツ（HP_CONTENT.mdベース）
    links.ts            # 外部リンクURL（応募フォーム、Stripe、メール等）
```

## Sections (Top to Bottom)

### 1. Hero

- 初期表示: 人物の上半身（顔〜胸あたり）のみ表示
- スクロールに応じて画像が上にスライドし全身が表れる
- Framer Motion `useScroll` + `useTransform` で実装
- 背景にキャッチコピー「わたしを着る。南砺に立つ。」
- セクション高さ: ビューポート1.5〜2画面分
- 人物画像はプレースホルダーで構築、後から差し替え

### 2. About (なんコレって何？+ 大切にしていること)

- 2つのサブセクション（「なんコレって何？」「大切にしていること」）を縦に配置
- `whileInView` でフェードイン

### 3. EventInfo (開催概要)

- 日時・会場・入場料をカード風に表示
- `whileInView` でフェードイン

### 4. Application (参加モデル募集)

- 募集テキスト → 応募資格 → こんな方におすすめ → 応募の流れ（ステップ表示） → 応募ボタン
- 応募ボタンは外部リンク（Google Forms等）、URLは `links.ts` で管理
- `whileInView` でフェードイン

### 5. Donation (寄付金・協賛金)

- お願いテキスト → 詳細（一口5,000円等） → 寄付ボタン
- 寄付ボタンはStripe Checkoutリンク、URLは `links.ts` で管理
- `whileInView` でフェードイン

### 6. Committee (実行委員会より)

- 実行委員会全体からの一つのメッセージを表示
- テキストのみ（個別の写真なし）
- `whileInView` でフェードイン

### 7. Faq (よくある質問)

- タップで開閉するアコーディオン
- Framer Motion `AnimatePresence` + `motion.div` でスムーズな開閉アニメーション
- Q&Aデータは `content.ts` で配列管理
- `whileInView` でフェードイン

### 8. Contact (お問い合わせ)

- 主催者情報（南砺市さわやかネットワーク なんコレ実行委員会）
- メールリンク（nancolle2027@gmail.com）
- `whileInView` でフェードイン

### 9. FixedBanner (固定バナー)

- 画面下部に常時固定（`position: fixed; bottom: 0;`）
- 3つのボタン: 「応募」「協賛」「問合せ」
- タップでページ内セクションにスムーズスクロール
  - 応募 → Application セクション
  - 協賛 → Donation セクション
  - 問合せ → Contact セクション
- ヒーローセクション表示中は非表示、スクロールで下に進むとフェードインで出現

## Animation Summary

| 要素 | 手法 | ライブラリ |
|------|------|-----------|
| ヒーロースクロール全身表示 | `useScroll` + `useTransform` | Framer Motion |
| セクションフェードイン | `whileInView` | Framer Motion |
| FAQアコーディオン開閉 | `AnimatePresence` + `motion.div` | Framer Motion |
| 固定バナー出現 | スクロール位置に応じたフェードイン | Framer Motion |

## Metadata / SEO

- title: "NANTO Collection 2027"
- description: HP_CONTENT.mdのファーストビュー文を要約
- OGP画像: プレースホルダー、後から差し替え
- `<html lang="ja">`

## Out of Scope (Later)

- Stripe Checkout連携（リンク先URLを後で設定）
- 応募フォーム（Google Forms等のリンクを後で設定）
- 独自ドメイン設定
- 実際のコンテンツ画像（プレースホルダーで構築）
