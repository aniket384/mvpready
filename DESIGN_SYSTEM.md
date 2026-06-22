# MVPReady Design System

This design system is for a premium MVP development agency that should feel like a serious Silicon Valley startup studio: minimal, fast, founder-focused, and high trust.

## Principles

- Restraint creates premium perception.
- Typography and spacing carry the brand more than decoration.
- Every visual decision should reduce founder anxiety: scope clarity, quality, speed, ownership, and judgment.
- Motion should make the interface feel precise, not animated for entertainment.
- The interface should never feel like a cheap agency template, freelancer portfolio, or generic gradient SaaS landing page.

## Typography

Font stack:

- Primary: Geist Sans via `next/font`
- Mono: Geist Mono via `next/font`
- Fallback: `system-ui, sans-serif`

Scale:

| Token | Size | Line height | Tracking | Usage |
| --- | ---: | ---: | ---: | --- |
| `display-xl` | 72px | 0.98 | -0.04em | Homepage hero desktop |
| `display-lg` | 60px | 1.00 | -0.04em | Page hero desktop |
| `display-md` | 48px | 1.05 | -0.035em | Section hero / CTA |
| `heading-xl` | 40px | 1.10 | -0.03em | Major sections |
| `heading-lg` | 32px | 1.15 | -0.025em | Section headings |
| `heading-md` | 24px | 1.25 | -0.02em | Cards and subsections |
| `heading-sm` | 20px | 1.35 | -0.01em | Dense panels |
| `body-lg` | 20px | 1.65 | 0 | Hero support copy |
| `body-md` | 16px | 1.70 | 0 | Main body |
| `body-sm` | 14px | 1.60 | 0 | Secondary copy |
| `caption` | 12px | 1.45 | 0.08em | Metadata, labels |

Rules:

- Use `font-medium` for headings, not heavy bold.
- Body copy should be calm and readable, with generous line height.
- Mono is only for metrics, steps, technical labels, and small trust signals.
- Do not scale text using viewport units.
- Use negative tracking only on large display text.

## Color Palette

Light mode:

| Token | Value | Usage |
| --- | --- | --- |
| `background` | `#FFFFFF` | Page background |
| `foreground` | `#0A0A0A` | Primary text |
| `muted` | `#F7F7F7` | Quiet surfaces |
| `muted-foreground` | `#666666` | Secondary text |
| `card` | `#FFFFFF` | Elevated surfaces |
| `border` | `#E0E0E0` | Fine borders |
| `primary` | `#0A0A0A` | Primary CTA |
| `accent` | `#2563EB` | Links, focus, selected states |

Dark mode:

| Token | Value | Usage |
| --- | --- | --- |
| `background` | `#050505` | Page background |
| `foreground` | `#FAFAFA` | Primary text |
| `muted` | `#0F0F0F` | Quiet surfaces |
| `muted-foreground` | `#A3A3A3` | Secondary text |
| `card` | `#0D0D0D` | Elevated surfaces |
| `border` | `#262626` | Fine borders |
| `primary` | `#FAFAFA` | Primary CTA |
| `accent` | `#60A5FA` | Links, focus, selected states |

Rules:

- Neutral colors should dominate 85-90% of the UI.
- Accent color is for CTAs, links, focus states, status, and restrained highlights.
- Avoid generic gradients, rainbow borders, heavy glow, and decorative color blobs.

## Spacing

Base unit: 4px with an 8px layout rhythm.

| Token | Value | Usage |
| --- | ---: | --- |
| `space-1` | 4px | Icon/text gap |
| `space-2` | 8px | Tight UI grouping |
| `space-3` | 12px | Compact component gap |
| `space-4` | 16px | Default gap |
| `space-6` | 24px | Card mobile padding |
| `space-8` | 32px | Card desktop padding |
| `space-12` | 48px | Section internal gap |
| `space-16` | 64px | Mobile section padding |
| `space-24` | 96px | Default desktop section padding |
| `space-32` | 128px | Large desktop section padding |
| `space-36` | 144px | Premium long-form section rhythm |

Rules:

- Related content should sit close.
- New concepts need real vertical separation.
- Use whitespace to create confidence, not emptiness.
- Avoid dense card grids on mobile.

## Border Radius

| Token | Value | Usage |
| --- | ---: | --- |
| `radius-xs` | 4px | Badges, tiny controls |
| `radius-sm` | 6px | Inputs, small buttons |
| `radius-md` | 8px | Cards, buttons, panels |
| `radius-lg` | 12px | Hero visuals, large CTA panels |
| `radius-full` | 999px | Pills only |

Rules:

- Default product surfaces use 6-8px.
- Use 12px only for large premium panels.
- Avoid oversized rounded cards.

## Grid And Layout

Containers:

| Token | Width | Usage |
| --- | ---: | --- |
| `narrow` | 768px | Articles, focused copy |
| `content` | 960px | Text-heavy pages |
| `default` | 1152px | Marketing sections |
| `wide` | 1280px | Hero and large grids |

Patterns:

- Hero: asymmetric 2-column on desktop, single column on mobile.
- Services: 2-column editorial grid, not a generic 3-card row by default.
- Process: sticky explanation left, detailed steps right on desktop.
- FAQ: sticky intro left, accordion/details right.
- Blog: narrow article body for readability.

## Dark Mode Strategy

- Use class-based dark mode through `next-themes`.
- Support system preference and manual toggle.
- Do not invert brand blindly.
- Use layered dark neutrals instead of pure black panels everywhere.
- Preserve contrast for body text, borders, and focus states.

Dark hierarchy:

1. Page: near black
2. Section surfaces: subtle black-gray
3. Cards: slightly elevated gray-black
4. Borders: visible but quiet
5. Text: high contrast primary, softer secondary

## Button Variants

Primary:

- High contrast fill.
- Main conversion action only.
- Hover: slight lift, controlled shadow.

Secondary:

- Border + background.
- Use for supporting actions.
- Hover: stronger border, subtle surface shift.

Ghost:

- Navigation and quiet actions.
- Hover: muted background and stronger text.

Link:

- Editorial links.
- Hover underline or arrow shift.

Rules:

- Primary CTA text should be specific: “Apply to build your MVP”, “Send build brief”.
- Avoid weak CTA labels like “Submit”, “Click here”, or “Get started”.

## Card Styles

Base card:

- 1px border.
- White/near-black surface.
- 8px radius.
- 24px mobile padding, 32px desktop padding.
- No heavy default shadow.

Hover:

- `translateY(-2px to -4px)`
- Border strengthens.
- Surface shifts subtly.
- Shadow remains soft.

Rules:

- Do not place cards inside cards.
- Do not use cards as page sections.
- Use cards for repeated items, case studies, FAQs, forms, and framed tools.

## Motion Principles

Allowed:

- Opacity reveal.
- `translateY(8px-16px)`.
- Small arrow movement.
- Border/color transitions.
- Accordion/details opening.
- Mobile menu fade/slide.

Timing:

- Fast: 150ms
- Default: 200ms
- Smooth reveal: 550-700ms
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`

Rules:

- Respect `prefers-reduced-motion`.
- No bounce, spin, scroll-jacking, excessive parallax, or animated gradients.
- Use Framer Motion only in small client islands.

## Hover States

Buttons:

- Primary: slight lift, soft shadow.
- Secondary: border contrast and muted fill.
- Ghost: muted fill and foreground text.

Cards:

- Border strengthens.
- Surface changes subtly.
- Small lift only.

Links:

- Underline or 2px arrow movement.

Navigation:

- Muted text becomes foreground.
- Background remains quiet.

## Responsive System

Breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Mobile rules:

- Hero becomes single-column.
- CTAs stack full-width when needed.
- Cards become one column.
- Tap targets should be at least 44px.
- Avoid horizontal scroll.
- Hero heading should fit at 360px width.
- Sticky header should remain compact.

Desktop rules:

- Use asymmetry for premium editorial feel.
- Keep body copy width constrained.
- Use sticky context panels for process and FAQ.
- Avoid over-centering every section.

## Anti-Patterns

Avoid:

- Generic purple-blue SaaS gradients.
- Floating orb backgrounds.
- Fake client logos.
- Huge rounded cards.
- Overloaded hero sections.
- Vague “we build scalable solutions” copy.
- Heavy animation.
- Fiverr-style package pricing.
- Repeating identical card grids everywhere.
