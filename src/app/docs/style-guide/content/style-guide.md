## CodeKrew Modern UI Style Guide

This guide ensures CodeKrew stays modern, professional, and never cartoonish. It's built for clarity, usability, and confidence.

---

### 🎨 Color Palette
- **Primary:** Indigo (#4F46E5) — strong, modern, tech-forward
- **Accent:** Orange (#F97316) — energetic and inviting
- **Background:** White (#FFFFFF) and Slate (#F1F5F9)
- **Dark Mode Base:** Dark Navy (#0F172A)
- **Text:** Slate-900 (#0F172A) for light, Slate-100 (#F1F5F9) for dark

---

### 🧱 Typography
- **Headings:** `font-extrabold`, Tailwind `text-2xl` to `text-5xl`
- **Body:** `font-normal`, Tailwind `text-base`
- **Font Family:** `Inter`, system-ui fallback
- **Line height:** Comfortable (`leading-relaxed`)

---

### 🧩 Components Style
- Use **Shadcn UI** components with Tailwind custom theming
- **Rounded corners:** `rounded-2xl`
- **Shadows:** `shadow-md` or `shadow-lg` for cards
- **Card Padding:** `p-4` to `p-6`
- **Buttons:** 
  - Primary: indigo background, white text, subtle shadow
  - Secondary: white background, indigo text, border

---

### 🧭 Layout Principles
- **Grid-Based Layouts:** Use `grid` or `flex` layouts with consistent gaps (`gap-4`, `gap-6`)
- **Spacing:** Generous padding (`p-6`, `p-8`) and margins to reduce visual clutter
- **Navigation:** Fixed sidebar or topbar like Supabase/Vercel
- **Consistency:** All pages should inherit from a base layout

---

### 💡 Visual Features
- **Animations:** Use `framer-motion` for subtle transitions and interactive elements
- **Theme Toggle:** Light/Dark mode toggle in header
- **Icons:** `lucide-react` icons only
- **Avatars:** Circular, consistent sizing (`w-8 h-8` or `w-10 h-10`)

---

### 🧠 UX Guidelines
- **No cartoon effects** — avoid childish illustrations or overly bubbly UIs
- **Professional tone** — even if playful, retain trust and clarity
- **Accessibility** — High contrast, keyboard navigable, alt text on images

---

### ✅ Patterns to Emulate
- **Supabase** – Dashboard layout and onboarding
- **Vercel** – Project cards, clean sidebar
- **Linear** – Crisp typography and spacing
- **Superhuman** – Minimalist color use and fast UI feel

---

### 🧪 Experimental Allowed
- **Glassmorphism** (light blur on modals)
- **Gradient borders** for hero sections
- **Animated empty states** (e.g. floating icons)

---

## 🔐 Internal Access Only

To ensure new developers have easy access:

- ✅ Add a protected route: `/style-guide`
- ✅ Use Supabase Auth to restrict access (`role = 'admin' || 'dev'`)
- ✅ Link in sidebar or dashboard nav under “Docs” or “Dev Tools”
- ✅ Optionally render this guide from a markdown file stored in `/content/style-guide.md`

This keeps your style guide available but securely scoped for your internal team.

---

Let’s keep CodeKrew modern, lean, and trustworthy — like the developer tools we admire.
