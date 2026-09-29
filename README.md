# Toni Grubesic — Mechanical Design Engineering Portfolio

A static, responsive engineering portfolio focused on product development, validation, manufacturing support, test systems, and hands-on mechanical work.

**Live site:** [https://tg-works.github.io/Protfolio/](https://tg-works.github.io/Protfolio/)

## Portfolio hierarchy

1. **HEN Technologies — Design Engineering**  
   Current professional work across mechanical product development, validation, supplier engineering, injection molding, manufacturing support, and release.
2. **1998 Toyota 4Runner — Vehicle Development**  
   Reliability, chassis, thermal management, fabrication, electrical systems, cargo, and towing.
3. **LLNL — Battery Test Automation**  
   Precision mechanical hardware, controlled loading/heating, instrumentation, automation, and experimental data.
4. **Engineering Helper**  
   Mechanical engineering software and design-productivity tooling.
5. **2005 SV650 — Track Development**  
   Value-focused motorsport platform for chassis, reliability, rider fit, electrical systems, and data acquisition.

## Structure

```text
/
├── index.html
├── style.css
├── main.js
├── projects/
│   ├── hen/
│   ├── 4runner/
│   ├── llnl/
│   ├── engineering-helper/
│   └── sv650/
└── assets/
    ├── images/
    ├── Toni_Grubesic_Resume.pdf
    └── Toni_Grubesic_CV.pdf
```

The site uses semantic HTML, a shared CSS design system, and lightweight vanilla JavaScript. No build step or framework is required.

## Adding project media

Replace the clearly labeled image placeholders in the HTML after adding approved media under `assets/images/<project>/`.

Recommended source sizes:

- Project hero: `2400 × 1500 px`, landscape
- Supporting case-study image: `1800 × 1200 px`, landscape
- Drawings and diagrams: SVG when possible, or PNG at least `1800 px` wide
- Interface screenshots: `2400 × 1500 px`

Do not publish proprietary dimensions, customer information, confidential HEN performance data, or unapproved product imagery.

## Deployment

Pushing to `main` triggers the GitHub Pages workflow in `.github/workflows/deploy.yml`.
