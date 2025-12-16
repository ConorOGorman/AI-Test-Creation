# Phase 1: Design Forensics

## 1. Information Architecture (IA) & Section Order

1.  **Header**
    *   Logo (Espacio Home Design) - Centered/Left
    *   Menu Trigger (Hamburger) - Right
    *   Language Selector (ES / EN / DE) - Inside Menu? Or Header?
        *   *Correction from HTML*: Header has Logo, Menu Items (hidden on mobile), Menu Toggle.
        *   Full Screen Menu has: Logo, Languages, "Make an appointment", Close button.
2.  **Hero Section**
    *   Headline: "80 YEARS DESIGNING HOMES" / "THAT SPEAK ABOUT YOU" (Split across lines)
    *   "SCROLL DOWN" indicator (absolute positioned bottom center).
    *   Background Image/Video.
3.  **News/Editorial Cards**
    *   3 items (e.g., Brands, Novelties, Events).
    *   Layout: Grid/Flex.
4.  **Feature Blocks**
    *   Kitchens
    *   Projects
    *   Interior Design
5.  **Typographic Sequence**
    *   "HERITAGE", "DESIGN", "COMMITMENT", "OF", "THREE", "GENERATIONS".
    *   Large text, scroll revealed.
6.  **Outlet / Showrooms / Services**
    *   Feature cards.
7.  **Projects Strip**
    *   Horizontal scroll/slider of project images.
8.  **Brands/Logos**
    *   Marquee or Grid of partner logos.
9.  **Footer**
    *   Links: Contact, Privacy, Cookies, Legal.
    *   Social Icons.
    *   Newsletter signup.

## 2. Design Tokens (Extracted from CSS)

### Colors
| Name | Value | Usage |
| :--- | :--- | :--- |
| `primary-black` | `#2f2f2f` | Text, Backgrounds, Borders |
| `primary-white` | `#ffffff` | Text (inverse), Backgrounds |
| `border-light` | `#d3d3d3` | Borders, Separators |
| `bg-light` | `#f3f3f3` | Backgrounds (e.g., contact pill) |
| `error` | `red` | Form errors |
| `success` | `green` | Form success |
| `overlay-dark` | `rgba(0,0,0,0.2)` | Image overlays |

### Typography
*   **Font Family**: `Silka` (Regular, Medium, Semibold, Italic).
    *   Fallback: `system-ui, -apple-system, sans-serif`.
*   **Sizes**:
    *   `h1`: `7em` (Desktop), `?` (Mobile - need to infer or calculate, CSS says `font-size: 7em` base, media queries adjust).
    *   `h2`: `4em` (Desktop), `3.5em` (1200px), `3em` (960px), `2.5em` (750px).
    *   `h3`: `1em` (Uppercase).
    *   `p`: `1.5em` (Desktop), `1.3em` (960px).
    *   `fact-title`: `1.8em`.
    *   `small`: `0.8em`.

### Spacing & Layout
*   **Container Max Width**: `1500px`.
*   **Grid Gap**:
    *   Desktop (>1200px): `35px`
    *   Tablet (960px-1200px): `25px`
    *   Mobile (<750px): `15px`
*   **Section Padding**:
    *   Vertical: `90px` (Desktop), `60px` (Tablet), `30px` (Mobile).
*   **Breakpoints**:
    *   `1440px` (Design target)
    *   `1200px` (CSS breakpoint)
    *   `960px` (CSS breakpoint)
    *   `750px` (CSS breakpoint)
    *   `578px` (CSS breakpoint)

### Components
*   **Buttons**:
    *   `border: 2px solid #000`
    *   `background: #000`
    *   `color: #fff`
    *   `padding: 10px 15px`
    *   `text-transform: uppercase`
    *   Hover: Invert (bg: #fff, color: #000).
*   **Cards**:
    *   `border-radius: 15px` (rounded-corners class).
    *   Hover zoom effect (`scale(1.15)`).

### Motion
*   **Transitions**:
    *   Standard: `.3s ease-out`.
    *   Slow/Smooth: `.6s cubic-bezier(0, 0, 0.26, 1)`.
    *   Menu Reveal: `.7s cubic-bezier(0.56, 0, 0.38, 1)`.
*   **Animations**:
    *   Fade Up: `translate3d(0, 60px, 0)` -> `0`.
    *   Stagger delays: `.3s`, `.6s`, `.9s`, `1.2s`.

## 3. Reference Images
(To be captured via Playwright)
