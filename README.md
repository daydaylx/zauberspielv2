# 🚂 NACHTZUG 19

**Ein immersives psychologisches Mystery-Adventure als Interactive Fiction Engine.**

> "Der Zug hält an Stationen, die es nicht gibt. Nach jedem Halt verändert sich ein Detail deiner Erinnerung."

Dieses Projekt ist eine **deterministische, testbare Interactive Fiction (IF) Engine**, die mit React, TypeScript und Vite gebaut wurde. Die Engine ist story-agnostisch und basiert auf strikter **Content/Domain/UI Separation** – konzipiert für komplexe, verzweigte Narratives mit spürbaren Konsequenzen.

---

## ✨ Features

### Story: NACHTZUG 19
- **Psychologisches Mystery**: Ein Zug, der offiziell nicht existiert. Stationen ohne Namen. Erinnerungen, die sich verändern.
- **Ticket-System**: Sammle keine Gegenstände, sondern Entscheidungsmuster (Wahrheit, Flucht, Schuld, Liebe), die bestimmen, welche Wagen sich öffnen.
- **Memory Drift**: Nach jeder Station verändert sich ein Detail – Namen, Gesichter, Erinnerungen kippen subtil.
- **Harte Regeln**: Der Zug lügt nie direkt. Kontrollen in Kapitel 2, 3, 5. Jede Entscheidung hat sichtbare Rückwirkung (Callback-Regel).
- **Beziehungen**: NPCs mit eigener Agenda. Vertrauen aufbauen oder Distanz wahren – beides hat Konsequenzen.
- **7 Kapitel**: Vollständig implementiert mit ~24–27 Szenen pro Kapitel, ~30–35 Minuten Spielzeit je Kapitel.

### Engine-Features
- **Deterministische Story-Engine**: Szenen als typisierte Daten, keine UI-Logik in Content.
- **Content/Domain/UI Separation**: Framework-agnostische Game-Engine, austauschbarer Content.
- **State-System**: Stats (Mut, Wissen, Empathie), Tickets (truth/escape/guilt/love), Druck (conductor_attention, memory_drift), Beziehungen (rel_comp7, rel_boy, rel_sleepless).
- **Condition & Effects System**: Validierbare Mini-Sprache für Branches und State-Änderungen.
- **Graph-Validierung**: Automatische Prüfung auf Dead-Ends, fehlende Referenzen, Regel-Verstöße (`validateContent.ts`).
- **Content-Audit**: Automatisches Reporting zu Spielzeit, Szenenzahl, Wortanzahl (`scripts/audit_chapters.mjs`).
- **Debug-Tools**: Integrierter Debug Player (`src/ui/debug/DebugPlayer.tsx`) für Content-Entwicklung.
- **Responsives UI**: Buch-Layout, Typewriter-Effekt, Atmosphären-Modi (normal, danger, mystic, somber).
- **Qualitätssicherung**: Umfassende Testabdeckung mit Vitest, TypeScript Strict Mode.

---

## 🚀 Installation & Start

Stelle sicher, dass [Node.js](https://nodejs.org/) installiert ist.

```bash
# Repository klonen
git clone https://github.com/daydaylx/Nachtzug19.git
cd Nachtzug19

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Das Spiel ist nun unter `http://localhost:5173` erreichbar.

---

## 🛠️ Entwicklungs-Workflow

### Kommandos

```bash
# Entwicklungsserver starten
npm run dev

# Production Build erstellen
npm run build

# Production Build lokal testen
npm run preview

# Alle Tests ausführen
npm test

# Tests einmal ausführen (CI-Mode)
npm test -- run
```

### Content-Entwicklung

```bash
# Content-Audit für Kapitel 1-5 (Spielzeit-Analyse)
node scripts/audit_chapters.mjs

# Debug Player im Browser nutzen:
# → Startet automatisch mit `npm run dev`
# → Zugriff über UI (siehe src/ui/debug/DebugPlayer.tsx)
```

Der **Audit-Script** zeigt:
- Szenenzahl (Ziel: 22–28)
- Choice-Anzahl (Ziel: 30–45)
- Wortanzahl (Ziel: 5.000–6.500)
- Geschätzte Spielzeit (Ziel: 30–35 Minuten)
- Prüfung der Canon Rules (station_end, control Tags)

---

## 🛠️ Projektstruktur

Das Projekt folgt einer **Content/Domain/UI Separation** für bessere Wartbarkeit und Skalierbarkeit.

```
src/
├── app/                    # Application Entry Point
│   ├── main.tsx           # Vite Entry Point
│   ├── App.tsx            # Main App Component
│   └── index.css          # Global Styles
│
├── ui/                     # User Interface Layer
│   ├── components/        # UI-Komponenten (StoryView, ChoiceList, StatsBar...)
│   ├── layout/            # Layout-Wrapper (BookLayout)
│   ├── hooks/             # React Hooks (useTypewriter)
│   └── debug/             # Debug Tools (DebugPlayer)
│
├── domain/                 # Business Logic (Framework-agnostic)
│   ├── engine/            # Game Engine
│   │   ├── gameEngine.ts      # Core State Management & Logic
│   │   ├── validateContent.ts # Content-Validierung (Graph-Invarianten)
│   │   ├── loadStory.ts       # Story-Loader
│   │   └── gameEngine.test.ts # Engine Tests
│   └── types/             # TypeScript Definitionen
│
└── content/                # Story Content & Data
    └── nachtzug19/        # 🚂 NACHTZUG 19 (7 Kapitel)
        ├── manifest.ts    # Kapitelübersicht + Einstieg
        └── scenes/        # Szenen nach Kapiteln organisiert
            ├── c1.ts      # Kapitel 1: Leerer Bahnsteig (24 Szenen)
            ├── c2.ts      # Kapitel 2: Die erste Kontrolle (25 Szenen)
            ├── c3.ts      # Kapitel 3: Wagen 7 (27 Szenen)
            ├── c4.ts      # Kapitel 4: Spiegelungen (26 Szenen)
            ├── c5.ts      # Kapitel 5: Die letzte Kontrolle (25 Szenen)
            ├── c6.ts      # Kapitel 6: Ende der Linie (26 Szenen)
            └── c7.ts      # Kapitel 7: Entscheidung (26 Szenen)

docs/
├── INDEX.md                        # Dokumentations-Übersicht (Lesereihenfolge)
├── NACHTZUG_19_RULES.md            # Content-Format, Canon Rules, Validierung
├── NACHTZUG_19_LENGTH_IMMERSION_SPEC.md  # Spielzeit-Ziele, Szenen-Anforderungen
├── CONCEPT_NACHTZUG_19.md          # Story-Konzept (7 Kapitel + Enden)
├── ARCHITECTURE.md                 # Layer-Architektur (Content/Domain/UI)
└── CHANGELOG.md                    # Migrations-Historie

scripts/
└── audit_chapters.mjs              # Content-Audit (Spielzeit, Regeln)
```

📘 **Mehr Details**: Siehe `docs/INDEX.md` für die empfohlene Lesereihenfolge.

---

## 📖 Story-Engine: Content-Format

Die Engine trennt strikt **Content** (Daten) von **Logic** (Engine). Content wird in TypeScript als typisierte Daten-Strukturen definiert.

> **Vollständige Content-Regeln**: Siehe `docs/NACHTZUG_19_RULES.md` für das verbindliche Format.

### Grundschema: Scene

```typescript
{
  id: "c1_s01_platform",           // Eindeutige ID
  chapter: 1,                       // Kapitel 1-7
  title: "Leerer Bahnsteig",       // Kurztitel
  narrative: "Der Bahnsteig ist leer. Kein Mensch...",  // 3-12 Absätze
  choices: [ /* ... */ ],           // 1-4 Choices
  tags: ["station_end"],            // Optional: station_end, control, reveal, drift_variant
  state_notes: ["Bahnsteigname wird später geglitcht"]  // Max 3 Callback-Hinweise
}
```

### Grundschema: Choice

```typescript
{
  id: "wait",                       // Lokal eindeutig
  label: "Warten",                  // Button-Text
  condition: "state.wissen >= 3",   // Optional: Bedingung (validierbar)
  effects: [                        // Mindestens 1 Effect
    { type: "inc", target: "wissen", value: 1 },
    { type: "set", target: "has_tag19", value: true }
  ],
  next: "c1_s02_train_appears"      // Nächste Szene (oder "ending": "A")
}
```

### State-Modell (NACHTZUG 19)

```typescript
{
  // Stats (0-10)
  mut: 5, wissen: 3, empathie: 4,

  // Tickets (0-5) - Entscheidungsmuster
  tickets_truth: 0, tickets_escape: 0, tickets_guilt: 0, tickets_love: 0,

  // Druck/Chaos (0-6)
  conductor_attention: 0,  // Je höher, desto härter die Kontrollen
  memory_drift: 0,         // Ab 3: Textvarianten mit falschen Details

  // Beziehungen (-2 bis +4)
  rel_comp7: 0, rel_boy: 0, rel_sleepless: 0,

  // Items (boolean)
  has_recorder: false, has_tag19: false, photo_anomaly: false
}
```

### Canon Rules (NACHTZUG 19)

1. **R1: Drift nach Station** – Jede Station erhöht `memory_drift` oder triggert eine Korrektur.
2. **R2: Kontrollen in Kap. 2, 3, 5** – Immer feste Gatepoints, verändern mindestens eine State-Variable.
3. **R3: Jede Choice hat Rückwirkung** – Keine Choice ohne Effect + sichtbaren Callback später.
4. **R4: Der Zug lügt nicht direkt** – Bedeutungsverschiebung, nicht plumpe Falschaussagen.

📘 **Mehr Details**:
- **Content-Format & Validierung**: `docs/NACHTZUG_19_RULES.md`
- **Spielzeit & Szenen-Requirements**: `docs/NACHTZUG_19_LENGTH_IMMERSION_SPEC.md`

---

## 🧪 Testing

Das Projekt nutzt **Vitest** für Unit- und Integrationstests.

```bash
# Alle Tests einmalig ausführen
npm test -- run

# Watch-Mode (bei Entwicklung)
npm test
```

Die Tests decken ab:
- **GameEngine**: State-Management, Choice Processing, Szenen-Navigation (`domain/engine/gameEngine.test.ts`)
- **Content-Validierung**: Graph-Invarianten, fehlende Referenzen, Regel-Verstöße (`domain/engine/validateContent.ts`)
- **UI-Komponenten**: Render-Tests mit React Testing Library (`ui/components/*.test.tsx`)

---

## 📦 Deployment

Das Projekt ist eine statische Web-App und kann überall gehostet werden (Vercel, Netlify, GitHub Pages).

```bash
npm run build
```

Dies erstellt einen `dist/` Ordner mit den optimierten Dateien.

---

## 📝 Lizenz

Dieses Projekt wurde als private Interactive Fiction Engine erstellt.
**Code**: MIT License.
**Story & Inhalt**: Copyright beim Autor.
