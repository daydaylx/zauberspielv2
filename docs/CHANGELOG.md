# Migration Changelog: Content/Domain/UI Separation

## Datum: 2026-01-13 (Dokumentation Update)

### Dokumentation an NACHTZUG 19 Konzept angepasst

**Grund**: Das Projekt fokussiert sich nun auf das neue Story-Konzept "NACHTZUG 19". Alle Dokumentation wurde aktualisiert, um dies widerzuspiegeln.

#### Änderungen:
- **README.md**: Vollständig überarbeitet
  - Titel und Beschreibung auf NACHTZUG 19 geändert
  - Features beschreiben jetzt NACHTZUG 19 Story-Mechaniken (Tickets, Memory Drift, Kontrollen)
  - Engine-Features hervorgehoben (Content/Domain/UI Separation, deterministische Engine)
  - Content-Format aktualisiert (Scene/Choice Schema, State-Modell, Canon Rules)
  - Legacy-Story "Schattenbibliothek" als Referenz-Implementation markiert

- **ARCHITECTURE.md**: Erweitert
  - Content Layer: NACHTZUG 19 als Haupt-Projekt dokumentiert
  - Neue Struktur für `content/nachtzug19/` hinzugefügt
  - Entwicklungs-Status-Sektion hinzugefügt (Abgeschlossen/In Entwicklung/Geplant)

- **Gelöschte Dateien** (veraltet):
  - `schattenbibliothek_nareth.md` (alte Story, veraltet)
  - `Das Magische Zauberbuch - Vollständige Projektdoku.md` (anderes Projekt, nicht relevant)
  - `Magisches_Zauberbuch_Konzept.md` (anderes Projekt, nicht relevant)

#### Neue Dokumentations-Struktur:
```
docs/
├── NACHTZUG_19_RULES.md    # Canon Rules, Content-Format, Graph-Invarianten
├── CONCEPT_NACHTZUG_19.md  # Story-Konzept (7 Kapitel, Enden, NPCs)
├── ARCHITECTURE.md         # Layer-Architektur
└── CHANGELOG.md            # Dieser Changelog
```

**Status**: ✅ Dokumentation vollständig aktualisiert

---

## Datum: 2026-01-13 (Initiale Migration)

### Grund der Migration
Strukturelle Umorganisation des Projekts, um Story-Content, Game-Engine-Logic und UI-Layer sauber zu trennen. Dies verbessert Wartbarkeit, Testbarkeit und ermöglicht einfacheres Hinzufügen neuer Stories (z.B. "NACHTZUG 19").

---

## Datei-Verschiebungen

### Application Layer
| Alt                    | Neu                      | Grund                                    |
|------------------------|--------------------------|------------------------------------------|
| `src/main.tsx`         | `src/app/main.tsx`       | Entry Point im dedizierten App-Layer    |
| `src/App.tsx`          | `src/app/App.tsx`        | Main Component im App-Layer              |
| `src/index.css`        | `src/app/index.css`      | Globale Styles beim Entry Point          |

### UI Layer
| Alt                    | Neu                      | Grund                                    |
|------------------------|--------------------------|------------------------------------------|
| `src/components/`      | `src/ui/components/`     | UI-Komponenten im dedizierten UI-Layer   |
| `src/layout/`          | `src/ui/layout/`         | Layout-Komponenten im UI-Layer           |
| `src/hooks/`           | `src/ui/hooks/`          | React Hooks im UI-Layer                  |

**Betroffene Dateien**:
- `src/components/StoryView.tsx` → `src/ui/components/StoryView.tsx`
- `src/components/ChoiceList.tsx` → `src/ui/components/ChoiceList.tsx`
- `src/components/EndingView.tsx` → `src/ui/components/EndingView.tsx`
- `src/components/HeaderBar.tsx` → `src/ui/components/HeaderBar.tsx`
- `src/components/StatsBar.tsx` → `src/ui/components/StatsBar.tsx`
- `src/components/OverlayMenu.tsx` → `src/ui/components/OverlayMenu.tsx`
- `src/components/StartScreen.tsx` → `src/ui/components/StartScreen.tsx`
- `src/components/AtmosphereEffects.tsx` → `src/ui/components/AtmosphereEffects.tsx`
- `src/components/TypewriterText.tsx` → `src/ui/components/TypewriterText.tsx`
- `src/components/StoryView.test.tsx` → `src/ui/components/StoryView.test.tsx`
- `src/components/ChoiceList.test.tsx` → `src/ui/components/ChoiceList.test.tsx`
- `src/layout/BookLayout.tsx` → `src/ui/layout/BookLayout.tsx`
- `src/hooks/useTypewriter.ts` → `src/ui/hooks/useTypewriter.ts`

### Domain Layer
| Alt                    | Neu                                | Grund                                    |
|------------------------|------------------------------------|------------------------------------------|
| `src/gameEngine.ts`    | `src/domain/engine/gameEngine.ts`  | Game Logic im Domain-Layer               |
| `gameEngine.test.ts`   | `src/domain/engine/gameEngine.test.ts` | Test beim Code                       |
| `src/types.ts`         | `src/domain/types/index.ts`        | Type Definitions im Domain-Layer         |

### Content Layer
| Alt                    | Neu                                | Grund                                    |
|------------------------|------------------------------------|------------------------------------------|
| `src/storyData.ts`     | `src/content/legacy/storyData.ts`  | Story-Content im Content-Layer           |

---

## Neue Dateien

### Barrel Exports
- `src/domain/engine/index.ts` - Re-export von `gameEngine` für saubere Imports

### Dokumentation
- `docs/CONCEPT_NACHTZUG_19.md` - Vollständiges Konzept der neuen Story "NACHTZUG 19"
- `docs/ARCHITECTURE.md` - Architektur-Dokumentation (Layer-Beschreibung)
- `docs/CHANGELOG.md` - Diese Datei (Migration-Log)

---

## Import-Änderungen

### `index.html`
```diff
- <script type="module" src="/src/main.tsx"></script>
+ <script type="module" src="/src/app/main.tsx"></script>
```

### `src/app/App.tsx`
```diff
- import { gameEngine } from './gameEngine';
- import { GameState } from './types';
- import StoryView from './components/StoryView';
- import { EndingView } from './components/EndingView';
+ import { gameEngine } from '../domain/engine/gameEngine';
+ import { GameState } from '../domain/types';
+ import StoryView from '../ui/components/StoryView';
+ import { EndingView } from '../ui/components/EndingView';
```

### `src/domain/engine/gameEngine.ts`
```diff
- import { GameState, Choice, Scene, Ending } from './types';
- import { scenes, endings, initialStats } from './storyData';
+ import { GameState, Choice, Scene, Ending } from '../types';
+ import { scenes, endings, initialStats } from '../../content/legacy/storyData';
```

### `src/domain/engine/gameEngine.test.ts`
```diff
- import { GameEngine } from './src/gameEngine'
- import { scenes, initialStats } from './src/storyData'
+ import { GameEngine } from './gameEngine'
+ import { scenes, initialStats } from '../../content/legacy/storyData'
```

### Alle UI-Komponenten (`src/ui/components/*.tsx`)
```diff
- import { Scene, Choice, PlayerStats, Flags } from '../types';
+ import { Scene, Choice, PlayerStats, Flags } from '../../domain/types';
```

**Betroffene Komponenten**:
- `StoryView.tsx`
- `ChoiceList.tsx`
- `EndingView.tsx`
- `StatsBar.tsx`
- `AtmosphereEffects.tsx`
- `StoryView.test.tsx`
- `ChoiceList.test.tsx`

---

## Breaking Changes

### Für Entwickler
Alle Imports müssen angepasst werden, wenn direkt auf alte Pfade zugegriffen wird.

**Alte Imports** (funktionieren nicht mehr):
```typescript
import { gameEngine } from './gameEngine'; // ❌
import { GameState } from './types'; // ❌
import { scenes } from './storyData'; // ❌
```

**Neue Imports** (korrekt):
```typescript
// Von App-Layer
import { gameEngine } from '../domain/engine/gameEngine';
import { GameState } from '../domain/types';

// Von UI-Layer
import { Scene } from '../../domain/types';

// Von Domain-Layer
import { scenes } from '../../content/legacy/storyData';
```

### Build & Test
- Keine Breaking Changes für Build-Prozess (Vite konfiguriert via `index.html`)
- Vitest findet Tests weiterhin automatisch (`**/*.test.ts(x)`)
- Keine Änderungen an `package.json` oder `vite.config.ts` notwendig

---

## Nicht-Änderungen

**Unverändert bleiben**:
- `package.json` (Dependencies, Scripts)
- `vite.config.ts` (Build-Konfiguration)
- `tailwind.config.js` (Styling)
- `tsconfig.json` (TypeScript-Konfiguration)
- Alle Story-Daten in `storyData.ts` (nur Pfad geändert)
- Alle Komponenten-Funktionalität (nur Imports geändert)

---

## Validierung

Nach der Migration wurden folgende Checks durchgeführt:

- ✅ `npm test` - Alle Tests laufen
- ✅ `npm run build` - Build erfolgreich
- ✅ `npm run dev` - Dev-Server startet
- ✅ Keine ungelösten Imports
- ✅ Keine TypeScript-Fehler

---

## Nächste Schritte (außerhalb des Scope)

1. **Story-Implementierung**: `NACHTZUG 19` in `src/content/nachtzug19/` umsetzen
2. **Content-Loader**: Dynamisches Story-Wechseln implementieren
3. **Story-Validierung**: Schema-basierte Validierung für Story-Daten

---

**Migration durchgeführt**: 2026-01-13
**Durchgeführt von**: Automated Refactoring Script
**Status**: ✅ Abgeschlossen, alle Tests grün
