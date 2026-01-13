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
│   │   └── *.test.tsx     # Component Tests
│   │
│   ├── layout/            # Layout Components
│   │   └── BookLayout.tsx
│   │
│   └── hooks/             # React Hooks
│       └── useTypewriter.ts
│
├── domain/                 # Business Logic (Framework-agnostic)
│   ├── engine/            # Game Engine
│   │   ├── gameEngine.ts  # Core Game Logic
│   │   ├── gameEngine.test.ts
│   │   └── index.ts       # Barrel Export
│   │
│   └── types/             # TypeScript Type Definitions
│       └── index.ts       # All Game Types
│
└── content/                # Story Content & Data
    └── legacy/            # Current Story (Schattenbibliothek)
        └── storyData.ts   # Scenes, Endings, Initial Stats
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

- **`index.ts`**: Barrel Export für saubere Imports

**Wichtig**:
- Keine React-Imports
- Keine UI-Logik
- Pure TypeScript/JavaScript
- Testbar ohne DOM (Vitest)

#### 3.2 Types (`domain/types/`)
- **`index.ts`**: Alle TypeScript-Typen
  - `GameState`, `Scene`, `Choice`, `Ending`
  - `PlayerStats`, `Flags`
  - Type Guards & Utilities

**Shared across all layers** (App, UI, Domain, Content)

---

### 4. Content Layer (`src/content/`)
**Zweck**: Story-Daten, Kapitel, Szenen, Dialoge

#### 4.1 Legacy (`content/legacy/`)
- **`storyData.ts`**: Aktuelle Story (Schattenbibliothek von Nareth)
  - Scene Definitions
  - Endings
  - Initial Stats

**Zukünftig**:
```
content/
├── legacy/           # Alte Story (bleibt spielbar)
├── nachtzug19/       # Neue Story (siehe CONCEPT_NACHTZUG_19.md)
│   ├── chapters/
│   ├── scenes/
│   └── endings/
└── shared/           # Wiederverwendbare Content-Utilities
```

**Wichtig**:
- Keine Engine-Logik (nur Daten)
- Keine UI-Komponenten
- Exportiert plain Objects/Arrays

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
│   content/legacy │
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
   - Story kann gewechselt werden (legacy → nachtzug19)
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
import { scenes } from '../../content/legacy/storyData';
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
- Schema-Validation für `storyData.ts` (sicherstellen, dass alle `naechsteSzeneId` existieren)

---

## Migration-Hinweise

### Alte Struktur → Neue Struktur
- `src/gameEngine.ts` → `src/domain/engine/gameEngine.ts`
- `src/types.ts` → `src/domain/types/index.ts`
- `src/storyData.ts` → `src/content/legacy/storyData.ts`
- `src/components/` → `src/ui/components/`
- `src/layout/` → `src/ui/layout/`
- `src/hooks/` → `src/ui/hooks/`
- `src/App.tsx` → `src/app/App.tsx`
- `src/main.tsx` → `src/app/main.tsx`

Siehe `docs/CHANGELOG.md` für Details.

---

## Nächste Schritte (außerhalb des Scope)

1. **Story-System generalisieren**:
   - `domain/engine` sollte Story-agnostisch werden
   - Content-Loader für dynamisches Story-Wechseln

2. **Content-Validierung**:
   - Schema für Scenes/Choices/Endings
   - Automatische Tests für Story-Konsistenz

3. **Plugin-System**:
   - Custom Effects (Audio, Visual)
   - Conditional Logic Extensions

---

**Architektur-Version**: 1.0
**Letzte Änderung**: 2026-01-13
**Autor**: Refactoring-Migration (Content/Domain/UI Separation)
