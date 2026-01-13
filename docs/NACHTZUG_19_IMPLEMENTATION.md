# NACHTZUG 19 – Implementierungsregeln & Agent-Guidelines (v1)

Status: verbindlich
Ziel: Reibungslose Entwicklung ohne Chaos, ohne kaputte Branches, ohne „mystery" als Ausrede für Bugs.

---

## 0) Zielbild (nicht diskutieren)

Wir bauen ein **deterministisches, testbares Interactive-Fiction-System**.

**Trennung ist Pflicht:**
- **Content** = Daten (Szenen/Choices/Effects)
- **Domain/Engine** = Conditions auswerten, Effects anwenden, Graph-Navigation, Validation
- **UI** = Darstellung (Text/Buttons/Status), keine Story-Logik

Wenn diese Trennung gebrochen wird: späteres Debugging wird unendlich teuer.

---

## 1) Harte Canon-Regeln (Story-Systemgesetze)

### R1: Stationen verursachen Drift

Am Kapitelende (Station):
- entweder `memory_drift += 1`
- oder eine definierte „Korrektur" wird im State als Event/Effect erfasst

**Niemals:** Station ohne Konsequenz.

### R2: Kontrollen sind feste Gatepoints

Kontrollen sind **pflichtig** in:
- Kapitel 2 (Kontrolle 1)
- Kapitel 3 (Kontrolle 2)
- Kapitel 5 (Kontrolle 3 Final)

Kontrollen müssen mindestens eine dieser Größen ändern:
- `tickets_*`
- `conductor_attention`
- Beziehung(en)

### R3: Jede Choice hat sichtbare Konsequenzen

Jede Choice muss:
1) mindestens **eine** State-Änderung haben
2) und diese Änderung muss später **sichtbar zurückkommen** (Callback):
   - Dialogvarianten
   - Zugang zu Szenen/Wagen
   - härtere/leichtere Kontrolle
   - Textvariante bei Drift

### R4: Der Zug lügt nicht direkt

Kein plumpes „X ist Y". Nur:
- Bedeutungsverschiebung
- Kontextverdrehung
- Auslassungen / falsche Betonung

---

## 2) Minimal-State Modell (MVP, robust)

Ziel: wenig Variablen, wenig Fehler, maximal kontrollierbar.

### 2.1 Ticket-Counter (0–5)
- `tickets_truth`
- `tickets_escape`
- `tickets_guilt`
- `tickets_love`

### 2.2 Druck/Chaos (0–6)
- `conductor_attention`
- `memory_drift`

### 2.3 Beziehung (optional, aber empfohlen: 1 Wert)
- `rel_comp7` (-2..+4)

### 2.4 Items (max. 2)
- `has_recorder` (bool)
- `has_tag19` (bool)

### 2.5 Meta (debug/test)
- `current_scene_id`
- `history[]` (siehe Logging-Regeln)
- optional: `visited_scene_ids[]` (anti-loop/debug)

**Wichtig:** RPG-Stats wie Mut/Wissen/Empathie sind für MVP deaktiviert (nicht benutzen).

---

## 3) Single Source of Truth (SSOT) für Keys & Ranges

Es gibt **genau eine** zentrale Definition für:
- erlaubte State-Keys
- Wertebereiche (Min/Max)
- erlaubte Effect-Operationen
- erlaubte Condition-Operatoren

**Agent-Regel:**
Keine neuen Keys „mal schnell" erfinden. Keine Schreibvarianten (`conductorAttention` vs `conductor_attention`).
Wenn ein Key fehlt: SSOT erweitern, Validator erweitern, Tests erweitern.

---

## 4) Content-Format (verbindlich, ohne Sonderfälle)

### 4.1 Scene Schema (Pflicht)
- `id` (string, eindeutig)
- `chapter` (number)
- `title` (string)
- `narrative` (string)
- `choices[]` (1–4)
- `tags[]` (z.B. `control`, `station_end`, `reveal`)
- `state_notes[]` (max 3, Callback-Hinweise)

Optional:
- `entry_effects[]`
- `exit_effects[]`

### 4.2 Choice Schema (Pflicht)
- `id`
- `label`
- `effects[]` (mind. 1)
- `next` **oder** `ending`

Optional:
- `condition` (nur über SSOT-Keys und definierte Operatoren)

**No-Go:** Choice ohne Effects.
**No-Go:** UI-spezifische Logik im Content (z.B. „wenn Button blau ist").

---

## 5) Conditions & Effects (Mini-Sprache, validierbar)

### 5.1 Conditions

Erlaubt:
- Vergleiche: `state.tickets_truth >= 2`
- Bool: `state.has_tag19 == true`
- Kombi: `AND/OR` (max 2 Ebenen)

Nicht erlaubt:
- freie Textconditions („wenn Spieler nett war")
- implizite Conditions ohne Ausdruck

### 5.2 Effects

Erlaubt:
- `inc` / `dec`
- `set`
- `clamp`
- optional `note` (nur Logging)

**Engine-Regel:** clamp auf Range immer anwenden.

---

## 6) Domain/Engine – Determinismus (kein UI-Magie)

Alle Kernfunktionen sind **pure** (keine Mutation, keine Seiteneffekte):

- `evaluateCondition(state, condition) -> boolean`
- `applyEffects(state, effects) -> newState`
- `getAvailableChoices(scene, state) -> choices[]`
- `transition(state, scene, choice) -> { newState, nextSceneId | ending }`

**Agent-Regel:** Keine versteckte Mutation im UI.

---

## 7) Content-Validator (Gatekeeper, Pflicht)

Content wird nur geladen/verwendet, wenn Validator grün ist.

Validator muss prüfen:
1) Jede `next`-Referenz existiert.
2) Jede Choice hat `effects`.
3) Keine unbekannten State-Keys in Conditions/Effects.
4) Keine Dead-Ends ohne `ending`.
5) Startszene existiert (manifest).
6) Kapitel 2/3/5 enthalten mindestens eine Szene mit Tag `control`.
7) Szenen mit Tag `station_end` erfüllen Drift/Korrektur-Regel.
8) Optional: Loops ohne Exit (Warnung oder Error).

---

## 8) Logging/History (reproduzierbare Bugs)

Bei jeder Transition wird ein History-Event gespeichert:

Pflichtfelder:
- `timestamp`
- `scene_id`
- `choice_id`
- `delta` (Liste geänderter Keys + Werteänderung)

**Ziel:** „Warum bin ich in Ende C gelandet?" muss nachvollziehbar sein.

---

## 9) Save/Load (früh bauen, nicht später)

MVP Save/Load:
- LocalStorage: `{ save_version, state, current_scene_id, history }`
- `save_version` ist Pflicht, damit Migrationen möglich bleiben.

**Agent-Regel:** Save/Load muss testbar sein.

---

## 10) Debug-Modus (nur Entwickler)

Ein Toggle (z.B. Query-Param oder Settings), der anzeigt:
- aktuellen State
- verfügbare Choices + Condition-Auswertung (warum verfügbar/gesperrt)
- letzte 5 History-Einträge

Ziel: Logikfehler in Minuten finden, nicht in Stunden.

---

## 11) Balancing/Range-Regeln (gegen Explosions-Bugs)

- Tickets: 0..5
- Drift: 0..6
- Attention: 0..6
- Beziehung: feste Range (z.B. -2..+4)
- Items: bool

Empfehlung:
- pro Kapitel max +2 Ticketpunkte insgesamt
- Drift steigt zuverlässig, sinkt selten (max 1–2 definierte Events)

---

## 12) Umsetzungsschritte (Reihenfolge, die funktioniert)

**Diese Reihenfolge ist verbindlich:**
1) SSOT + Validator + deterministic Engine-Funktionen
2) MVP Content Kapitel 1–2 als Daten + Graph funktioniert
3) Save/Load + History + Debug Overlay
4) Kapitel 3–7 + Enden A/B/C
5) Packaging (APK via Capacitor) erst danach

**No-Go Reihenfolgen:**
- erst 7 Kapitel schreiben, dann Engine fixen
- erst UI neu designen, dann Logik bauen
- erst APK Toolchain reinziehen, bevor MVP spielbar ist

---

## KI-AGENTENREGELN (kurz, hart)

### A) Was der Agent darf
- Dateien verschieben/refactoren, solange Tests + Build grün bleiben
- Domain/Validator/SSOT implementieren
- Content-Dateien im vorgegebenen Format erstellen
- README/Docs aktualisieren

### B) Was der Agent nicht darf
- Neue State-Keys ohne SSOT + Validator + Tests
- Story-Logik in UI-Komponenten
- Sonderfälle im Content-Format
- „TODO", „placeholder", „später" in finalen Dateien
- Build/Test brechen und „wird schon" sagen

### C) Definition of Done
- `npm test` grün
- `npm run build` grün
- Validator läuft und blockiert invaliden Content
- Save/Load + History funktionieren
- Debug-Modus zeigt State + Choice-Conditions nachvollziehbar

---

## Anhang: MVP-Checkliste (Kapitel 1–2)

- 10–14 Szenen
- Kontrolle 1 in Kapitel 2
- Station-Ende 1 mit Drift-Änderung
- mindestens 2 sichtbare Callbacks (z.B. falscher Name / Rekorder-Fund)
- ein Gate (z.B. `has_recorder` oder Ticket-Schwelle) als Beweis, dass Conditions/Effekte arbeiten

---

Wenn diese Regeln befolgt werden, läuft die Entwicklung sauber. Wenn nicht, endet es garantiert in untestbarem Branching-Chaos und du debugst Entscheidungen wie ein Schaffner ohne Fahrplan.
