# Cab Fare & Fuel Calculator Pro - Design Guidelines

## Design Approach

**Selected Approach:** Design System - Material Design Principles with Modern Minimalism

**Justification:** This is a utility-focused application requiring clear information hierarchy, efficient data input, and instant calculation feedback. The tool prioritizes usability and clarity over visual flair, making a systematic approach ideal.

**Key Design Principles:**
1. **Clarity First:** Every element serves a functional purpose with zero visual ambiguity
2. **Efficient Scanning:** Users should quickly locate inputs, review calculations, and complete transactions
3. **Progressive Disclosure:** Advanced options (fuel surcharges, presets) revealed contextually
4. **Trust Through Precision:** Financial calculations demand pixel-perfect alignment and clear typography

---

## Typography

**Font Family:** Inter (Google Fonts) - clean, highly legible, optimized for UI
- Primary: Inter Regular (400), Medium (500), Semibold (600)

**Type Scale:**
- **App Title/Headers:** text-2xl font-semibold (24px)
- **Section Headings:** text-lg font-medium (18px)
- **Input Labels:** text-sm font-medium (14px)
- **Body/Input Text:** text-base font-regular (16px)
- **Helper Text/Captions:** text-xs font-regular (12px)
- **Receipt Display:** font-mono for numerical alignment

**Hierarchy Rules:**
- All monetary values use tabular numbers for perfect alignment
- Input labels positioned above fields with 2-unit spacing
- Error states use text-sm with appropriate weight

---

## Layout System

**Spacing Primitives:** Tailwind units of **2, 4, 6, 8, 12, 16**
- Micro spacing (within components): p-2, gap-2
- Standard spacing (between related elements): p-4, gap-4, mb-4
- Section spacing (between major blocks): p-6, mb-8, gap-8
- Container padding: px-4 (mobile), px-6 (tablet), px-8 (desktop)

**Grid Structure:**
- **Single Column Mobile:** max-w-lg mx-auto (mobile-first)
- **Two Column Desktop:** Split main calculator (left) and receipt preview (right) at lg: breakpoint
- **Container:** max-w-6xl mx-auto for entire app

**Responsive Behavior:**
- Mobile (<768px): Stacked single column, full-width inputs
- Tablet (768px-1024px): Maintain single column with wider max-width
- Desktop (>1024px): Two-column layout with 60/40 split (calculator/receipt)

---

## Component Library

### 1. **App Header**
- Full-width with subtle bottom border
- Left: App title "Cab Fare Calculator Pro" (text-2xl font-semibold)
- Right: Quick action buttons (Export, Dark Mode toggle)
- Height: h-16, padding px-6
- Sticky positioning (sticky top-0)

### 2. **Input Components**

**Text/Number Inputs:**
- Full-width on mobile (w-full), fixed width on desktop where appropriate
- Height: h-12
- Padding: px-4
- Rounded corners: rounded-lg
- Border width: border-2
- Focus state: ring-2 ring-offset-2
- Prefix/suffix for currency ($) and units (mi, min, mpg)

**Select Dropdowns:**
- Match text input styling
- Height: h-12
- Include dropdown icon (chevron-down)
- Options list with hover states

**Toggle Switches:**
- For "Use live fuel data" feature
- Size: w-12 h-6
- Clear on/off states with smooth transition

**Radio Button Groups:**
- For fuel surcharge type (flat/per-mile)
- Horizontal layout on desktop, vertical on mobile
- Clear selection indicator with border-2

### 3. **Section Cards**

**Main Calculator Sections:**
- Background: subtle elevation with rounded corners (rounded-xl)
- Padding: p-6 (mobile), p-8 (desktop)
- Spacing between sections: space-y-6
- Section header with subtle divider below (border-b pb-4 mb-6)

**Grouped Inputs:**
- Related fields in gap-4 grid
- 2-column grid for paired inputs (e.g., Distance + Duration) on desktop
- Labels above inputs consistently

### 4. **Preset Buttons**
- "Quick Presets" horizontal scroll on mobile (flex gap-2 overflow-x-auto)
- Pill-shaped buttons (rounded-full)
- Compact size: px-4 py-2 text-sm
- Active preset indication with distinct treatment

### 5. **Fare Model Selector**
- Three large option cards in grid (grid-cols-1 md:grid-cols-3 gap-4)
- Each card shows: Model name, brief description, key rates
- Selected state with clear border/shadow treatment
- Cards: p-6, rounded-lg, cursor-pointer

### 6. **Receipt Display**

**Layout:**
- Card-based container (rounded-xl)
- Fixed-width receipt area with centered alignment
- Monospaced font for all numbers
- Line items with dotted leaders connecting labels to values

**Structure:**
- Header: "Cab Fare Receipt" centered, text-lg font-semibold
- Divider below header (border-b-2 mb-4)
- Line items: flex justify-between with text-sm
- Subtotal section with divider
- Grand total: larger text (text-xl font-bold), top border-t-2, pt-4

### 7. **Action Buttons**

**Primary Button (Calculate, Pay Now):**
- Full-width on mobile, fixed width on desktop
- Height: h-12
- Rounded: rounded-lg
- Font: text-base font-semibold
- Prominent size for critical actions

**Secondary Buttons (Export PDF, Email Receipt):**
- Outlined style with transparent background
- Same height as primary (h-12)
- Border-2 with rounded-lg

**Icon Buttons:**
- Square dimensions (h-10 w-10)
- Rounded: rounded-md
- For actions like settings, help icons

### 8. **Calculation Results Display**

**Real-time Calculation Panel:**
- Prominent card separate from receipt
- Large total display (text-4xl font-bold) for immediate feedback
- Breakdown in smaller text below (text-base)
- Update with smooth number transitions

### 9. **Square Payment Integration Section**
- Dedicated card appearing after calculation
- Payment form embedded within clean container
- Clear CTA: "Complete Payment" button
- Transaction success/error states with appropriate messaging

### 10. **Navigation & Organization**

**Tab/Section Navigation (if needed):**
- Horizontal tabs for switching between Calculator/History/Settings
- Underline indicator for active tab
- Text-base font-medium

**Collapsible Sections:**
- Advanced options collapsed by default
- Chevron icon indicating expand/collapse state
- Smooth height transition

---

## Animations

**Minimal, Purposeful Motion:**
- Input focus: Subtle scale (0.98) on active state - 150ms
- Number updates: Smooth count-up animation for calculated totals - 300ms
- Section expand/collapse: Height transition - 200ms ease-in-out
- Button interactions: Standard hover lift (translateY -1px) - 100ms
- NO scroll-triggered animations
- NO decorative motion

---

## Accessibility

- All inputs have associated labels (not placeholders as labels)
- Focus indicators visible on all interactive elements (ring-2)
- Sufficient contrast ratios for all text
- Keyboard navigation fully supported
- ARIA labels for icon-only buttons
- Error states communicated with text, not just visual treatment

---

## Special Considerations

**Mobile Optimization:**
- Input fields min-height h-12 for touch targets
- Adequate spacing between tappable elements (min gap-4)
- Sticky header for consistent navigation
- Bottom sheet pattern for modal actions

**Loading States:**
- Skeleton loaders for API data fetches
- Disabled button states during processing
- Spinner for payment processing

**Form Validation:**
- Inline validation messages below inputs (text-sm)
- Error state with distinct border treatment
- Success confirmation for completed payment

**Data Persistence Visual Cue:**
- Subtle indicator when values auto-save to localStorage
- Toast notification: "Settings saved" bottom-right

This design system ensures a professional, trustworthy calculator interface that prioritizes usability while maintaining modern aesthetics suitable for a financial transaction tool.