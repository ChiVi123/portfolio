# portfolio

Personal portfolio — Nguyễn Hoàng Chí Vĩ.

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Shadcn UI (new-york) |
| Animation | Framer Motion 12 |
| React Bits | SplitText, GlitchText, Magnet |
| Theme | next-themes (`attribute="class"`) |
| Lint/Format | Biome v2 |
| Deploy | Vercel |

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Shadcn — thêm component mới

```bash
npx shadcn@latest add <component-name>
```

Component sẽ được thêm vào `src/components/ui/`.

## React Bits — thêm component mới

1. Vào [reactbits.dev](https://reactbits.dev), chọn component
2. Copy code → paste vào `src/components/bits/<tên>.tsx`
3. Điều chỉnh import path thành `@/lib/utils`

## Cập nhật nội dung CV

Sửa `public/assets/cv.json` — không cần chạm vào code.

## Scripts

```bash
npm run dev        # Dev server
npm run build      # Production build
npm run check      # Biome lint + format (auto-fix)
npm run lint       # Lint only
npm run format     # Format only
```

## Cấu trúc

```
src/
├── app/
│   ├── globals.css          # Tailwind v4 @theme + shadcn CSS vars
│   ├── layout.tsx           # ThemeProvider + noise overlay
│   └── page.tsx             # Server Component
├── components/
│   ├── bits/                # React Bits (copy-paste)
│   │   ├── split-text.tsx
│   │   ├── glitch-text.tsx
│   │   └── magnet.tsx
│   ├── ui/                  # Shadcn components
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── separator.tsx
│   │   ├── tooltip.tsx
│   │   └── section-wrapper.tsx
│   ├── layouts/
│   │   └── navbar.tsx
│   ├── theme-provider.tsx
│   ├── hero-section.tsx
│   ├── skills-section.tsx
│   ├── experience-section.tsx
│   └── projects-section.tsx
├── lib/
│   ├── utils.ts             # cn() helper
│   └── motion.ts            # Framer Motion variants
└── types/
    └── cv.ts
```

## Path Aliases

| Alias | Maps to |
|---|---|
| `@/*` | `src/*` (shadcn compat) |
| `~/*` | `./` (project root) |

## Deploy

Push lên GitHub → import trên [vercel.com](https://vercel.com) → Deploy.
