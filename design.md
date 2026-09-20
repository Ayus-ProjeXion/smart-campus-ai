# 🎨 Design System & UI/UX Contract

**Project:** Smart Campus AI  
**Author & Lead Architect:** Ayusman ([@Ayus-ProjeXion](https://github.com/Ayus-ProjeXion))  
**Theme:** Cyberpunk / Enterprise Dark Glassmorphism  
**Version:** 2.0.0  

---

## 1. Design Philosophy

Smart Campus AI adopts a **Silicon Valley "Mission Control"** aesthetic. It blends dark, low-fatigue backgrounds with vibrant accent highlights to communicate high intelligence, precision, and speed.

---

## 2. Color Tokens & Theme Palette

```css
:root {
  /* Core Backgrounds */
  --bg-primary: #0a0d14;            /* Ultra-dark canvas */
  --bg-secondary: #111726;          /* Deep navy container */
  --bg-card: rgba(18, 24, 38, 0.75);/* Frosted glass surface */
  --bg-card-hover: rgba(26, 35, 54, 0.9);

  /* Border & Glass Effects */
  --border-color: rgba(255, 255, 255, 0.08);
  --border-highlight: rgba(99, 102, 241, 0.35);
  --glass-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

  /* Functional Accents */
  --accent-indigo: #6366f1;         /* Primary brand tone */
  --accent-cyan: #06b6d4;           /* AI & data indicators */
  --accent-emerald: #10b981;        /* Match success & active badges */
  
  /* Urgency Hierarchy */
  --danger-red: #ef4444;            /* Critical deadline (< 24h) */
  --warning-amber: #f59e0b;         /* Upcoming deadline (2-4 days) */
  --safe-green: #10b981;            /* Normal deadline (> 5 days) */

  /* Typography */
  --text-main: #f8fafc;             /* 95% White */
  --text-muted: #94a3b8;            /* Slate Gray */
  --text-dim: #64748b;              /* Low-emphasis hint */
}
```

---

## 3. Typography Hierarchy

* **Brand & Slide Display:** `'Outfit', sans-serif` (Weights: 700, 800)
* **Body & Card Text:** `'Inter', sans-serif` (Weights: 400, 500, 600)
* **Metadata, Timestamps & Badges:** `'JetBrains Mono', monospace` (Weights: 600, 700)

---

## 4. Component Standards

### 4.1 Enterprise Status Badge (`.engine-badge`)
* Capsule border with 10% opacity emerald tint.
* Contains `.engine-pulse` dot animated with smooth pulsing box-shadow.
* Replaces amateurish manual API key buttons with an enterprise assurance signal.

### 4.2 Urgency Badges
* `.urgency-red`: Border `rgba(239, 68, 68, 0.4)`, subtle 1.8s infinite pulse to draw immediate student attention.
* `.urgency-amber`: High contrast warm yellow for 2–4 day windows.
* `.urgency-green`: Clean green for comfortable preparation timelines.

### 4.3 Donut Analytics Card
* Responsive SVG circle with `stroke-dasharray` calculations.
* Center text displaying current actionable circular ratio (14%).
* Color-coded legend highlighting spam suppression rate (86%).
