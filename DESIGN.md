---
version: alpha
name: MiMo Code Ink Canvas
description: "A warm off-white, ink-and-canvas landing page style for AI developer tools, extracted from the MiMo Code local recreation."
colors:
  primary: "#26251E"
  primary-hover: "#3A3933"
  text-muted: "#504F49"
  text-code: "#27272A"
  text-faint: "rgba(39, 39, 42, 0.45)"
  background: "#FCFAF8"
  mask: "#FCFAF8"
  surface: "#FFFFFF"
  surface-soft: "#F3F0EF"
  footer-surface: "#F5F4EF"
  divider: "#F3F0EF"
  card-warm-1: "#EFEBE3"
  card-warm-2: "#F6F1EA"
  card-warm-3: "#EFE8E3"
  card-warm-4: "#FBF2E9"
  card-warm-5: "#F5EDE7"
  success: "#16A34A"
typography:
  display-hero:
    fontFamily: "Questrial, Century Gothic, Avenir Next, MiSans, sans-serif"
    fontSize: 50px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: 0.4px
  display-section:
    fontFamily: "Questrial, Century Gothic, Avenir Next, MiSans, sans-serif"
    fontSize: 30px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.4px
  poetic-subtitle:
    fontFamily: "Huiwen Mincho, Noto Serif SC, Songti SC, STSong, Georgia, serif"
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0.4px
  card-title:
    fontFamily: "Huiwen Mincho, Noto Serif SC, Songti SC, STSong, Georgia, serif"
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.447
    letterSpacing: 0
  body-md:
    fontFamily: "MiSans, PingFang SC, -apple-system, Microsoft YaHei, sans-serif"
    fontSize: 16px
    fontWeight: 300
    lineHeight: 1.447
    letterSpacing: 0
  nav-label:
    fontFamily: "MiSans Medium, MiSans, PingFang SC, sans-serif"
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0
  command:
    fontFamily: "MiSans, PingFang SC, -apple-system, Microsoft YaHei, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.4px
  button-label:
    fontFamily: "Microsoft Sans Serif, MiSans, PingFang SC, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.24px
  footer:
    fontFamily: "PingFang SC, -apple-system, Segoe UI, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.8px
rounded:
  none: 0px
  xs: 4px
  sm: 6px
  md: 8px
  lg: 10px
  xl: 12px
  pill: 46px
spacing:
  micro: 4px
  xs: 6px
  sm: 8px
  md: 10px
  lg: 20px
  xl: 30px
  section-gap: 40px
  card-gap: 43px
  desktop-content: 1100px
  hero-height-desktop: 592px
  hero-height-mobile: 425px
components:
  hero:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    height: "{spacing.hero-height-desktop}"
    width: 100%
  hero-mask:
    backgroundColor: "{colors.mask}"
    width: 100%
    height: "{spacing.hero-height-desktop}"
  header-divider:
    backgroundColor: "{colors.divider}"
    width: 100%
    height: 1px
  nav-link:
    textColor: "#000000"
    typography: "{typography.nav-label}"
    padding: "8px 12px"
    height: 32px
  nav-menu:
    backgroundColor: "{colors.surface}"
    textColor: "#000000"
    rounded: "{rounded.xl}"
    padding: "12px 8px"
  terminal-command:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.text-code}"
    typography: "{typography.command}"
    rounded: "{rounded.lg}"
    padding: "0 20px"
    width: 491px
    height: 55px
  terminal-prompt:
    textColor: "{colors.text-faint}"
    typography: "{typography.command}"
  copy-success:
    textColor: "{colors.success}"
    width: 18px
    height: 18px
  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    typography: "{typography.button-label}"
    rounded: "{rounded.pill}"
    padding: "10px 41px"
    height: 40px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FAFAFA"
    typography: "{typography.button-label}"
    rounded: "{rounded.pill}"
    padding: "10px 41px"
    height: 40px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "#FAFAFA"
    typography: "{typography.button-label}"
    rounded: "{rounded.pill}"
    padding: "10px 41px"
    height: 40px
  feature-card:
    textColor: "{colors.primary}"
    rounded: "{rounded.xs}"
    width: 100%
    height: 360px
  feature-card-1:
    backgroundColor: "{colors.card-warm-1}"
    textColor: "{colors.primary}"
    rounded: "{rounded.xs}"
    width: 100%
    height: 360px
  feature-card-2:
    backgroundColor: "{colors.card-warm-2}"
    textColor: "{colors.primary}"
    rounded: "{rounded.xs}"
    width: 100%
    height: 360px
  feature-card-3:
    backgroundColor: "{colors.card-warm-3}"
    textColor: "{colors.primary}"
    rounded: "{rounded.xs}"
    width: 100%
    height: 360px
  feature-card-4:
    backgroundColor: "{colors.card-warm-4}"
    textColor: "{colors.primary}"
    rounded: "{rounded.xs}"
    width: 100%
    height: 360px
  feature-card-5:
    backgroundColor: "{colors.card-warm-5}"
    textColor: "{colors.primary}"
    rounded: "{rounded.xs}"
    width: 100%
    height: 360px
  footer:
    backgroundColor: "{colors.footer-surface}"
    textColor: "{colors.text-muted}"
    typography: "{typography.footer}"
    padding: "40px 100px"
---

# MiMo Code Ink Canvas

## Overview

This style is a high-fidelity landing-page system for an AI coding product. It combines a calm Chinese literary mood with precise developer-tool interactions: warm paper-like backgrounds, ink-colored typography, sparse navigation, command-line affordances, and image-led feature panels.

The emotional target is quiet confidence. The page should feel intelligent, restrained, and handcrafted, not loud, glassy, or generic SaaS. Use the visual language of a refined product brochure: a large atmospheric hero, disciplined geometry, warm neutral surfaces, and subtle interaction moments that reward exploration.

The signature expression is **ink on warm canvas**. The hero uses a local painting-style background and a canvas reveal mask on hover. Feature cards use large cropped images beside concise copy. Typography alternates between clean geometric display text and a Mincho/Song-style serif voice for Chinese poetic emphasis.

## Colors

The palette is warm, low-saturation, and nearly monochrome. It relies on off-white canvas tones, dark ink, and small tonal shifts between panels. Avoid colorful gradients and decorative accent systems.

- **Primary ink (`#26251E`):** Use for titles, primary body text, filled buttons, focus outlines, and core interface marks.
- **Soft ink (`#504F49`):** Use for supporting text, footer copy, and metadata.
- **Canvas background (`#FCFAF8`):** Use as the page foundation and hero mask color. It should read warmer than white but not beige-heavy.
- **Soft surface (`#F3F0EF`):** Use for command chips, dividers, and quiet UI surfaces.
- **Pure white (`#FFFFFF`):** Use sparingly for hover reveals, dropdowns, and temporary emphasis.
- **Warm card panels (`#EFEBE3`, `#F6F1EA`, `#EFE8E3`, `#FBF2E9`, `#F5EDE7`):** Use as alternating feature-card backgrounds. Each panel should be close in value, creating rhythm without looking like a color palette showcase.
- **Success (`#16A34A`):** Reserve for transient success states such as the copied check icon.

Contrast should stay strong for primary text. Do not use pale gray for meaningful content. The design gets softness from background temperature and whitespace, not from low-contrast typography.

## Typography

Typography carries most of the brand character. Use three voices:

- **Geometric display:** Use Questrial-like or Century Gothic-like sans text for the product name and section headings. Keep the weight light to medium and letter spacing slightly open. This gives the page a calm, engineered finish.
- **Literary serif:** Use Huiwen Mincho, Noto Serif SC, Songti SC, STSong, or a comparable CJK serif for poetic subtitles and feature titles. This is the cultural and emotional anchor of the style.
- **Functional sans:** Use MiSans, PingFang SC, Microsoft YaHei, or system sans for navigation, body copy, command text, buttons, and footer details.

Desktop hierarchy:

- Hero title: 50px, 400 weight, `0.4px` letter spacing.
- Hero subtitle: 22px serif, 500 weight, `1.5` line height.
- Section title: 30px display sans, 500 weight.
- Feature title: 22px serif, `1.447` line height.
- Feature body: 16px functional sans, 300 weight, `#504F49` only when secondary.
- Navigation and command text: 15px functional sans.

Mobile hierarchy:

- Hero title: 30px.
- Hero subtitle: 14px, normal wrapping.
- Section title: 22px.
- Feature title: 18px.
- Feature body: 14px.

Avoid negative letter spacing. Do not make body text oversized. The design depends on refined contrast between a large quiet hero title and compact, exact UI labels.

## Layout

The layout is fixed and editorial on desktop, then stacked and compact on mobile.

Desktop:

- Hero height is `592px`; the background art is sized to `1440px 592px` and aligned bottom center.
- Header controls sit absolutely over the hero: logo at top-left, navigation at top-right, divider at `65px`.
- Hero content is centered with a max width around `809px`, starts at `180px` from the top, and uses vertical gaps of `30px` to `40px`.
- Feature content uses a `1100px` wide column with `43px` gaps between cards.
- Feature cards are fixed-height `360px` panels with exact image/text placement. Use large image crops, not small illustrations.

Mobile:

- Hero height becomes `425px`.
- Hide the desktop navigation; keep logo and language control.
- Disable the canvas reveal mask on touch devices.
- Stack feature cards vertically with image first, then text.
- Use `20px` side margins for main content and `30px` feature-card gaps.

Spacing should feel measured rather than spacious-for-its-own-sake. Prefer exact local spacing values over a generic 8px-only rhythm when matching this style.

## Elevation & Depth

Depth is minimal. The page is primarily flat, with hierarchy created through tonal panels, art layers, and typography.

Use shadows only for floating dropdown menus: `0 12px 32px rgba(0, 0, 0, 0.12)` with a soft white background and a subtle border. Do not place heavy shadows on feature cards, buttons, or hero content.

The hero creates depth through layers:

1. A painting-like background image.
2. A same-color canvas mask above it.
3. Centered content above the mask.
4. A cursor-driven erasure effect that reveals the image temporarily.

This layered interaction should feel like ink being uncovered, not like a spotlight, neon glow, or particle effect.

## Shapes

Shapes are disciplined and quiet:

- Feature cards use a small `4px` radius and clipped overflow.
- Command chips use `10px` radius.
- Dropdowns use `12px` radius because they are floating UI.
- Buttons are pill-shaped with `46px` radius.
- Tooltips use `6px` radius.
- Header underline hovers use thin rectangular bars, not rounded capsules.

Do not over-round containers. The overall page should feel more like a refined printed surface than a bubbly app interface.

## Components

**Hero**

Use a full-width hero with a local painting or expressive product-relevant image as the visual foundation. The title stays centered and simple. Keep the H1 as the product name. Supporting copy can be poetic or aspirational, but should remain concise.

On desktop, add a canvas or mask interaction that reveals the hero artwork on hover. The mask should match the page background. On mobile or touch devices, show the artwork directly or simplify the effect rather than emulating hover.

**Navigation**

Use an absolute header over the hero. The logo should be small and precise, not a large brand block. Navigation labels use compact MiSans-like text. Hover states are a thin underline growing from left to right. Dropdowns are white, soft-shadowed, and close to the trigger.

**Terminal Command**

Use a command chip as the developer affordance. It should be horizontally centered, light warm gray by default, and turn white on desktop hero hover. Include a faint prompt marker, single-line ellipsis for long command text, and an icon-only copy button with a success check state.

**Buttons**

Use three-button CTA groups when the page needs external code, docs, and narrative links. Secondary buttons are outlined pills. The primary button is filled ink. On hover, buttons lift by `-1px`; arrow icons fade in or slide into view. Do not use large filled rectangles.

**Feature Cards**

Use alternating image/text layouts on desktop. Images occupy about half the card width, often `573px` by `360px`, with text blocks placed precisely in the opposite half. Copy blocks are narrow, around `331px`, to preserve an editorial rhythm.

On mobile, every card becomes an image-first vertical panel with `6px` internal image padding and text margins around `20px` to `26px`.

**Motion**

Motion should be sparse and meaningful:

- Subtitle typing starts after a short delay and advances at a readable pace.
- Feature titles can type in as they enter the viewport.
- Copy success uses a quick icon scale/opacity transition.
- Dropdowns move only a few pixels while fading.
- Button hover movement is minimal.

Avoid continuous background animations, bouncing UI, large scroll effects, or motion that distracts from the product message.

## Do's and Don'ts

Do:

- Use warm off-white foundations and dark ink text.
- Keep the product name as the hero headline.
- Use a real or generated bitmap artwork/image as the primary visual signal.
- Preserve the contrast between literary serif headings and functional sans UI.
- Keep interactions small, tactile, and purposeful.
- Use exact dimensions for hero, command chip, feature cards, and image crops when building landing pages.
- Let images carry emotion; let UI controls stay quiet and precise.
- Keep bilingual layouts in mind: Chinese can be poetic and compact, while English may need wider text handling.

Don't:

- Do not replace the hero with a gradient, abstract SVG blob, or generic dark tech background.
- Do not introduce bright accent colors except for transient status feedback.
- Do not use heavy shadows, glassmorphism, neon effects, or purple-blue SaaS gradients.
- Do not round every container into large cards.
- Do not make feature cards float above the page; they should sit as tonal panels in the document flow.
- Do not use long marketing paragraphs in hero or feature cards.
- Do not hide the developer-tool nature of the product; keep a command, code, terminal, or workflow affordance visible.
- Do not use global DOM scripts for behavior in React implementations; keep interactions in stateful components and hooks.
