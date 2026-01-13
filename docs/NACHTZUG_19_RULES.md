# NACHTZUG 19 – Projektregeln, Struktur & Grundskelett (v1)

> Ziel: Eine **sauber trennbare**, **deterministische** und **testbare** Interactive-Fiction-Basis, die sich später problemlos mit Content füttern lässt (auch per KI), ohne dass dir bei jeder Änderung alles auseinanderfällt.

---

## 1) Zielbild

Du baust kein „Text mit Buttons", sondern ein **deterministisches, testbares Interactive-Fiction-System**:

- **Content** ist Daten (Szenen/Choices/Effects), nicht React-Komponenten.
- **Domain/Engine** wertet Conditions aus, wendet Effects an, navigiert im Graph.
- **UI** zeigt Zustand und Texte an, ohne Story-Logik zu besitzen.

Wenn du diese Trennung nicht einhältst, wirst du später:
- Bugs nicht reproduzieren können,
- Story-Branches verlieren,
- und „kleine Änderungen" werden dir alles zerlegen.

---

## 2) Harte Spielregeln (Canon Rules)

Diese Regeln sind nicht „nice to have", sondern **Systemgesetze**.

### R1: Stationen verursachen Drift
Nach jedem Kapitelabschluss (Station):
- entweder `memory_drift += 1`
- oder es passiert eine definierte „Korrektur" (z.B. Detail kippt, Beziehung verschiebt sich), die im State als Event markiert wird.

**Niemals:** Station ohne Konsequenz.

### R2: Kontrollen sind feste Gatepoints
Kontrollen passieren immer in:
- Kapitel 2 (Kontrolle 1)
- Kapitel 3 (Kontrolle 2)
- Kapitel 5 (Kontrolle 3 final)

Kontrollen müssen mindestens eine dieser Größen verändern:
- `tickets_*`
- `conductor_attention`
- eine Beziehung

### R3: Entscheidungen brauchen sichtbare Rückwirkung
Jede Choice muss:
1. mindestens **eine** State-Änderung haben (Effect),
2. und diese Änderung muss später sichtbar zurückkommen (Callback), z.B.:
   - Dialogzeile,
   - Zugang zu Szene/Wagen,
   - härtere/leichtere Kontrolle,
   - Textvariante bei Drift.

Wenn du das nicht durchziehst: Spiel fühlt sich fake an.

### R4: Der Zug lügt nicht direkt
Texte dürfen widersprüchlich wirken, aber nicht plump falsch. Statt „Der Zug sagt X, aber es ist Y" gilt:
- Bedeutungsverschiebung,
- Auslassungen,
- falsche Betonung,
- falscher Kontext.

---

## 3) Projektstruktur (Ordner-Skelett)

Nach der Umstrukturierung sollte es so aussehen:

### `src/domain/`
Alles, was Spielzustand und Regeln betrifft.

- `types/`
  - State (Stats, Flags, Beziehungen)
  - Scene/Choice Datentypen
  - Effect/Condition Typen
- `engine/`
  - `evaluateCondition`
  - `applyEffects`
  - `getAvailableChoices`
  - `transitionToNextScene`
  - `validateContentGraph` (Domain-Validation, nicht UI)
- optional: `reducers/` oder `stateMachine/` (je nach Architektur)

### `src/content/`
Nur Daten.

- `legacy/` (alte Story unverändert als Referenz)
- `nightzug19/`
  - `manifest` (Kapitelübersicht + Einstiegsszene)
  - `scenes/` (Einzelszenen oder Kapiteldateien)
  - `text_variants/` (Drift-Varianten optional)

### `src/ui/`
Nur Darstellung.

- `components/` (Chat, Choice Buttons, Status Pills)
- `layout/` (Screens, Shell)

**Wichtig:** keinerlei Story-Conditions, keinerlei Effect-Logik.

### `docs/`
- `CONCEPT_NACHTZUG_19.md`
- `ARCHITECTURE.md` (warum die Struktur so ist)
- `CONTENT_FORMAT.md` (Regeln + Format, damit niemand improvisiert)

---

## 4) Content-Format (Grundschema)

Das ist der wichtigste Teil. Hier gewinnt oder verliert das ganze Projekt.

### 4.1 Scene (Pflichtfelder)
Jede Szene besteht aus:

- `id` (string, eindeutig)
- `chapter` (1–7)
- `title` (kurz)
- `narrative` (Text, 3–12 Absätze)
- `choices[]` (mind. 1, max. 4)
- `tags[]` (z.B. `station_end`, `control`, `reveal`, `drift_variant`)
- `state_notes[]` (max 3 Callback-Hinweise, damit man später nichts vergisst)

Optional:
- `entry_effects[]` (Effects beim Betreten)
- `exit_effects[]` (Effects beim Verlassen, z.B. Station -> Drift)

### 4.2 Choice (Pflichtfelder)
Jede Choice:

- `id` (lokal eindeutig in Szene)
- `label` (Buttontext)
- `condition` (optional; wenn nicht erfüllt, Choice verstecken oder disabled)
- `effects[]` (mind. 1)
- `next` (id der nächsten Szene) **oder** `ending` (A/B/C)

Optional:
- `check` (Statcheck wie Mut/Wissen/Empathie)
  - `stat`
  - `min`
  - `on_fail_next` (oder Fail-Effects)

**Regel:** Es gibt keine „Choice ohne Konsequenz".

---

## 5) State-Modell (einheitlich, keine wilden Flags)

### 5.1 Stats (numerisch)
- `mut` (0–10)
- `wissen` (0–10)
- `empathie` (0–10)

### 5.2 Tickets (0–5)
- `tickets_truth`
- `tickets_escape`
- `tickets_guilt`
- `tickets_love`

### 5.3 Druck/Chaos (0–6)
- `conductor_attention`
- `memory_drift`

### 5.4 Beziehungen
- `rel_comp7` (-2..+4)
- `rel_boy` (-2..+3)
- `rel_sleepless` (-2..+3)

### 5.5 Items / Hinweise (bool)
- `has_recorder`
- `has_tag19`
- `photo_anomaly`

### 5.6 Meta
- `current_scene_id`
- `visited_scene_ids[]` (Debug/Anti-Loops)
- `chapter_index` / `station_count`
- `history[]` (log: scene_id + choice_id + delta)

**Regel:** Alle Variablen existieren von Anfang an (mit Default). Kein „plötzlich taucht flag_x auf".

---

## 6) Conditions & Effects (Mini-Sprache, damit KI nichts erfindet)

Du brauchst eine kleine, klare Grammatik, damit Content validierbar wird.

### 6.1 Conditions (Beispiele als Regeln)
- Vergleiche: `state.wissen >= 3`
- Bool: `state.has_tag19 == true`
- Kombi: `AND/OR` (max 2 Ebenen verschachteln)

**Regel:** Keine freien Text-Conditions wie „wenn Spieler nett war".

### 6.2 Effects (nur diese Operationen)
- `inc` / `dec` (z.B. `memory_drift +1`)
- `set` (bool oder feste Zahl)
- `clamp` (Werte in Range halten)
- optional: `note` (Log-Eintrag)

**Regel:** Engine clamp't alles auf erlaubte Ranges.

---

## 7) Graph-Invarianten (damit dein Content nicht kaputt ist)

Dein Validator muss prüfen:

1. Jede `next`-Referenz existiert.
2. Jede Szene ist vom Start aus erreichbar (oder bewusst als `secret` markiert).
3. Keine Dead-Ends ohne `ending`.
4. Keine Choice ohne `effects`.
5. Keine unbekannten Variablen in Conditions/Effects.
6. Station-Ende-Regel erfüllt: Wenn `tags` enthält `station_end`, dann muss Drift/Korrektur passieren.
7. Kontrollen-Regel erfüllt: Kapitel 2/3/5 enthalten mindestens eine Scene mit Tag `control`.

Wenn auch nur einer davon bricht, ist das keine „kreative Freiheit", sondern ein Bug.

---

## 8) Grundskelett des Contents (Minimal-MVP)

Damit du nicht sofort wieder in „alles auf einmal" abrutschst:

### MVP Ziel
Kapitel 1–2 komplett spielbar mit:
- Einstiegsszene
- 10–14 Szenen insgesamt
- Kontrolle 1 (Kapitel 2)
- Station-Ende 1 (Drift)
- mindestens 2 sichtbare Callbacks (z.B. falscher Name in Durchsage + Rekorder-Fund)

### Kapitel 1 (Szenen grob)
- `c1_s01_platform`
- `c1_s02_train_appears`
- `c1_s03_entry_or_run`
- `c1_s04_sleepless_intro`
- `c1_end_station_tagged`

### Kapitel 2
- `c2_s01_ticket_found`
- `c2_s02_boy_recorder`
- `c2_s03_announcement`
- `c2_control_01`
- `c2_end_station_tagged`

**Wichtig:** Erst wenn das „spielt" und sich gut anfühlt, kommt Kapitel 3.

---

## 9) Schreib-Workflow mit KI (damit's nicht generisch wird)

Du verwendest KI nicht als „Autor", sondern als Textarbeiter unter Zwangsjacke:

1. Du gibst Szene-Ziel + State-Startwerte + erlaubte Choices + Canon Rules.
2. KI liefert Szene im festen Format (Scene + Choices + Effects).
3. Linter/QA (zweite KI oder Validator) prüft:
   - unbekannte Flags,
   - fehlende Effects,
   - Rule breaks (Drift/Kontrolle/Callbacks).
4. Du editierst 10–20%: Rhythmus, Details, Dialogschärfe.

Wenn du Schritt 2 ohne Schritt 3 machst, kannst du dir das Debugging gleich als Hobby zulegen.

---

## 10) Do / Don't Kurzliste

### Do
- Wenige Figuren, starke Funktion.
- Konkrete Details pro Absatz.
- Foreshadowing statt Twist-Orgie.
- Jede Choice hat spürbaren Preis.

### Don't
- „Mystery" als Ausrede für fehlende Logik.
- Choices, die nur den Text variieren.
- Neue Variablen erfinden, weil es gerade passt.
- 7 Kapitel schreiben, bevor Kapitel 1–2 überhaupt Spaß machen.

---

Wenn du dich an dieses Skelett hältst, bekommst du ein System, das KI gut befüllen kann und das trotzdem nicht wie AI-Einheitsbrei wirkt, weil Regeln und Konsequenzen das Ganze zwingen, Sinn zu ergeben.
