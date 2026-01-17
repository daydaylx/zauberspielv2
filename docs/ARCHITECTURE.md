# Projekt-Architektur: Content/Domain/UI Separation

## Überblick

Dieses Projekt folgt dem Prinzip der **Separation of Concerns** mit einer klaren Trennung zwischen Story-Content, Game-Logic (Domain) und User-Interface.

## Ordnerstruktur

```
src/
├── app/                    # Application Shell & Entry Point
│   ├── main.tsx           # Vite Entry Point (React Root)
│   ├── App.tsx            # Main App Component (State & Routing)
│   └── index.css          # Global Styles
│
├── ui/                     # User Interface Layer (React)
│   ├── components/        # Reusable UI Components
│   │   ├── StoryView.tsx
│   │   ├── ChoiceList.tsx
│   │   ├── EndingView.tsx
│   │   ├── HeaderBar.tsx
│   │   ├── StatsBar.tsx
│   │   ├── OverlayMenu.tsx
│   │   ├── StartScreen.tsx
│   │   ├── AtmosphereEffects.tsx
│   │   ├── TypewriterText.tsx
│   │   ├── DebugOverlay.tsx
│   │   └── *.test.tsx     # Component Tests
│   │
│   ├── layout/            # Layout Components
│   │   └── BookLayout.tsx
│   │
│   ├── hooks/             # React Hooks
│   │   └── useTypewriter.ts
│   │
│   └── debug/             # Debug Tools
│       └── DebugPlayer.tsx
│
├── domain/                 # Business Logic (Framework-agnostic)
│   ├── engine/            # Game Engine
│   │   ├── gameEngine.ts      # Core Game Logic
│   │   ├── validateContent.ts # Content Validation (Graph Invariants)
│   │   ├── loadStory.ts       # Story Loader
│   │   ├── gameEngine.test.ts # Engine Tests
│   │   └── index.ts           # Barrel Export
│   │
│   └── types/             # TypeScript Type Definitions
│       └── index.ts       # All Game Types
│
└── content/                # Story Content & Data
    └── nachtzug19/        # 🚂 NACHTZUG 19 (Main Story)
        ├── manifest.ts    # Chapter Overview + Entry Point
        └── scenes/        # Scenes organized by chapter
            ├── c1.ts      # Chapter 1: Leerer Bahnsteig (24 scenes)
            ├── c2.ts      # Chapter 2: Die erste Kontrolle (25 scenes)
            ├── c3.ts      # Chapter 3: Wagen 7 (27 scenes)
            ├── c4.ts      # Chapter 4: Spiegelungen (26 scenes)
            ├── c5.ts      # Chapter 5: Die letzte Kontrolle (25 scenes)
            ├── c6.ts      # Chapter 6: Ende der Linie (26 scenes)
            └── c7.ts      # Chapter 7: Entscheidung (26 scenes)
```

## Layer-Verantwortlichkeiten

### 1. App Layer (`src/app/`)
**Zweck**: Application Bootstrap & High-Level State Management

- Entry Point für Vite/React
- Globale State-Container (Game State, Settings, View-Routing)
- Keine Business Logic

**Dependencies**:
- `domain/engine` (Game Engine)
- `domain/types` (Type Definitions)
- `ui/components` (UI Components)

---

### 2. UI Layer (`src/ui/`)
**Zweck**: Präsentation & User Interaction

- **Komponenten** sind reine View-Logic (Props in, Events out)
- Keine direkte Story-Daten-Manipulation
- Alle Komponenten sind testbar (`.test.tsx`)
- React-spezifisch (Hooks, JSX, Component Lifecycle)

**Dependencies**:
- `domain/types` (für Type Safety)
- Keine Abhängigkeit zu `domain/engine` oder `content/`

**Design-Prinzipien**:
- Controlled Components (State kommt von außen)
- Event-basierte Kommunikation (`onMakeChoice`, `onRestart`)
- Conditional Rendering basiert auf Props, nicht auf internem State

**Debug-Tools**:
- `ui/debug/DebugPlayer.tsx` – Entwicklungs-Tool für Content-Entwicklung (State-Inspektion, Szenen-Navigation)

---

### 3. Domain Layer (`src/domain/`)
**Zweck**: Framework-agnostische Game Logic

#### 3.1 Engine (`domain/engine/`)
- **`gameEngine.ts`**: Core Game Loop
  - State Management (GameState)
  - Choice Processing (Stats, Flags, Inventory)
  - Scene Transitions
  - Save/Load Logic
  - Observer Pattern (Subscribe/Notify)

- **`validateContent.ts`**: Content Validation
  - Graph-Invarianten (keine Dead-Ends, fehlende Referenzen)
  - Canon Rules Prüfung (station_end, control, callbacks)
  - Schema-Validierung für Scenes/Choices

- **`loadStory.ts`**: Story Loader
  - Dynamisches Story-Wechseln (zukünftig)
  - Content-Import-Verwaltung

- **`index.ts`**: Barrel Export für saubere Imports

**Wichtig**:
- Keine React-Imports
- Keine UI-Logik
- Pure TypeScript/JavaScript
- Testbar ohne DOM (Vitest)

#### 3.2 Types (`domain/types/`)
- **`index.ts`**: Alle TypeScript-Typen
  - `GameState`, `Scene`, `Choice`, `Ending`
  - `PlayerStats`, `Flags`, `Manifest`, `Effect`, `Condition`
  - Type Guards & Utilities

**Shared across all layers** (App, UI, Domain, Content)

---

### 4. Content Layer (`src/content/`)
**Zweck**: Story-Daten, Kapitel, Szenen, Dialoge

#### 4.1 NACHTZUG 19 (`content/nachtzug19/`) – **Main Project**
Story-Implementation nach strikten Canon Rules (siehe `NACHTZUG_19_RULES.md`):

```
content/nachtzug19/
├── manifest.ts       # Kapitelübersicht, Einstiegsszene, Initial State
└── scenes/           # Szenen organisiert nach Kapiteln
    ├── c1.ts         # Kapitel 1: Der Bahnsteig ohne Name (24 Szenen)
    ├── c2.ts         # Kapitel 2: Die Fahrkarten (25 Szenen)
    ├── c3.ts         # Kapitel 3: Wagen 7 (27 Szenen)
    ├── c4.ts         # Kapitel 4: Spiegelungen (26 Szenen)
    ├── c5.ts         # Kapitel 5: Die letzte Kontrolle (25 Szenen)
    ├── c6.ts         # Kapitel 6: Ende der Linie (26 Szenen)
    └── c7.ts         # Kapitel 7: Endstation (26 Szenen)
```

**Wichtig**:
- Keine Engine-Logik (nur Daten)
- Keine UI-Komponenten
- Exportiert plain Objects/Arrays
- Validierung durch `validateContent.ts` (siehe Abschnitt 7 in `NACHTZUG_19_RULES.md`)

---

## Dependency Flow

```
┌─────────────────────────────────────────┐
│           app/ (main.tsx, App.tsx)      │
│                                         │
│  Imports: domain/engine, domain/types,  │
│           ui/components                 │
└─────────────────────────────────────────┘
              │                 │
              ▼                 ▼
┌──────────────────┐   ┌──────────────────┐
│   domain/engine  │   │   ui/components  │
│                  │   │                  │
│  Imports:        │   │  Imports:        │
│  - domain/types  │   │  - domain/types  │
│  - content/*     │   │  - ui/hooks      │
└──────────────────┘   │  - ui/layout     │
              │        └──────────────────┘
              ▼
┌──────────────────┐
│content/nachtzug19│
│                  │
│  Imports: NONE   │
│  (pure data)     │
└──────────────────┘
```

**Regel**:
- Untere Layer kennen obere Layer NICHT
- `content/` hat KEINE Imports (nur Exports)
- `domain/` importiert NICHT von `ui/` oder `app/`
- `ui/` importiert NICHT von `app/` oder `domain/engine`

---

## Begründung der Struktur

### Warum diese Trennung?

1. **Testbarkeit**:
   - Domain-Logik testbar ohne Browser/DOM
   - UI-Komponenten testbar mit React Testing Library
   - Content-Daten einfach validierbar

2. **Wartbarkeit**:
   - Story-Änderungen berühren keine Engine
   - Engine-Optimierungen berühren kein UI
   - UI-Redesigns berühren keine Logik

3. **Austauschbarkeit**:
   - Story kann gewechselt werden
   - UI-Framework könnte gewechselt werden (React → Vue)
   - Engine könnte für andere Projekte wiederverwendet werden

4. **Skalierbarkeit**:
   - Neue Stories einfach hinzufügen (`content/new_story/`)
   - Multiple UI-Themes möglich (`ui/themes/`)
   - Engine-Erweiterungen isoliert (`domain/engine/plugins/`)

---

## Import-Patterns

### ✅ Gut
```typescript
// App.tsx
import { gameEngine } from '../domain/engine';
import { GameState } from '../domain/types';
import StoryView from '../ui/components/StoryView';

// StoryView.tsx
import { Scene, Choice } from '../../domain/types';

// gameEngine.ts
import { GameState, Scene } from '../types';
import { chapter1Scenes } from '../../content/nachtzug19/scenes/c1';
```

### ❌ Schlecht
```typescript
// NIEMALS: UI importiert Engine direkt
import { gameEngine } from '../../domain/engine'; // ❌

// NIEMALS: Domain importiert UI
import { StoryView } from '../../ui/components/StoryView'; // ❌

// NIEMALS: Content importiert irgendetwas
import { GameEngine } from '../../domain/engine'; // ❌
```

---

## Testing-Strategie

### Unit Tests
- **Domain**: `gameEngine.test.ts` (Vitest, keine DOM-Dependencies)
- **UI**: `*.test.tsx` (Vitest + React Testing Library)

### Integration Tests
- App-Level: Game Flow (Start → Choice → Ending)

### Content Validation
- Schema-Validation für Content (siehe `validateContent.ts`)
- Graph-Invarianten: Alle `next`-Referenzen existieren, keine Dead-Ends ohne `ending`, etc.
- Canon Rules: station_end vorhanden, control in Kap. 2/3/5, etc.

### Content Audit
- **Script**: `scripts/audit_chapters.mjs`
- Prüft: Szenenzahl, Wortanzahl, Spielzeit-Schätzung, Canon Rules
- Zielwerte: 22–28 Szenen, 5.000–6.500 Wörter, 30–35 Minuten Spielzeit pro Kapitel

---

## Migration-Hinweise

### Alte Struktur → Neue Struktur
- `src/gameEngine.ts` → `src/domain/engine/gameEngine.ts`
- `src/types.ts` → `src/domain/types/index.ts`
- `src/components/` → `src/ui/components/`
- `src/layout/` → `src/ui/layout/`
- `src/hooks/` → `src/ui/hooks/`
- `src/App.tsx` → `src/app/App.tsx`
- `src/main.tsx` → `src/app/main.tsx`

Siehe `docs/CHANGELOG.md` für Details.

---

## Entwicklungs-Status

### ✅ Abgeschlossen
- Content/Domain/UI Separation implementiert
- Game Engine mit Stats, Tickets, Pressure, Relations
- UI-Komponenten (Book Layout, Typewriter, Atmosphere Effects)
- Debug Player für Content-Entwicklung (`ui/debug/DebugPlayer.tsx`)
- Test-Setup (Vitest)
- **NACHTZUG 19: Alle 7 Kapitel vollständig implementiert** (~179 Szenen, ~12.000 Zeilen Content)

### 🚧 In Arbeit
- Graph-Validierung für vollständigen Content-Graph (Kapitel 1–7)
- Drift-Mechanik: Textvarianten ab `memory_drift >= 3`
- Callback-Validierung (jede Choice hat späteres Echo)

### 📋 Geplant
1. **Content-Erweiterung**:
   - Drift-Textvarianten für alle Kapitel
   - UI-Glitches ab `memory_drift >= 5`

2. **Engine-Erweiterungen**:
   - Condition-Parser (erweiterte Syntax für komplexe Bedingungen)
   - Content-Loader für dynamisches Story-Wechseln

3. **Testing**:
   - Story-Path-Tests (alle Enden erreichbar?)
   - Performance-Tests für große Content-Graphen

---

**Architektur-Version**: 1.1
**Letzte Änderung**: 2026-01-17
**Autor**: Content/Domain/UI Separation Migration
