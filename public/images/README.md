# Photos

Put real photos in this folder, then reference them from `src/data/content.ts`:

| Where it shows | Field to set | Example |
|---|---|---|
| Founder & CEO spotlight (About) | `founder.src` | `"/images/founder.jpg"` |
| Leadership cards (About) | add `src` to an entry in `team` | `src: "/images/rohan.jpg"` |
| "Life at our company" slider (About) | `src` on items in `lifePhotos` | `src: "/images/team-day.jpg"` |
| Events & exhibitions slider (Home) | `src` on items in `eventPhotos` | `src: "/images/analytica.jpg"` |
| Installations slider (Case Studies) | `src` on items in `installPhotos` | `src: "/images/novapharm-lab.jpg"` |

Tips
- Portraits: 4:5 ratio, at least 1000 × 1250 px. Slider photos: 4:3, at least 1600 × 1200 px.
- Use JPG or WebP; Next.js resizes and optimises them automatically.
- Any item without `src` shows the illustrated placeholder instead.
