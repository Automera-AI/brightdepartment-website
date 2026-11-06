---
name: Bright Department
description: The side of a good work truck. Name, trade and phone number lettered big enough to read from the road.
colors:
  ground: "#fbfbf9"
  ground-2: "#eef0f2"
  paper: "#ffffff"
  ink: "#111216"
  ink-2: "#3d424b"
  steel: "#5b616b"
  cobalt: "#1f3fd1"
  cobalt-deep: "#142b9c"
  cobalt-tint: "#e7ebfb"
  on-cobalt-2: "#c9d2f7"
  yellow: "#ffc915"
  yellow-deep: "#f0b400"
  red: "#e0352b"
  red-tint: "#fbe7e5"
  on-ink: "#e4e6ea"
  on-ink-2: "#c7cad1"
  loss-on-ink: "#ff6a5f"
typography:
  display:
    fontFamily: "Big Shoulders Display, Barlow, system-ui, sans-serif"
    fontSize: "clamp(3rem, 7vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "Big Shoulders Display, Barlow, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5.4vw, 5rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Big Shoulders Display, Barlow, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 2.6vw, 2.5rem)"
    fontWeight: 900
    lineHeight: 0.98
  title-text:
    fontFamily: "Barlow, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.25
  lede:
    fontFamily: "Barlow, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.2rem, 1.6vw, 1.45rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Barlow, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "\"kern\", \"liga\""
  label:
    fontFamily: "Barlow, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 700
    letterSpacing: "0.08em"
  button:
    fontFamily: "Barlow, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 700
    letterSpacing: "0.04em"
rounded:
  none: "0px"
spacing:
  stroke: "2px"
  gutter: "clamp(16px, 4vw, 48px)"
  section: "clamp(96px, 12vw, 176px)"
  section-tight: "clamp(64px, 8vw, 112px)"
  wrap: "1320px"
  header-h: "76px"
components:
  button-primary:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.yellow-deep}"
    textColor: "{colors.ink}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "56px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
  button-cobalt:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "56px"
  button-cobalt-hover:
    backgroundColor: "{colors.cobalt-deep}"
  button-small:
    padding: "0 18px"
    height: "44px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
    height: "54px"
  tile:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "clamp(24px, 3vw, 40px)"
  tile-dash:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.paper}"
  tools-feature:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    padding: "clamp(28px, 4vw, 56px)"
  road-plate:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.paper}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
  placeholder-token:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    padding: "0 0.3em"
  action-bar-book:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    height: "60px"
  action-bar-call:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    height: "60px"
---

# Design System: Bright Department

## Overview

**Creative North Star: "Truck Door Lettering"**

The site is the side of a good work truck. The ground is fleet-white enamel; type is cut vinyl in sign black and reflex cobalt, set big enough to read from the road. The business name, the trade and the phone number are the hero, and the phone number is set at road scale, not tucked into a nav corner. Every surface is a flat panel joined by one 2px ink rule, with corners squared like plate edges. A cobalt-and-yellow fleet stripe on reflective-tape diagonals is the livery that closes the door panel and recurs as the brand's single decorative device.

Density is confident and blunt: tall condensed display lines at a 0.92 line height, short Barlow paragraphs held to 44 to 46 characters, grids of panels butted together with a 2px seam rather than floating cards with gaps. Colour carries meaning. Cobalt is the working voice (live line, the trace, booked, the AI speaking), yellow is the thing you press, and red is what a missed call costs. The world rejects the category's dark navy, purple-gradient AI glow and icon-tile cards.

Motion is mechanical and scroll-driven. The call trace draws as you read, manifesto words come up from faint, the SAMPLE console tilts upright into place, and the fleet stripe is laid on like vinyl from a roll. Everything has a static, fully legible state under reduced motion.

**Key Characteristics:**
- Fleet-white ground, sign-black ink, reflex-cobalt voice, safety-yellow actions, signal-red loss.
- One 2px ink stroke for every rule, border, seam and icon; squared corners everywhere a panel or control exists.
- Big Shoulders Display 900 in uppercase for anything lettered; Barlow for anything read.
- Panels share seams: grids use a 2px ink gap on an ink ground instead of gutters between floating cards.
- The phone number is display type, set at road scale on the door and in the final call to action.
- Scroll-scrubbed signature motion with a custom ease-out (cubic-bezier(0.23, 1, 0.32, 1)) for everything else.

## Colors

A high-contrast fleet livery: near-white enamel and near-black vinyl, one saturated blue that does the talking, one yellow that means go and one red that means loss.

### Primary
- **Reflex Cobalt** (cobalt): the working colour. The H1's second line, the door phone number, the call-trace line and its nodes, booked values, AI turns in the transcript, Scorecard progress and score bars, check-list icons, nav underlines, focus rings, caret and form accent colour, road plates, the Dashboard tile and the quote block. Cobalt Deep (cobalt-deep) is its pressed and hover state only; the highlighted bottleneck cell in the four-lens grid (white title, on-cobalt text); and the marquee separators.
- **Cobalt Tint** (cobalt-tint): the quiet cobalt field. The live-dot halo, the console's Top 2 panel, the selected Scorecard option and the inner ring of the input focus treatment.
- **On-Cobalt Secondary** (on-cobalt-2): lede and secondary text set on cobalt panels.

### Secondary
- **Safety Yellow** (yellow): action. Primary buttons, the mobile Book button, the sound toggle, the skip link, the Scorecard lead block on the free-tools section, the yellow-and-ink tape in the fleet stripe, and the owner-supplied placeholder token. Text selection also picks it up. Safety Yellow Deep (yellow-deep) is the hover state only.

### Tertiary
- **Signal Red** (red): loss. The missed-call branch of the trace and its state name, the missed-calls gauge, the estimated monthly leak on Scorecard results, and invalid form fields with their error text. Red Tint (red-tint) backs the missed-call card and the invalid-field halo.
- **Loss on Ink** (--loss-on-ink, with --loss-on-ink-2 for its caption): the calculator's monthly-loss figure on the ink panel, where plain red would not hold contrast. **Red Text** (--red-text) is the darker red for small loss text on the red tint.

### Neutral
- **Fleet Enamel** (ground): the page ground and the header behind its blur.
- **Panel Grey** (ground-2): alternating steel bands, the door seam, the trace's unlit base line, scrollbar track and quote-table row rules.
- **Paper White** (paper): raised panels: door hero, tiles, forms, calculator inputs, console, case cards. Also the text colour on cobalt and ink.
- **Sign Black** (ink): all text, every 2px rule, the seam colour behind panel grids, the footer, marquee, calculator output and mobile Call button.
- **Ink Secondary** (ink-2): ledes and paragraph text inside panels.
- **Steel** (steel): captions, hints, table headers, metadata.
- **On-Ink ramp** (--on-ink, --on-ink-2, --on-ink-3, --on-ink-4): text on ink bands and the footer, from body down to quiet captions. **Rule on Ink** (--rule-on-ink) draws 2px rules on ink. **Placeholder** (--placeholder) colours input placeholder text. Every colour is a custom property on :root; nothing outside :root is a raw hex value.

### Named Rules
**The Yellow Means Go Rule.** Safety Yellow belongs to the action layer: buttons, the mobile Book bar, the Scorecard lead block, the fleet-stripe tape and the [ ... ] placeholder token. Use it to mark what to press or what is still missing, never as decoration or emphasis.

**The Red Means Loss Rule.** Signal Red marks what is lost: the missed call and money leaking away. The Scorecard's weakest stage is named in cobalt with an ink bar; only its dollar estimate is red. Form validation is the one functional exception. Red never decorates and never marks success.

**The Cobalt Speaks Rule.** When the business or its AI is doing the work (answering, booking, the live line), the type is cobalt. Ink is for the owner's own words.

## Typography

**Display Font:** Big Shoulders Display (variable 400 to 900, self-hosted), falling back to Barlow and system-ui
**Body Font:** Barlow (400, 400 italic, 500, 600, 700, self-hosted), falling back to system-ui, -apple-system and Segoe UI

**Character:** A tall, condensed sign gothic cut at weight 900 in uppercase, like vinyl on a door, over a highway-sign grotesque that stays plain and readable at body size. The display face shouts the name and the number; Barlow explains.

### Hierarchy
- **Display** (900, clamp(3rem, 7vw, 6rem), 0.92, uppercase): page H1s and the final call to action. The door title runs clamp(3rem, 7.2vw, 6rem) across two lines, the second line in cobalt.
- **Headline** (900, clamp(2.5rem, 5.4vw, 5rem), 0.92, uppercase): section H2s, held to about 12 to 16ch.
- **Title** (900, clamp(1.75rem, 2.6vw, 2.5rem), 0.98, uppercase): tile, card, tool, lens and trace-state titles. Component titles scale within roughly 1.8rem to 3.4rem.
- **Numerals** (800 to 900 display): phone numbers (door clamp(2.6rem, 5.4vw, 5rem) in cobalt; final CTA clamp(2.4rem, 4.8vw, 4.4rem); header 1.45rem at 800), gauges, calculator totals and case stats. Gauges, tables and the calculator use tabular figures.
- **Title Text** (Barlow 700, 1.25rem, 1.25): sentence-case H4s and step titles where a lettered title would be too loud.
- **Lede** (Barlow 400, clamp(1.2rem, 1.6vw, 1.45rem), 1.45): section intros, max 46ch, ink-2.
- **Body** (Barlow 400, 1.125rem / 1.0625rem under 760px, 1.55): running text, max 66 to 70ch in prose.
- **Label** (Barlow 700, 0.75 to 0.9rem, 0.08 to 0.12em tracking, uppercase): table headers, fact terms, console panel heads, transcript speakers, footer column heads and the SAMPLE tag. Labels name a panel's contents; they never sit above a headline.
- **Button** (Barlow 700, 1.05rem, 0.04em tracking, uppercase).

### Named Rules
**The Lettered or Read Rule.** If it should be read from across the road (names, numbers, states, titles), it is Big Shoulders Display 900 in uppercase. If it should be read up close, it is Barlow in sentence case. There is no third face and no mid-weight display.

**The Phone at Road Scale Rule.** The phone number is display type, never body-sized link text, wherever it is the primary content of a block.

## Layout

A 1320px wrap with fluid gutters (clamp(16px, 4vw, 48px)) and generous section padding (clamp(96px, 12vw, 176px); tight sections clamp(64px, 8vw, 112px)). Sections alternate fleet enamel, panel grey, paper, ink and cobalt bands; bands meet at 2px ink rules rather than at soft transitions.

Section heads use a split grid: the headline on the left (1.2fr) and the lede bottom-aligned on the right (0.8fr). The door hero is a two-column panel (1.25fr copy, 0.95fr cab window) with the H1 spanning both columns. Multi-item groups (bento, case teasers, tool cards, next steps) are grids with a 2px gap over an ink ground, so items share a single seam. Lists of steps, lenses, facts and gauges use the same seam logic with internal border-left rules.

The bento is a 6-column dense grid: Receptionist spans 4 by 2, Follow-up and Social 2 each, Dashboard and Tools 3 each.

**Breakpoints:**
- **1180px:** nav tightens, logo drops to 184px, road plates reflow from 5 to 3 columns.
- **1020px:** header height to 68px; nav and header phone collapse into a 48px menu button; every two-column layout (door, trace, booking, case hero, final CTA, split heads) stacks; bento to 2 columns; console to 2 columns; calculator, tools lead and tool cards stack; trace pin unsticks.
- **760px:** body text to 1.0625rem; the sticky mobile action bar appears and the body reserves 64px for it; header button hides; hero buttons go full width; bento, road, lenses, case teasers, forms and footer go single-column; the horizontal accordion becomes a vertical stack with copy always visible; the door seam and inline photo pills are removed; the door plate stacks its items.

### Named Rules
**The Shared Seam Rule.** Adjacent panels share one 2px ink seam. Don't float cards on a gap of ground colour.

## Elevation & Depth

Depth is flat and printed. Separation comes from 2px ink rules and band changes, not from layering. Two soft shadows exist, both low and grounded beneath the object rather than offset to one side: a contact shadow under raised buttons on light grounds, and a deep drop under the SAMPLE console so it reads as a lifted device. The header uses a 94% ground mix with a 10px backdrop blur so content passes under the rule.

### Shadow Vocabulary
- **Button contact** (`box-shadow: 0 10px 18px -12px rgba(17, 18, 22, 0.45)`): yellow and cobalt buttons on light grounds. Removed on line buttons and on cobalt and ink bands.
- **Console lift** (`box-shadow: 0 30px 60px -30px rgba(17, 18, 22, 0.45)`): the SAMPLE dashboard only.
- **Status lamp halo** (`box-shadow: 0 0 0 3px var(--cobalt-tint)`): the live dot beside the header phone.

### Named Rules
**The Painted Panel Rule.** Panels are paint on a door, not cards on a table. A new surface gets a 2px ink border or a seam, not a shadow.

## Shapes

Every panel, button, input, tag, plate and image frame has squared corners (0px radius). The single stroke (2px, the `--stroke` token) draws every border, seam, divider, underline, FAQ plus sign and icon (24px icons, stroke-width 2, square caps, miter joins). Heavier weights are reserved for specific devices: the trace line (6px, round caps), trace nodes (4px ring), the cab-window gasket (6px inset), the road plate's 3px white reflective border inside its cobalt outline, and the 3px focus outline.

Circles appear only as signal lamps: the live dot, the transcript state dot and the trace nodes. Diagonals appear in three places: the cab window's slanted top-left cut (polygon clip at 22% and 34%), the fleet stripe's -32deg skew with -58deg tape, and the 45deg rotated cobalt square that separates marquee phrases. Photography placeholders use a 45deg ground and ground-2 hatch.

### Named Rules
**The One Stroke Rule.** One weight (2px, ink) for every rule and icon. A heavier line has to be a named device (trace, gasket, plate, focus), never a casual emphasis.

**The Plate Edge Rule.** Corners are square. Round only signal lamps.

## Components

### Buttons
Heavy, lettered, sign-plate buttons.
- **Shape:** squared (0px) with a 2px ink border, 56px min height, 0 26px padding, 12px icon gap; small variant 44px and 0 18px.
- **Primary:** Safety Yellow with ink text, uppercase Barlow 700 at 0.04em tracking; button contact shadow on light grounds. Leading calendar or phone icon, trailing arrow.
- **Hover / Focus:** yellow-deep fill, and the arrow nudges 4px right (pointer-fine devices only). Active scales to 0.97 over 160ms with the custom ease-out. Focus is a 3px cobalt outline offset by 3px (yellow on cobalt and ink bands).
- **Line:** transparent with an ink border, no shadow; hover fills ink with ground text. On cobalt or ink bands it turns white-bordered and fills white on hover.
- **Cobalt:** cobalt fill with white text; hover cobalt-deep.
- **Link arrow:** Barlow 700 with a 2px currentColor underline and an 18px arrow that nudges on hover; hover turns cobalt (yellow on dark bands).

### Fleet Stripe
The livery band (34px tall). A 20px cobalt bar and, below it, a 9px repeating yellow-and-ink tape (16px yellow, 6px ink at -58deg), both skewed -32deg and bled off the left edge. It closes the door hero and recurs at band edges. It draws in with a left-to-right clip reveal (900ms ease-out, the tape 120ms behind) and is static under reduced motion.

### Door Hero and Plate
The truck-door panel: paper ground, a 2px panel-grey door seam inset from the left (hidden under 760px), the two-line H1 with its second line in cobalt, the trade line, a "Call or text" label over the road-scale cobalt phone number (hover to ink), the yellow Book button beside a line button, a steel note, and the door plate. The door plate is a 2px ink-bordered strip of display 800 uppercase facts separated by 2px vertical rules, which stacks without rules on mobile. The fleet stripe runs along the bottom edge.

### Cab Window
The slanted cab window holds the hero video: ink ground, 16:11 aspect, top-left corner cut by a polygon clip, and a 6px ink gasket drawn as one inset stroke on the same polygon. A yellow sound toggle with an ink border sits bottom-right. A steel caption sits below.

### Bento Tiles
Paper tiles in a 6-column ink-seamed grid with clamp(24px, 3vw, 40px) padding, a display title and an ink-2 paragraph capped at 46ch, with the foot pushed to the bottom. The Dashboard tile is the cobalt variant. Tiles carry functional inner devices: a bordered transcript with a cobalt state head and speaker labels, a four-cell day track and bordered tool chips.

### Call Trace (signature)
One continuous cobalt line traces a call from ring to booked. Layout: a sticky pinned head on the left (headline, 28px legend swatches) and a track on the right. The SVG path is computed from the real node centres. A 6px panel-grey base line sits under a 6px cobalt live line that scrubs its dash offset on scroll (start top 60%, end bottom 65%, scrub 0.6). Each step has a 32px ring node (4px cobalt border) that fills cobalt and scales to 1.08 when lit, a time, a state name in display type and a short paragraph. The missed-call branch is a 4px red dashed curve into a dashed red card on red tint; its state name and node are red. Under reduced motion or without GSAP, every node is lit and the full line shows.

### SAMPLE Console
A device-like dashboard panel: paper body, 2px ink frame and the console lift shadow. It has a ground-coloured bar with a display title and squared tab buttons (selected is ink with white text), a four-gauge row of display numerals in tabular figures (missed in red, booked in cobalt), a quotes table and a cobalt-tint Top 2 panel. It always carries a visible SAMPLE tag: a 2px currentColor-bordered uppercase label. On scroll it scrubs from scale 0.88, rotateX 8deg and opacity 0.55 to flat, then fades to 0.35 as it leaves.

### Horizontal Accordion
Industry panels in a 2px-seamed ink strip (clamp(460px, 52vw, 600px) tall). Photos are slightly desaturated (grayscale 0.35) under an ink gradient, with a display name. Hover or focus grows the panel to flex-grow 2.6 and shrinks the rest to 0.7 (600ms ease-in-out), restores colour, and reveals the pain line and a yellow "go" link. On touch tablets the first tap opens a panel. Under 760px it becomes a vertical stack with copy always visible.

### Calculator
A two-panel form: paper inputs on the left (2px fields, prefix and suffix units, cobalt-accent range) and an ink output panel on the right. The output leads with the monthly loss as a giant display numeral in Loss on Ink, then the yearly figure, the formula under a 2px rule, and white-bordered line buttons for next steps.

### Road Plates
The launch timeline as highway signs: a 5-column bordered strip (3 at 1180px, 1 at 760px). Each step leads with a plate: cobalt fill, white display 900 uppercase, a 3px white border inside a 2px cobalt outline, like a reflective sign. The final plate is ink.

### Case Cards
Paper cards in a 2px-seamed pair: a 16:9 ink-backed media well (the image scales to 1.05 on hover over 900ms), a display title, a paragraph and a three-cell stat strip ruled top and bottom with display numerals.

### Tools Lead
The free-tools block: a 2px-bordered two-column panel. The left is the Scorecard lead block in Safety Yellow with a large display title and an ink button (hover cobalt). The right holds two stacked paper rows separated by a 2px rule, each with a display title and a link arrow; rows hover to ground. Stacks at 1020px.

### FAQ
Native details elements between 2px ink rules. Summaries are Barlow 700 at clamp(1.15rem, 1.6vw, 1.4rem), with a 22px plus drawn from two 2px bars whose vertical bar rotates flat when open (240ms ease-out). Answers are capped at 70ch.

### Marquee
An ink band between 2px rules carrying display 900 uppercase phrases (clamp(2rem, 4vw, 3.4rem)) separated by small rotated cobalt squares. It loops over 40s, linear, pauses on hover, and wraps statically under reduced motion.

### Inputs / Fields
- **Style:** paper fill, 2px ink border, squared, 54px min height, 12px 14px padding, 1.05rem text; Barlow 700 labels above, steel hints. Selects use an inline 2px chevron. Textareas start at 140px.
- **Focus:** no outline; a double ring (3px cobalt-tint inside 5px cobalt).
- **Error:** red border with a 3px red-tint halo, and red Barlow 600 error text below.
- **Checks and radios:** native controls with cobalt accent colour. Scorecard options are full-width bordered rows that turn cobalt-tint with a cobalt border when checked.
- **Form card:** paper, 2px ink border, clamp(24px, 3.5vw, 44px) padding, display title.

### Navigation
A sticky header with a blurred enamel ground and a 2px ink bottom rule, 76px tall (68px at 1020px). Nav links are Barlow 600 with a 2px cobalt underline that wipes in from the left on hover and stays on for the current page. A display 800 phone number with a cobalt live dot sits beside a small primary button. Under 1020px a 48px bordered menu button opens a full-width panel of display 900 uppercase links at 2.2rem with ground-2 rules.

### Sticky Mobile Action Bar
Under 760px a fixed two-cell bar sits at the bottom with a 2px ink top rule and safe-area padding: Book on Safety Yellow, Call on ink, each 60px tall in uppercase Barlow 700 with an icon, and active scaling to 0.97.

### Placeholder Token
Owner-supplied values the site may not invent are set as a bracketed token, such as [NUMBER] or [288 EXTERIORS JOB PHOTO], on Safety Yellow with ink Barlow 700 and a 2px dashed ink outline. Missing photos use the hatched placeholder panel with the token centred. The token is a deliberate production marker that stays visible until real data replaces it.

## Do's and Don'ts

### Do:
- **Do** draw every border, seam, divider and icon with the single 2px ink stroke, and keep every corner square.
- **Do** set names, numbers, states and titles in Big Shoulders Display 900 uppercase, and everything read up close in Barlow.
- **Do** set the phone number in display type at road scale wherever it is the primary content.
- **Do** reserve Safety Yellow for actions, the Scorecard lead block, the fleet-stripe tape and the [ ... ] placeholder token.
- **Do** reserve Signal Red for missed-call loss and money lost, plus form errors.
- **Do** join grouped panels with a shared 2px ink seam (2px gap over an ink ground).
- **Do** use the custom ease-out (cubic-bezier(0.23, 1, 0.32, 1)) for state transitions, a 0.97 press scale, and hover effects gated to pointer-fine devices.
- **Do** label any illustrative dashboard or transcript with a visible SAMPLE tag, and mark every owner-supplied number with the placeholder token until it is real.
- **Do** give every scroll-scrubbed and revealed element a complete static state under prefers-reduced-motion.

### Don't:
- **Don't** use the category's dark navy, purple-gradient AI glow or icon-tile cards.
- **Don't** round panel, button, input or image corners. Circles are for signal lamps only.
- **Don't** use yellow as decoration, a highlight or a section background outside the Scorecard lead block.
- **Don't** use red for emphasis, warnings unrelated to loss, or anything positive.
- **Don't** float cards on ground-coloured gaps or give new surfaces drop shadows; borders and seams do the separating.
- **Don't** introduce a third typeface or set display type below weight 800.
- **Don't** put small uppercase lead-in lines above headlines; uppercase labels only name the contents of a panel, table or field.
- **Don't** present invented results as real; use the placeholder token or the SAMPLE tag.
