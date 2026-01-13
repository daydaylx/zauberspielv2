# 🌑 Die Schattenbibliothek von Nareth

**Ein immersives Text-Adventure basierend auf modernen Web-Technologien.**

> "Tinte ist das Blut der Realität. Wir schreiben die Welt neu."

Dieses Projekt ist eine Interactive Fiction (IF) Engine, die mit React, TypeScript und Vite gebaut wurde. Sie bietet ein responsives Buch-Layout, eine Typerwriter-Animation, Inventar-Management und ein komplexes Entscheidungssystem mit Stats, Flags und bedingter Logik.

## ✨ Features

*   **Dynamische Story-Engine:** Szenen basieren auf JSON-Strukturen, komplett typisiert mit TypeScript.
*   **Stat-System:** Verfolgt Mut, Wissen und Empathie des Spielers.
*   **Konsequenzen:** Entscheidungen setzen "Flags", die den späteren Spielverlauf, Dialoge und Enden massiv beeinflussen (z.B. Loyalität von Gefährten, befreite Geister).
*   **Inventar-System:** Sammle Gegenstände und setze sie strategisch ein (oder opfere sie).
*   **Atmosphärisches UI:**
    *   Animiertes Buch-Layout.
    *   Typewriter-Effekt für Texte.
    *   Visuelles Feedback für Belohnungen.
    *   Responsive Design (Mobile & Desktop).
*   **Qualitätssicherung:** Umfassende Testabdeckung mit Vitest und automatisierte CI/CD-Pipeline via GitHub Actions.

---

## 🚀 Installation & Start

Stelle sicher, dass [Node.js](https://nodejs.org/) installiert ist.

```bash
# Repository klonen
git clone https://github.com/daydaylx/zauberspielv2.git
cd zauberspielv2

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Das Spiel ist nun unter `http://localhost:5173` erreichbar.

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
│   └── hooks/             # React Hooks (useTypewriter)
│
├── domain/                 # Business Logic (Framework-agnostic)
│   ├── engine/            # Game Engine (Zustandsverwaltung, Choice Processing)
│   └── types/             # TypeScript Definitionen
│
└── content/                # Story Content & Data
    └── legacy/            # 📖 Aktuelle Story: "Die Schattenbibliothek von Nareth"
        └── storyData.ts   # Szenen, Entscheidungen, Texte, Enden

docs/
├── ARCHITECTURE.md         # Detaillierte Architektur-Dokumentation
├── CONCEPT_NACHTZUG_19.md  # Konzept für neue Story "NACHTZUG 19"
└── CHANGELOG.md            # Migrations-Historie
```

📘 **Mehr Details**: Siehe `docs/ARCHITECTURE.md` für die vollständige Layer-Beschreibung.

---

## 📖 Story-Engine: Wie man Inhalte hinzufügt

Die gesamte Geschichte wird in `src/content/legacy/storyData.ts` definiert. Es sind keine Programmierkenntnisse nötig, um Texte zu ändern, aber TypeScript hilft dabei, Fehler zu vermeiden.

> **Neue Story-Konzepte**: Für zukünftige Stories (z.B. "NACHTZUG 19") siehe `docs/CONCEPT_NACHTZUG_19.md`.

### Aufbau einer Szene

Eine Szene sieht so aus:

```typescript
"SZENE_ID": {
  id: "SZENE_ID",
  kapitel: "Kapitel 1",
  titel: "Der Titel der Seite",
  atmosphere: "mystic", // Steuert visuelle Effekte (normal, danger, mystic, somber)
  beschreibung: "Der Text, der erzählt wird...",
  choices: [
    // Liste der Entscheidungen
  ]
}
```

### Aufbau einer Entscheidung (Choice)

Entscheidungen sind das Herzstück. Sie können Bedingungen haben und Werte ändern.

```typescript
{
  text: "Die Tür eintreten (Mut)",
  
  // Wohin geht es?
  naechsteSzeneId: "RAUM_DAHINTER",
  
  // Was ändert sich am Charakter?
  werteAenderung: { mut: 1, wissen: -1 },
  
  // Was passiert in der Welt? (Flags setzen)
  flagsAenderung: { door_broken: true },
  
  // Inventar: Belohnung oder Verlust
  itemBelohnung: "Splitterholz",
  itemVerlust: "Alter Schlüssel",
  
  // Bedingung: Wann ist diese Option sichtbar?
  condition: (stats, flags, inventory) => stats.mut >= 5 || inventory.includes("Axt")
}
```

### Wichtige Story-Konzepte

1.  **Stats:** Mut, Wissen, Empathie. Diese öffnen oft spezielle Pfade (z.B. kann man Geister nur mit hoher Empathie verstehen).
2.  **Flags:** Booleans (Ja/Nein), die speichern, was passiert ist (z.B. `geist_befreit: true`).
3.  **Items:** Werden als Strings im Inventar gespeichert. `itemVerlust` entfernt sie wieder (z.B. beim Opfern eines Gegenstandes).

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
*   **GameEngine:** Prüft, ob Stats korrekt berechnet werden, Inventar-Items hinzugefügt/entfernt werden und Szenenwechsel funktionieren.
*   **UI:** Prüft, ob Komponenten korrekt rendern (z.B. ob Item-Icons angezeigt werden).
*   **Story-Pfade:** Spezielle Tests verifizieren, dass komplexe Story-Zweige (wie das "Gute Ende" oder Geheimnisse) technisch erreichbar sind.

## 📦 Deployment

Das Projekt ist eine statische Web-App und kann überall gehostet werden (Vercel, Netlify, GitHub Pages).

```bash
npm run build
```

Dies erstellt einen `dist/` Ordner mit den optimierten Dateien.

---

## 📝 Lizenz

Dieses Projekt wurde als private Interactive Fiction Engine erstellt. 
Code: MIT License.
Story & Inhalt: Copyright beim Autor.
