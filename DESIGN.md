---
name: Scaler AI Sales Assistant
colors:
  surface: '#f9f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f9f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f5'
  surface-container: '#eeeef0'
  surface-container-high: '#e8e8ea'
  surface-container-highest: '#e2e2e4'
  on-surface: '#1a1c1d'
  on-surface-variant: '#46464a'
  inverse-surface: '#2f3132'
  inverse-on-surface: '#f0f0f2'
  outline: '#77767b'
  outline-variant: '#c7c6ca'
  surface-tint: '#5f5e60'
  primary: '#030304'
  on-primary: '#ffffff'
  primary-container: '#1d1d1f'
  on-primary-container: '#868587'
  inverse-primary: '#c8c6c8'
  secondary: '#0058bc'
  on-secondary: '#ffffff'
  secondary-container: '#0070eb'
  on-secondary-container: '#fefcff'
  tertiary: '#000400'
  on-tertiary: '#ffffff'
  tertiary-container: '#002308'
  on-tertiary-container: '#009a3b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4e2e4'
  primary-fixed-dim: '#c8c6c8'
  on-primary-fixed: '#1b1b1d'
  on-primary-fixed-variant: '#474649'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a41'
  on-secondary-fixed-variant: '#004493'
  tertiary-fixed: '#72fe88'
  tertiary-fixed-dim: '#53e16f'
  on-tertiary-fixed: '#002107'
  on-tertiary-fixed-variant: '#00531c'
  background: '#f9f9fb'
  on-background: '#1a1c1d'
  surface-variant: '#e2e2e4'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: '0'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  button:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: '0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  2xl: 3rem
  3xl: 4rem
  container-max: 1200px
  gutter: 1.5rem
---

## Brand & Style

The brand personality is rooted in "Intelligent Simplicity." This design system reflects a premium, high-performance tool that feels human and approachable rather than robotic or cold. It targets sales professionals who require clarity and focus to manage complex workflows.

The visual style is **Corporate / Modern**, heavily influenced by Apple’s Human Interface Guidelines. It prioritizes content over container, utilizing significant whitespace to reduce cognitive load. The aesthetic is "quietly powerful"—it doesn't shout for attention but provides a frictionless environment for high-stakes decision-making.

## Colors

The palette is restricted and intentional to maintain a premium feel. 

- **Primary:** A deep, off-black used for typography and core structural elements to ensure maximum legibility and authority.
- **Secondary (Accent):** A vibrant blue used exclusively for primary actions, links, and active states. It serves as a clear navigational signpost.
- **Success:** A soft, organic green for positive indicators and completed milestones, balanced to be visible but not jarring.
- **Neutral/Background:** A soft gray-white that reduces screen glare and provides a sophisticated canvas for the white card-based interface.

## Typography

This design system utilizes **Inter** for its neutral, systematic character that closely mimics SF Pro. The hierarchy is strictly enforced through weight and scale. 

Headlines use tighter tracking and heavier weights to feel "locked-in" and authoritative. Body text prioritizes a generous line height for long-form reading, such as AI-generated sales scripts or email drafts. Captions and labels use a slightly increased letter spacing when in uppercase to ensure accessibility at smaller sizes.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for the main content area to maintain a focused "dashboard" feel, centered within the viewport. A 12-column grid is used with a maximum width of 1200px.

The spacing rhythm is based on an 8px (0.5rem) baseline. Generous padding is applied inside cards (24px - 32px) to ensure the AI-driven data has "breathing room." Vertical rhythm is maintained by using larger gaps (48px - 64px) between major sections to clearly delineate different task areas.

## Elevation & Depth

Depth is created through **Tonal Layers** and **Ambient Shadows**. The background sits at the lowest level. White surfaces (cards and modals) sit above this background with a very soft, diffused shadow.

- **Level 1 (Cards):** Use a multi-layered shadow with low opacity (2-4%) and a high blur radius to simulate a natural light source.
- **Level 2 (Modals/Popovers):** A slightly more pronounced shadow and a subtle 0.5px border in a light gray (#E5E5E7) to define the edge.
- **Interactions:** On hover, buttons and interactive cards should not lift significantly; instead, a subtle shift in background color or a very slight increase in shadow spread (2px) should be used.

## Shapes

The shape language is consistently **Rounded**. In accordance with modern premium interface standards, a 12px to 16px radius is the standard for cards and main containers.

- **Standard Elements (Inputs/Buttons):** 8px (0.5rem).
- **Large Containers (Cards/Modals):** 16px (1rem).
- **System Components (Chips/Badges):** Fully rounded (Pill-shaped) to distinguish them from actionable buttons.

## Components

### Buttons
Primary buttons use the Accent Blue with white text. Secondary buttons use a light gray fill (#E8E8ED) with Primary Black text. Use a "Squircle" appearance where possible to mimic hardware aesthetics.

### Cards
Cards are the primary structural unit. They must have a white background, 16px corner radius, and Elevation-1 shadows. They should never have heavy borders; a 1px soft gray border is only permitted if the card is placed on a white surface.

### Input Fields
Inputs use a subtle 1px border. On focus, the border color transitions to the Accent Blue, accompanied by a soft blue outer glow (3px spread, 20% opacity).

### AI Message Bubbles
To emphasize the "Assistant" nature, AI-generated content should be housed in a very light blue tinted card or a card with a subtle gradient to distinguish it from manual user data.

### Progress & Gauges
Sales targets and AI confidence scores should use "thin-line" circular progress indicators with the Success Green, using a 2px stroke width to maintain a sophisticated, technical look.