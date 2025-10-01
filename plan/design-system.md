# Luxury Sneaker Fashion Brand - Design System

## Theme Selection

**CUSTOM LUXURY THEME**

Theme Name: Midnight Gold Luxury
Theme ID: midnight-gold-luxury
Description: Sophisticated dark theme with gold accents and deep red highlights, embodying exclusivity and premium quality
Industry/Use: Luxury e-commerce, high-end fashion, premium sneaker brands

### LIGHT MODE COLORS:
- Background: hsl(0, 0%, 98%) (very light gray)
- Card: hsl(0, 0%, 100%) (pure white)
- Primary: hsl(0, 0%, 8%) (rich black)
- Secondary: hsl(45, 100%, 50%) (luxurious gold #FFD700)
- Accent: hsl(0, 100%, 27%) (deep red #8B0000)
- Text: hsl(0, 0%, 12%) (very dark gray)
- Text Muted: hsl(0, 0%, 45%) (medium gray)
- Border: hsl(0, 0%, 88%) (light gray)
- Muted: hsl(0, 0%, 94%) (very light gray)

### DARK MODE COLORS (Primary Mode):
- Background: hsl(0, 0%, 9%) (midnight black)
- Card: hsl(0, 0%, 14%) (dark charcoal)
- Primary: hsl(45, 100%, 50%) (luxurious gold #FFD700)
- Secondary: hsl(0, 0%, 8%) (rich black)
- Accent: hsl(0, 100%, 35%) (vibrant red)
- Text: hsl(0, 0%, 95%) (off-white)
- Text Muted: hsl(0, 0%, 60%) (light gray)
- Border: hsl(0, 0%, 22%) (dark border)
- Muted: hsl(0, 0%, 18%) (dark muted)

### PREVIEW COLORS:
- Color 1: hsl(45, 100%, 50%) (gold)
- Color 2: hsl(0, 100%, 27%) (deep red)
- Color 3: hsl(0, 0%, 8%) (black)

---

## Foundations

### Color System
**Primary Palette:**
- Black (hsl(0, 0%, 8%)): Main brand color, primary backgrounds, text
- Gold (hsl(45, 100%, 50%)): Premium accents, CTA buttons, highlights
- Deep Red (hsl(0, 100%, 27%)): Secondary accents, sale tags, urgency elements

**Semantic Colors:**
- Success: hsl(120, 50%, 40%) - Product in stock, confirmation
- Warning: hsl(45, 100%, 50%) - Limited stock alerts
- Error: hsl(0, 100%, 27%) - Sold out, validation errors
- Info: hsl(0, 0%, 60%) - General information

**Usage Guidelines:**
- Use black for premium, sophisticated backgrounds
- Reserve gold for high-value CTAs and premium elements only
- Apply red sparingly for urgency and exclusivity
- Maintain 70% black, 20% white/gray, 10% gold/red ratio

### Typography Scale
**Font Families:**
- Primary: 'Playfair Display' (headings, hero text) - Elegant serif for luxury feel
- Secondary: 'Inter' (body, UI elements) - Modern sans-serif for readability
- Accent: 'Montserrat' (buttons, labels) - Clean geometric sans-serif

**Type Scale:**
- Display: 72px/80px (line-height) - Hero headlines, bold=700
- H1: 48px/56px - Page titles, bold=700
- H2: 36px/44px - Section headers, bold=600
- H3: 28px/36px - Subsections, bold=600
- H4: 24px/32px - Card titles, bold=500
- Body Large: 18px/28px - Featured text, regular=400
- Body: 16px/24px - Standard text, regular=400
- Body Small: 14px/20px - Captions, metadata, regular=400
- Caption: 12px/16px - Fine print, labels, regular=400

**Letter Spacing:**
- Display/H1: -0.02em (tighter for elegance)
- H2-H4: -0.01em
- Body: 0em (normal)
- Uppercase labels: 0.08em (wider for sophistication)

### Spacing & Grid
**Spacing Scale (8px base):**
- xs: 4px - Tight spacing, icon padding
- sm: 8px - Compact elements
- md: 16px - Default spacing
- lg: 24px - Section spacing
- xl: 32px - Large gaps
- 2xl: 48px - Major sections
- 3xl: 64px - Hero spacing
- 4xl: 96px - Page sections

**Grid System:**
- Container max-width: 1440px
- Columns: 12-column flexible grid
- Gutter: 24px desktop, 16px tablet, 12px mobile
- Margins: 48px desktop, 24px tablet, 16px mobile

**Breakpoints:**
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large Desktop: 1440px+

### Iconography
**Icon System:**
- Library: Lucide React (consistent, modern icons)
- Size Scale: 16px (small), 20px (default), 24px (medium), 32px (large), 48px (hero)
- Style: Stroke-based, 2px stroke weight
- Color: Inherit from parent or use text-muted for subtle icons

**Usage:**
- Navigation: 20px icons with 8px gap from text
- Product features: 24px icons with gold accent on hover
- Social media: 20px icons, white/gold depending on background

---

## Components

### Buttons
**Primary CTA (Gold):**
- Background: Gold (hsl(45, 100%, 50%))
- Text: Black, 16px Montserrat, bold=600, uppercase, letter-spacing: 0.08em
- Padding: 16px 32px
- Border-radius: 0px (sharp, modern)
- Hover: Scale 1.02, subtle gold glow shadow
- Transition: all 0.3s ease

**Secondary (Black Outline):**
- Background: Transparent
- Border: 2px solid black/gold
- Text: Black/Gold, 16px Montserrat, bold=600
- Padding: 14px 30px
- Hover: Background fills with black/gold, text inverts

**Text Button:**
- Background: None
- Text: Gold with underline on hover
- 14px Montserrat, bold=500

### Cards (Product Cards)
- Background: Card color (white in light, dark charcoal in dark mode)
- Border: 1px solid border color
- Border-radius: 0px (sharp edges for modern luxury)
- Padding: 0px (image bleeds to edge)
- Shadow: Subtle 0px 4px 12px rgba(0,0,0,0.1)
- Hover: Elevate with larger shadow, scale 1.01
- Image aspect ratio: 1:1 for product images
- Content padding: 20px for text below image

### Forms & Inputs
**Text Input:**
- Background: Transparent
- Border: 1px solid border color
- Border-bottom: 2px solid gold (focus state)
- Padding: 12px 16px
- Font: 16px Inter, regular=400
- Placeholder: Text muted color
- Focus: Gold border-bottom, no outline

**Select/Dropdown:**
- Same styling as text input
- Custom arrow icon (gold chevron)

**Checkbox/Radio:**
- Custom styled with gold accent when checked
- Size: 20px, border-radius: 2px (checkbox), 50% (radio)

### Navigation
**Desktop Header:**
- Height: 80px
- Background: Black (dark mode primary)
- Logo: Left, gold/white version
- Links: Center, 14px Montserrat uppercase, letter-spacing: 0.08em
- Actions (cart, profile): Right, 24px icons
- Position: Sticky on scroll

**Mobile Navigation:**
- Hamburger menu (gold icon)
- Full-screen overlay menu
- Smooth slide-in animation from right

---

## Animation & Micro-interactions

### Animation Principles
- Subtle and sophisticated, never distracting
- Duration: 0.3s for most interactions, 0.5s for complex animations
- Easing: ease-in-out for smooth, luxury feel
- Use sparingly to maintain elegance

**Hover States:**
- Buttons: Scale 1.02, subtle glow
- Product cards: Elevate with shadow, scale 1.01
- Links: Gold underline slides in from left
- Images: Slight zoom (scale 1.05) on product images

**Page Transitions:**
- Fade in: 0.5s ease for page loads
- Scroll reveal: Elements fade up (translateY: 20px to 0) on scroll into view

**Loading States:**
- Elegant skeleton screens with subtle shimmer effect
- Gold progress bars for checkout flow

**Success States:**
- Checkmark icon with scale animation
- Gold color confirmation

---

## Theming

### Light/Dark Mode Tokens
**Light Mode (Alternative):**
- Use for accessibility or user preference
- Maintain black, gold, red palette
- White backgrounds for clean, minimal look

**Dark Mode (Primary/Default):**
- Default mode for luxury, exclusive feel
- Black backgrounds (hsl(0, 0%, 9%))
- Gold accents pop against dark background
- Better for showcasing high-quality product photography

### Mode Toggle
- Subtle icon-based toggle in header
- Sun/Moon icons (20px)
- Smooth transition: all 0.3s ease
- Preference saved in localStorage

---

## Dark Mode & Color Contrast Rules (Critical)
- Always use explicit colors - never rely on browser defaults or component variants like 'variant="outline"'
- Force dark mode with CSS: 'html { color-scheme: dark; }' and 'meta name="color-scheme" content="dark"'
- Use high contrast ratios: minimum 4.5:1 for normal text, 3:1 for large text
- Override browser defaults with '!important' for form elements: 'input, textarea, select { background-color: #000000 !important; color: #ffffff !important; }'
- Test in both light and dark system modes - system dark mode can override custom styling
- Use semantic color classes instead of component variants: 'className="bg-gray-800 text-gray-300 border border-gray-600"' not 'variant="outline"'
- Create CSS custom properties for consistency across components
- Quick debugging: check if using 'variant="outline"', add explicit colors, use '!important' if needed, test system modes

### Color Contrast Checklist (apply to all components):
□ No 'variant="outline"' or similar browser-dependent styles
□ Explicit background and text colors specified
□ High contrast ratios (4.5:1+ for text, 3:1+ for large text)
□ Tested with system dark mode ON and OFF
□ Form elements have forced dark styling
□ Badges and buttons use custom classes, not default variants
□ Placeholder text has proper contrast
□ Focus states are visible and accessible

---

## Special Considerations for Luxury Brand

### Premium Image Treatment
- High-resolution images (2x retina minimum)
- Aspect ratios: 1:1 for products, 21:9 for hero banners
- Lazy loading with elegant fade-in
- Image hover zoom effect (scale 1.05, 0.5s ease)

### Exclusive Elements
- "Limited Edition" badges: Gold background, black text, 12px uppercase
- "Sold Out" ribbons: Red diagonal ribbon across product image
- Member-only indicators: Small gold lock icon

### Typography Hierarchy
- Use Playfair Display sparingly for maximum impact (hero, main headlines)
- Inter for all body content ensures readability
- Montserrat for UI elements provides modern, clean interface

### White Space Strategy
- Generous padding around premium elements
- Minimum 48px vertical spacing between major sections
- Let products breathe with ample white/black space around images
