# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**NACHTZUG 19** is a deterministic, testable Interactive Fiction (IF) engine built with React, TypeScript, and Vite. The project implements strict **Content/Domain/UI Separation** for maintainable, branching narratives with meaningful consequences.

This is a psychological mystery adventure where a train that doesn't officially exist carries passengers through stations without names, and memories drift with each stop.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run all tests
npm test

# Run tests in watch mode
npm test

# Run tests once (CI mode)
npm test -- run

# Preview production build
npm run preview
```

## Architecture: Three-Layer Separation

The codebase enforces strict layer boundaries. **Never violate these import rules:**

### Layer 1: Content (`src/content/`)
- **Purpose**: Story data only (scenes, choices, effects)
- **Exports**: Plain TypeScript objects/arrays
- **Imports**: NONE (pure data)
- **Never**: Import from domain, ui, or app

### Layer 2: Domain (`src/domain/`)
- **Purpose**: Framework-agnostic game logic
- **Imports**: Only `domain/types` and `content/*`
- **Never**: Import from `ui/` or `app/`
- **Key files**:
  - `domain/engine/gameEngine.ts` - State management, choice processing
  - `domain/types/index.ts` - All TypeScript definitions

### Layer 3: UI (`src/ui/`)
- **Purpose**: React components for presentation
- **Imports**: Only `domain/types` and `ui/*`
- **Never**: Import from `domain/engine`, `content/`, or `app/`

### Layer 4: App (`src/app/`)
- **Purpose**: Application bootstrap and high-level state
- **Imports**: All layers (orchestration layer)

## State Model (NACHTZUG 19)

The game uses a specific state structure defined in `src/domain/types/index.ts`:

```typescript
GameState {
  stats: { mut, wissen, empathie }           // Legacy (0-10)
  tickets: { truth, escape, guilt, love }    // Decision patterns (0-5)
  pressure: { conductor_attention, memory_drift }  // (0-6)
  relations: { rel_comp7, rel_boy, rel_sleepless } // (-2 to +4)
  items: { has_recorder, has_tag19, photo_anomaly } // boolean
}
```

## Content Format (Canon Rules)

All story content must follow `docs/NACHTZUG_19_RULES.md`:

### Scene Structure
```typescript
{
  id: "c1_s01_platform",        // Unique ID
  chapter: 1,                    // 1-7
  title: "Platform Title",       // Short
  narrative: "3-12 paragraphs",  // Main text
  choices: [],                   // 1-4 choices
  tags: ["station_end"],         // Optional markers
  state_notes: []                // Max 3 callback hints
}
```

### Choice Structure
```typescript
{
  id: "wait",                    // Local ID
  label: "Wait",                 // Button text
  condition: "state.wissen >= 3", // Optional
  effects: [                     // Minimum 1 effect
    { type: "inc", target: "wissen", value: 1 }
  ],
  next: "c1_s02_next_scene"      // OR ending: "A"
}
```

### Mandatory Canon Rules

**R1: Drift After Stations** - Every chapter end increases `memory_drift` or triggers correction
**R2: Controls at Chapters 2, 3, 5** - Fixed gatepoints that modify state
**R3: Every Choice Has Callback** - No choice without visible consequence later
**R4: Train Never Lies Directly** - Meaning shifts, not false statements

## Content Validation

Before committing new scenes:

1. Every `next` reference must exist
2. No dead-ends without `ending`
3. Every choice must have at least one `effect`
4. No unknown state variables in conditions/effects
5. Station endings must trigger drift/correction
6. Chapters 2, 3, 5 must contain control scenes

See `src/domain/engine/validateContent.ts` for automated checks.

## Writing New Content

When adding scenes to `src/content/nachtzug19/scenes/`:

1. **Never invent new state variables** - Use only those in `domain/types/index.ts`
2. **Follow the playtime spec** - See `docs/NACHTZUG_19_LENGTH_IMMERSION_SPEC.md`:
   - Target: 30-35 minutes per chapter
   - ~22-28 scenes per chapter
   - ~5,000-6,500 words per chapter
3. **Include atmosphere** - Each scene needs sensory anchors (sound/light/temperature)
4. **Mix scene types**:
   - 3-5 atmosphere/interlude scenes (mood, no heavy plot)
   - 10-16 standard scenes (dialogue + decision)
   - 2-4 set-piece scenes (controls, revelations)

## Testing Strategy

- **Domain tests**: `src/domain/engine/*.test.ts` (no DOM dependencies)
- **UI tests**: `src/ui/components/*.test.tsx` (React Testing Library)
- **TypeScript**: Strict mode enabled (`tsconfig.json`)

When modifying game engine logic, update corresponding tests immediately.

## File Organization

```
src/
├── app/                          # React entry point
├── ui/
│   ├── components/              # React components
│   ├── layout/                  # Layout wrappers
│   └── hooks/                   # React hooks
├── domain/
│   ├── engine/                  # Game state & logic
│   │   ├── gameEngine.ts
│   │   ├── validateContent.ts
│   │   └── loadStory.ts
│   └── types/                   # TypeScript definitions
└── content/
    ├── legacy/                  # Reference implementation
    └── nachtzug19/              # Main story
        ├── manifest.ts          # Chapter overview
        └── scenes/              # Scene files by chapter
            ├── c1.ts
            ├── c2.ts
            └── ...
```

## Key Documentation

- `docs/NACHTZUG_19_RULES.md` - Content format & validation rules (READ THIS FIRST)
- `docs/CONCEPT_NACHTZUG_19.md` - Complete story concept (7 chapters + endings)
- `docs/ARCHITECTURE.md` - Layer architecture rationale
- `docs/NACHTZUG_19_LENGTH_IMMERSION_SPEC.md` - Playtime targets & scene requirements

## Common Pitfalls to Avoid

1. **Don't create new state variables** without updating `domain/types/index.ts` first
2. **Don't skip effects** - Every choice must modify state
3. **Don't violate layer boundaries** - UI never imports from engine
4. **Don't break the graph** - Run validation before committing content
5. **Don't rush chapters** - Target is 30-35 minutes, not 15 minutes
6. **Don't add generic content** - Each scene needs sensory details and "moments"

## Current Development Status

- ✅ Engine: Complete with stats, tickets, pressure, relations
- ✅ UI: Book layout, typewriter effect, atmosphere modes
- ✅ Chapter 1: 30-35 minute playtime achieved
- ✅ Chapter 2: 30-35 minute playtime achieved
- 🚧 Chapters 3-7: In development
- 🚧 Drift mechanics: Text variants at `memory_drift >= 3`
- 📋 Full graph validation: Planned
