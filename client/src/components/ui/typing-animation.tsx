import { useEffect, useState } from "react";

const typingTexts = [
  'フリーランスエンジニア集団',
  '革新的なソリューション提供', 
  'あなたのビジネスパートナー'
];

export default function TypingAnimation() {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState# thoughts

この要求は、CRUD5thというエンジニアチームの高級感のあるコーポレートサイトを作成することです。デザインリファレンスを見ると、黒ベースで黄色をアクセントにした洗練されたデザインで、多くのアニメーション効果が含まれています。

主な要素：
- 黒ベースのプレミアムデザイン（黄色アクセント）
- パーティクルエフェクトとタイピングアニメーション付きヒーローセクション
- Framer Motionによる高度なアニメーション
- サービス紹介（受託開発、自社サービス開発、DX・ITコンサル）
- チームメンバー紹介（髙橋綱弥、かえる、mir）
- お問い合わせフォーム機能
- スクロール連動アニメーション
- ソーシャルリンク

技術スタック：
- React + TypeScript
- Tailwind CSS + Shadcn UI
- Framer Motion
- React Hook Form
- Express.js（お問い合わせフォーム用）

デザインリファレンスから色値を抽出：
- background: hsl(0 0% 7%) - 非常に暗いグレー
- foreground: hsl(0 0% 98%) - 白に近い
- primary: hsl(45 100% 50%) - 鮮やかな黄色
- secondary: hsl(0 0% 15%) - 暗いグレー
- border: hsl(0 0% 20%) - 境界線用グレー

# useful_guidelines_from_blueprints

該当なし

# directory_structure

```json
[
    {"path": "client/src/index.css", "status": "overwritten"},
    {"path": "tailwind.config.ts", "status": "overwritten"},
    {"path": "client/src/App.tsx", "status": "overwritten"},
    {"path": "client/src/pages/home.tsx", "status": "new"},
    {"path": "client/src/components/ui/navigation.tsx", "status": "new"},
    {"path": "client/src/components/sections/hero.tsx", "status": "new"},
    {"path": "client/src/components/sections/services.tsx", "status": "new"},
    {"path": "client/src/components/sections/team.tsx", "status": "new"},
    {"path": "client/src/components/sections/contact.tsx", "status": "new"},
    {"path": "client/src/components/sections/footer.tsx", "status": "new"},
    {"path": "client/src/components/animations/particle-background.tsx", "status": "new"},
    {"path": "client/src/components/animations/typing-text.tsx", "status": "new"},
    {"path": "client/src/components/animations/counter.tsx", "status": "new"},
    {"path": "client/src/components/animations/loading-screen.tsx", "status": "new"},
    {"path": "client/src/hooks/use-scroll-animation.tsx", "status": "new"},
    {"path": "shared/schema.ts", "status": "overwritten"},
    {"path": "server/routes.ts", "status": "overwritten"},
    {"path": "server/storage.ts", "status": "overwritten"}
]
