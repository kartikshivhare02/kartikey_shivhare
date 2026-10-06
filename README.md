# Kartikey Shivhare — Personal Portfolio Website

A clean, light, smooth, and premium personal portfolio website designed in quiet monochrome tones (white, black, and grays). Built with Next.js 15, React 19, TypeScript, Tailwind CSS 4, and Lenis smooth scrolling.

## 🚀 How to Run locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Start
```bash
npm run build
npm run start
```

---

## 📐 Sections Overview

| Index | Section | Description & Features |
| :--- | :--- | :--- |
| `00` | **Hero** | Seamless video loop with multiply blend mode, muted/unmuted voice control button, background ghost typography, and quick CTAs. |
| `01` | **About** | 3-column layout featuring a hanging 3D lanyard ID card with pendulum physics and flip animation, verbatim résumé summary, and quick facts. |
| `02` | **Skills** | Periodic table grid layout with category filter chips, diagonal wave reveal, and a 320px sticky skill inspector panel with pop logo display. |
| `03` | **Work** | Side-by-side expanding accordion gallery with flex-8 focus states and grayscale illustrative mini-UIs. |
| `04` | **Experience** | Vertical timeline with a dynamic scroll-drawn spine lighting up stops in chronological order, ending with a dashed "Next — Your team?" card. |
| `05` | **Achievements** | Sticky-pinned horizontal gallery with brand logo tiles and easeOutQuart count-up milestone numbers. |
| `06` | **Contact** | Interactive letter-hopping heading, aria-live copyable email link, direct contact methods, and spinning "say hello" badge. |

---

## 🎬 How to Rebuild Hero Video Assets

The hero video pipeline is automated via `scripts/build-hero-assets.py`.

### Prerequisites
- Python 3.10+
- `imageio_ffmpeg`, `numpy`, `opencv-python`

### Run Command
```bash
python scripts/build-hero-assets.py
```

### Pipeline Steps:
1. **Crop & Scale**: Crops `intro.mp4` to a 768×960 aspect ratio (4:5) centered on the person.
2. **Background Whitening**: Applies colorlevels filter to make the backdrop pure white so it seamlessly blends into the paper surface using `mix-blend-mode: multiply`.
3. **Seamless Video & Audio Loop**: Cross-fades the last 0.5 s into the first 0.5 s using FFmpeg `xfade` for video and sample-accurate NumPy array cross-fading for audio.
4. **Asset Export**: Produces `public/hero/hero.mp4`, `public/hero/hero.webm`, `public/portrait-bust.webp` (480×600), and `public/og.jpg` (1200×630).

---

## 📜 Credits & Brand Logo Licenses

Brand logos displayed in the skill periodic table and achievements gallery are sourced from official standard icon libraries:

- **Devicon** ([github.com/devicons/devicon](https://github.com/devicons/devicon)): MIT License.
- **Simple Icons** ([github.com/simple-icons/simple-icons](https://github.com/simple-icons/simple-icons)): CC0 1.0 Universal.
- All brand logos and trademarks (Python, MySQL, MongoDB, Pandas, NumPy, Power BI, Excel, Claude, Gemini, OpenAI, LeetCode, CodeChef, GeeksforGeeks, HackerRank, etc.) belong to their respective copyright holders.
- License documentation is persisted in [`public/logos/LICENSE`](public/logos/LICENSE).
