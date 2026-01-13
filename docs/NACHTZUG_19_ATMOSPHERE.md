# NACHTZUG 19 – Atmosphere Layer (2D) – Agent Rules & Implementation Spec (v1)

Status: verbindlich
Ziel: Atmosphäre deutlich erhöhen, ohne neue Komplexitäts-Hölle (kein 3D, kein Movement-Overkill, kein UI-Logic-Müll).

---

## 1) Scope (was genau gebaut wird)

### MVP-Atmosphere Layer umfasst:

1) **Backdrops (2D) pro Szene**
   - Szene kann optional ein `backdrop` (Asset-Key) definieren.

2) **Hotspots (2D) als optionale Interaktionsebene**
   - Klick-/Tap-Bereiche auf dem Backdrop, die entweder:
     - eine Szene wechseln (`goto`)
     - oder eine bestehende Choice auslösen (`choice`)

3) **Cinematic Overlays (minimal)**
   - optional: Filmkorn/Gradient/leichtes Flicker als CSS-Overlay (nicht WebGL)

4) **Optional (MVP+): Ambient Sound**
   - 1 Loop (Zugrasseln) + 1–2 One-shots (Tür/Announcement)
   - Lautstärke-Regler + Mute

### Nicht im Scope (No-Go)
- Kein echtes Movement-System (kein WASD, keine Kollision, keine Physik)
- Keine 3D-Assets, keine WebGL-Scene
- Keine „Mini-Game"-Mechaniken
- Keine neue Story-Logik in UI
- Keine dynamischen Shader/Postprocessing
- Keine riesige Asset-Pipeline, kein Editor

---

## 2) Grundprinzip (Trennung bleibt heilig)

- **Domain/Engine** bleibt der einzige Ort, der Story-State und Logik verarbeitet.
- **Atmosphere Layer** ist reine Darstellung + optionaler Input, der nur:
  - `enterScene(sceneId)` oder
  - `choose(choiceId)` auslöst

**Agent-Regel:** Hotspots dürfen keine Effects ausführen. Effekte laufen ausschließlich über Choices/Engine.

---

## 3) Content Contract (verbindliches Datenformat)

Backdrops/Hotspots sind optional pro Scene.

### 3.1 Scene-Erweiterung (optional)

- `backdrop?: string`
  Asset-Key, z.B. `"train_corridor_01"`

- `hotspots?: Hotspot[]`

### 3.2 Hotspot Schema (verbindlich)

```ts
type Hotspot = {
  id: string;                           // eindeutig in Szene
  label: string;                        // für Accessibility + Tooltip
  rect: [number, number, number, number]; // [x,y,w,h] in RELATIV (0..1)
  action:
    | { type: "goto"; sceneId: string }
    | { type: "choice"; choiceId: string };
  visibleIf?: Condition;                // optional, nur aus SSOT-Condition-Sprache
};
```

**Wichtig:**
- `rect` ist relativ (0..1), nicht Pixel, damit responsive/touch sauber bleibt.
- `visibleIf` nutzt die bestehende Condition-Sprache (keine neuen Operatoren).
- Hotspots dürfen existierende Choices nur triggern, nicht ersetzen.

---

## 4) UI-Komponenten (minimal, sauber)

Neue/angepasste UI-Bausteine (Beispielnamen):

### 4.1 SceneBackdrop

Rendert Hintergrundbild anhand `scene.backdrop`

Fallback: neutrales Gradient / Default Background, wenn kein Backdrop gesetzt

Keine Logik, nur Anzeige

### 4.2 HotspotLayer

Rendert hotspots als invisible Buttons (oder leicht markiert im Debug)

OnTap:
- `goto`: ruft `enterScene(sceneId)`
- `choice`: ruft `choose(choiceId)` (wenn Choice verfügbar ist)

Hotspots, die auf eine Choice zeigen, müssen prüfen:
- Choice existiert in aktueller Scene
- Choice ist verfügbar (condition == true)
- sonst: disabled / hidden (konfigurierbar)

### 4.3 CinematicOverlay

CSS-Layer: Gradient top/bottom + optional Filmkorn (PNG overlay) + optional Flicker

Flicker nur via CSS animation (opacity), keine Canvas/WebGL Effekte

### 4.4 (Optional) AmbientAudio

1 Loop Track + 1–2 One-shots

Settings: volume 0..1, mute boolean

Keine Auto-Play-Fehler: Audio startet erst nach User Interaction (Tap), sonst mobile Browser blocken.

---

## 5) Debug Mode (Pflicht für Entwicklung)

Im Debug-Modus werden Hotspots sichtbar:
- Rahmen + Label
- Anzeige der Action (goto/choice)
- Anzeige von `visibleIf` Ergebnis

**Regel:** Debug Mode darf keinen Einfluss auf Spielstate haben.

---

## 6) Performance-Regeln (Mobile First)

Backdrops komprimieren (WebP/AVIF wenn möglich), Zielgröße:
- ~200–600 KB pro Bild (realistisch)

Keine großen Video-Hintergründe im MVP

Overlays als statische PNGs + CSS animation

Kein Render-Loop, kein requestAnimationFrame-Dauerfeuer

---

## 7) Accessibility / UX Regeln

Alle Hotspots sind echte Buttons (keyboard-focusable)

`aria-label = label`

Touch: Mindestfläche ~44px (über relative rect sicherstellen)

Optional: Tooltip nur im Desktop, nicht zwingend im MVP

---

## 8) Integrationsregeln (Engine bleibt King)

### 8.1 Trigger-Regeln

Hotspot `goto` darf nur `enterScene(sceneId)` auslösen.

Hotspot `choice` darf nur `choose(choiceId)` auslösen.

**No-Go:** Hotspots, die direkt `applyEffects` aufrufen.

### 8.2 State-Sichtbarkeit

UI darf State anzeigen (z.B. Drift/Attention), aber nicht verändern.

---

## 9) Tests (Minimum)

Mindestens folgende Tests/Checks müssen existieren:

### 9.1 Content Validation Erweiterung

- `scene.backdrop` Key existiert in Asset-Map (optional warning/error, definieren)
- Jede `hotspot.action.goto.sceneId` existiert
- Jede `hotspot.action.choice.choiceId` existiert in `scene.choices`
- `rect` Werte müssen in 0..1 liegen, w/h > 0

### 9.2 UI Smoke Test

- Render einer Szene mit Backdrop + Hotspots bricht nicht
- Klick auf Hotspot ruft den richtigen Handler auf

---

## 10) Definition of Done (Atmosphere Layer)

- Backdrop wird pro Scene angezeigt (oder Default-Fallback)
- Hotspots funktionieren (goto/choice)
- Debug Mode zeigt Hotspots sichtbar
- Validator prüft Hotspot-Referenzen und rect-Ranges
- `npm test` grün, `npm run build` grün
- Keine Story-Logik in UI hinzugefügt

---

## KI-AGENTENREGELN (kurz, hart)

### A) Der Agent darf

- Scene Typ um `backdrop` und `hotspots` erweitern
- UI-Komponenten für Backdrop/Hotspots/Overlay bauen
- Validator um Hotspot-Checks erweitern
- Minimal-Assets hinzufügen (1–2 Backdrops + Grain Overlay)
- Debug Mode Visualisierung implementieren

### B) Der Agent darf NICHT

- ein Movement-System bauen
- WebGL/Three.js einbauen
- Hotspots zu eigener Story-Logik machen (direkte Effects)
- neue State-Keys einführen
- „TODO/Placeholder" in finalen Dateien lassen
- Tests/Build brechen

### C) Abnahmekriterien

- Backdrop + Hotspots funktionieren auf Mobile (Tap) und Desktop (Click)
- Hotspots sind responsive korrekt positioniert (relative rect 0..1)
- Debug Mode funktioniert
- Validator blockiert invaliden Hotspot-Content
- App bleibt deterministisch (State nur über Engine/Choices)

---

## Appendix: Recommended MVP Assets

- `train_corridor_01.webp` (Gang, neutral)
- `grain_overlay.png` (feines Filmkorn)
- optional: `train_rumble.mp3` (leise Loop)

---

Wenn du mehr willst: erst nachdem Kapitel 1–2 als Content wirklich spielbar sind. Alles andere ist nur hübsch scheitern.
