# Web UI Test Cases - Consultor Futebol Pro

**Project**: Consultor Futebol Pro
**Date**: 2026-08-25
**Total Test Cases**: 25
**Priority Distribution**: P0: 5, P1: 8, P2: 7, P3: 5

---

## Category 1: Navigation (TC-NAV)

### TC-NAV-001 [P0] Tab Navigation
**Prerequisites**: App loaded in browser
**Test Steps**:
1. Navigate to app URL
2. Click "Top 3" tab
3. Verify Top 3 content is visible
4. Click "Combos" tab
5. Verify Combos content is visible
6. Click "Historico" tab
7. Verify Historico content is visible
8. Click "Calculadora" tab
9. Verify Calculadora content is visible
10. Click "Jogos" tab
11. Verify Jogos content is visible

**Expected Results**:
- Each tab click shows corresponding content
- Previous tab content is hidden
- Active tab has visual indicator (green background)
- All 5 tabs are clickable

---

### TC-NAV-002 [P1] Tab Keyboard Navigation
**Prerequisites**: App loaded, focus on first tab
**Test Steps**:
1. Press Tab to focus first tab button
2. Press Right Arrow to move to next tab
3. Press Enter to activate tab
4. Verify tab content changes

**Expected Results**:
- Arrow keys navigate between tabs
- Enter/Space activates focused tab
- Focus indicator is visible (green outline)

---

### TC-NAV-003 [P1] Skip Link
**Prerequisites**: App loaded
**Test Steps**:
1. Press Tab once
2. Verify "Pular para conteudo principal" link appears
3. Press Enter on skip link
4. Verify focus moves to main content

**Expected Results**:
- Skip link is visible on focus
- Focus jumps to #main-content
- Link has proper styling

---

## Category 2: League Filters (TC-FILTER)

### TC-FILTER-001 [P0] Filter by Premier League
**Prerequisites**: App loaded, "Todos" filter active
**Test Steps**:
1. Click "Premier League" filter button
2. Verify only Fulham x Chelsea card is visible
3. Verify other match cards are hidden

**Expected Results**:
- Only Premier League matches shown
- Filter button has active state (blue background)
- Card count reduced from 7 to 1

---

### TC-FILTER-002 [P0] Filter by Serie A
**Prerequisites**: App loaded
**Test Steps**:
1. Click "Serie A" filter button
2. Verify Roma x Fiorentina and Bologna x Lazio cards are visible
3. Verify other cards are hidden

**Expected Results**:
- 2 Serie A matches shown
- Other league cards hidden

---

### TC-FILTER-003 [P0] Filter Reset (Todos)
**Prerequisites**: Active filter on "Premier League"
**Test Steps**:
1. Click "Todos" filter button
2. Verify all 7 match cards are visible

**Expected Results**:
- All matches displayed
- "Todos" button has active state

---

### TC-FILTER-004 [P1] Filter Button Touch Target
**Prerequisites**: App loaded on mobile viewport (375px)
**Test Steps**:
1. Inspect filter button dimensions
2. Verify minimum 44x44px touch target

**Expected Results**:
- Button height >= 36px
- Adequate spacing between buttons (8px+)

---

## Category 3: Calculator (TC-CALC)

### TC-CALC-001 [P0] Basic Calculation
**Prerequisites**: Calculadora tab active
**Test Steps**:
1. Enter "100" in amount field
2. Select "3.10 - Chelsea + M2.5" from odds dropdown
3. Click "Calcular Retorno" button
4. Verify return value

**Expected Results**:
- Return shows "R$ 310,00"
- Profit shows "Lucro: R$ 210,00"
- Values update in real-time

---

### TC-CALC-002 [P1] Custom Odd
**Prerequisites**: Calculadora tab active
**Test Steps**:
1. Enter "50" in amount field
2. Select "Odd personalizada" from dropdown
3. Enter "2.50" in custom odd field
4. Click calculate button

**Expected Results**:
- Return shows "R$ 125,00"
- Profit shows "Lucro: R$ 75,00"

---

### TC-CALC-003 [P2] Invalid Input Handling
**Prerequisites**: Calculadora tab active
**Test Steps**:
1. Enter "0" in amount field
2. Select any odd
3. Verify no calculation occurs

**Expected Results**:
- Return remains "R$ 0,00"
- No error thrown

---

### TC-CALC-004 [P2] Empty Fields
**Prerequisites**: Calculadora tab active
**Test Steps**:
1. Leave amount field empty
2. Click calculate button

**Expected Results**:
- No calculation performed
- Default values displayed

---

## Category 4: Save Button (TC-SAVE)

### TC-SAVE-001 [P0] Save Bet
**Prerequisites**: App loaded, Jogos tab active
**Test Steps**:
1. Click star button on Fulham x Chelsea card
2. Verify star changes to filled (gold)
3. Navigate to Historico tab
4. Verify bet appears in "Apostas Salvas" panel

**Expected Results**:
- Star icon changes from ☆ to ★
- Button has "saved" class
- Bet listed in saved panel

---

### TC-SAVE-002 [P1] Unsave Bet
**Prerequisites**: Bet already saved
**Test Steps**:
1. Click star button on saved bet
2. Verify star returns to outline
3. Verify bet removed from saved panel

**Expected Results**:
- Star icon changes from ★ to ☆
- Bet removed from localStorage
- Saved panel updated

---

### TC-SAVE-003 [P2] Remove from Panel
**Prerequisites**: Bet saved and visible in panel
**Test Steps**:
1. Navigate to Historico tab
2. Click "X" button on saved bet
3. Verify bet removed from panel
4. Verify star on card resets

**Expected Results**:
- Bet removed from panel
- localStorage updated
- Card star reset to ☆

---

### TC-SAVE-004 [P3] Persistence Across Refresh
**Prerequisites**: Bet saved
**Test Steps**:
1. Save a bet
2. Refresh page (F5)
3. Navigate to Historico tab
4. Verify bet still saved

**Expected Results**:
- Saved bets persist in localStorage
- Stars correctly reflect saved state

---

## Category 5: Accessibility (TC-A11Y)

### TC-A11Y-001 [P0] ARIA Labels Present
**Prerequisites**: App loaded
**Test Steps**:
1. Inspect all interactive elements
2. Verify aria-label attributes exist

**Expected Results**:
- All buttons have aria-label
- All inputs have associated labels
- Tab panels have aria-labelledby

---

### TC-A11Y-002 [P0] Focus Visible
**Prerequisites**: App loaded
**Test Steps**:
1. Press Tab through all interactive elements
2. Verify focus indicator visible on each

**Expected Results**:
- Green outline (2px) on focused elements
- Focus order matches visual order
- No focus traps

---

### TC-A11Y-003 [P1] Screen Reader Announcements
**Prerequisites**: Screen reader active
**Test Steps**:
1. Navigate to calculator
2. Enter amount and calculate
3. Verify screen reader announces result

**Expected Results**:
- aria-live="polite" on result container
- Screen reader announces "R$ 310,00"

---

### TC-A11Y-004 [P1] Color Contrast
**Prerequisites**: App loaded
**Test Steps**:
1. Check text contrast ratios
2. Verify green on dark background meets 4.5:1

**Expected Results**:
- All text meets WCAG AA contrast
- No gray-on-gray combinations

---

### TC-A11Y-005 [P2] Reduced Motion
**Prerequisites**: OS set to reduce motion
**Test Steps**:
1. Enable prefers-reduced-motion
2. Navigate through app
3. Verify animations disabled

**Expected Results**:
- No GSAP animations
- Instant state changes
- Smooth scroll disabled

---

## Category 6: Responsive Design (TC-RESP)

### TC-RESP-001 [P0] Mobile Viewport (375px)
**Prerequisites**: Browser at 375px width
**Test Steps**:
1. Resize to 375px
2. Verify stats bar shows 2 columns
3. Verify odds grid shows 2 columns
4. Verify all content accessible

**Expected Results**:
- Layout adapts to mobile
- No horizontal scroll
- All elements visible

---

### TC-RESP-002 [P1] Tablet Viewport (768px)
**Prerequisites**: Browser at 768px width
**Test Steps**:
1. Resize to 768px
2. Verify layout adapts

**Expected Results**:
- Appropriate column counts
- Readable text sizes
- Touch-friendly targets

---

### TC-RESP-003 [P1] Desktop Viewport (1440px)
**Prerequisites**: Browser at 1440px width
**Test Steps**:
1. Resize to 1440px
2. Verify max-width container

**Expected Results**:
- Content centered
- Max-width 1200px
- Adequate whitespace

---

## Category 7: Performance (TC-PERF)

### TC-PERF-001 [P1] Page Load Time
**Prerequisites**: DevTools Network tab
**Test Steps**:
1. Clear cache
2. Load app
3. Measure total load time

**Expected Results**:
- Load time < 3 seconds
- No render-blocking resources
- Fonts load asynchronously

---

### TC-PERF-002 [P2] Animation Performance
**Prerequisites**: DevTools Performance tab
**Test Steps**:
1. Record during tab switches
2. Check for layout thrashing

**Expected Results**:
- No layout shifts
- Smooth 60fps animations
- GPU-accelerated transforms

---

## Category 8: Security (TC-SEC)

### TC-SEC-001 [P0] XSS Prevention
**Prerequisites**: App loaded
**Test Steps**:
1. Check innerHTML usage
2. Verify user input not injected raw
3. Test localStorage data integrity

**Expected Results**:
- No innerHTML with user data
- localStorage values sanitized
- No script injection possible

---

### TC-SEC-002 [P1] LocalStorage Security
**Prerequisites**: App loaded
**Test Steps**:
1. Inspect localStorage contents
2. Verify no sensitive data stored
3. Test data serialization/deserialization

**Expected Results**:
- Only bet data in localStorage
- No tokens or credentials
- JSON.parse with try/catch

---

**Total Test Cases: 25**
**Categories: 8**
**Estimated Execution Time: 2 hours**
