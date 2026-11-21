# Yerra Kamal Kumar — Personal Portfolio

A responsive portfolio for **Yerra Kamal Kumar**, software developer, vibe coder and AI enthusiast. Built with an electric-blue and midnight-navy theme, a personal portrait, interactive project showcases and competitive programming highlights.

**[View the live portfolio](https://kamal-kumar-portfolio.onrender.com/)**

## Highlights

- Responsive layouts for laptops, tablets and phones.
- Animated portrait section with reduced-motion support and a motion-pause control.
- LeetCode, Codeforces and CodeChef achievements.
- Filterable projects and expandable case studies for **ConnectHub**, **SARTOR** and **Personal AI Assistant**.
- Experience, education, technical skills and community/event-hosting sections.
- Downloadable resume, email-copy button and profile links.
- Keyboard-accessible navigation and project dialogs.

## Built with

HTML, CSS and vanilla JavaScript. The website is static and has no runtime dependencies or backend. Contact links open the visitor’s email app.

## Run locally

Requires **Node.js 18+** and **Python 3** for the preview command.

```bash
git clone https://github.com/yerrakamalkumar1/PERSONAL-PORTFOLIO.git
cd PERSONAL-PORTFOLIO
node portfolio-build.cjs
python3 -m http.server 8000 --directory dist
```

Open **http://localhost:8000**.

The build checks required assets and JavaScript syntax, then copies the website into `dist/`. No package installation is required.

## Project structure

| Path | Purpose |
|---|---|
| `portfolio/index.html` | Page content, sections and profile links |
| `portfolio/styles.css` | Theme, animations and responsive layouts |
| `portfolio/app.js` | Project details, filters, navigation and controls |
| `portfolio/assets/` | Portrait and downloadable resume |
| `portfolio/favicon.svg` | Browser icon |
| `portfolio/social-card.svg` | Social preview graphic |
| `portfolio-build.cjs` | Validation and static build |

## Update the portfolio

Edit the HTML for profile content and achievements, JavaScript for project details, and CSS for styling. Replace the portrait or PDF in `portfolio/assets/` to update those assets.

Run `node portfolio-build.cjs` after making changes. Edit the source files in `portfolio/`; `dist/` is generated and excluded from Git.

Competitive programming statistics are a supplied snapshot; they are not connected to live platform APIs.

## Deploy on Render

Create a **Static Site**, connect this repository and select `main`.

| Setting | Value |
|---|---|
| Build command | `node portfolio-build.cjs` |
| Publish directory | `dist` |

The live portfolio link above identifies the existing deployment. This repository contains its source copy. Switching the existing Render service to this repository is a separate hosting setting; pushing here does not update that service until it is connected.

## Project attribution

The Personal AI Assistant is presented as a Python learning project based on the open-source Jarvis project credited to **Kishan Kumar Rai**. Its implemented voice-command features are described without claiming an implemented RAG or LLM system.

Project interface visuals in the portfolio are illustrative studies, not screenshots of live usage.
