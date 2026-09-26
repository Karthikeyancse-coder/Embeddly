# ⚡ Embeddly

> **Next-Generation Embedded Systems & Hardware Engineering Platform**  
> An interactive, high-performance web experience featuring real-time 3D WebGL graphics, curated engineering internships, course explorations, and hardened backend enrollment.

---

## 🌟 Highlights & Features

- **🤖 Interactive 3D WebGL Robot:**  
  Built with **Three.js**, **React Three Fiber (R3F)**, and **Drei**, featuring real-time mouse tracking, GSAP ScrollTrigger timeline scrubbing, studio HDR-grade lighting, and an automated VRAM garbage-collection disposal pipeline (`useWebGLDispose`) to eliminate GPU buffer leaks.

- **🎓 Upcoming Events & Internship Portal:**  
  Showcases the upcoming **Embedded Systems & Hardware Internship** with dynamic date badges, venue scheduling, and direct integration with Google Forms for participant intake.

- **🛠️ Industry-Grade Engineering Curriculums:**  
  Comprehensive course breakdown across Microcontrollers (STM32 / ARM Cortex), IoT & Edge Computing (ESP32), Embedded C/C++, and PCB Schematic Design.

- **📸 Interactive Media & Accordion Gallery:**  
  High-resolution lab workbench galleries with expandable accordion cards and custom image lightbox overlays.

- **🛡️ Secure Production API (`/api/enroll`):**  
  Server-side schema validation using **Zod**, in-memory token-bucket IP rate-limiting, and honeypot spam protection.

- **⚡ Modern Fluid UI & Circuits:**  
  Crafted using **Tailwind CSS**, subtle animated SVG circuit board traces, responsive typography, and mobile-optimized sliding navigation.

---

## 🛠️ Tech Stack

| Domain | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components) |
| **Language & Runtime** | JavaScript (ESNext), Node.js |
| **3D Graphics & WebGL** | [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei) |
| **Animation & Motion** | [GSAP 3](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/) |
| **Styling & UI** | [Tailwind CSS](https://tailwindcss.com/), PostCSS, [Lucide React](https://lucide.dev/) Icons |
| **Validation & Security** | [Zod](https://zod.dev/), In-memory Rate Limiting, Honeypot Traps |

---

## 📁 Project Architecture

```plaintext
EmbeddlyV2/
├── public/
│   ├── images/          # Gallery, campus, and course imagery
│   ├── logo/            # Vector and high-res brand marks
│   ├── models/          # 3D assets (embeddly-bot.glb)
│   └── videos/          # Lab tour and promotional media
├── src/
│   ├── app/
│   │   ├── api/enroll/  # Secure enrollment route (Zod + Rate Limiting)
│   │   ├── globals.css  # Global styles, fonts, and Tailwind utilities
│   │   ├── layout.jsx   # Root layout and metadata
│   │   └── page.jsx     # Main landing page combining all sections
│   ├── components/      # Reusable components (Navbar, 3D Robot, VideoPlayer, Lightbox)
│   ├── data/            # Static data stores (events, courses, gallery, navigation)
│   ├── hooks/           # Custom hooks (useWebGLDispose)
│   ├── lib/             # Utility helpers, fonts, and rate limiting logic
│   └── sections/        # Page sections (Hero, About, Events, Enrollment, Footer)
├── next.config.mjs      # Asset cache headers & Next.js config
├── tailwind.config.js   # Custom theme, brand palette & animations
└── package.json         # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 18.17.0`
- **npm** or **pnpm** or **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Karthikeyancse-coder/Embeddly.git
   cd Embeddly
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

---

## 📦 Build & Production

To create an optimized production build:

```bash
npm run build
```

To run the production server locally:

```bash
npm run start
```

---

## 🔒 Security & Performance Features

- **VRAM Leak Prevention:** Custom `useWebGLDispose` hook traverses and disposes geometries, materials, and textures upon component unmount to prevent `CONTEXT_LOST_WEBGL`.
- **Static Asset Caching:** 3D `.glb` assets served with long-lived immutable cache headers (`Cache-Control: public, max-age=31536000, immutable`).
- **Endpoint Protection:** Rate limiter prevents automated brute-force enrollment spam by throttling requests per IP window.

---

## 📄 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

---

### Developed with ⚡ by [Karthikeyan](https://github.com/Karthikeyancse-coder)