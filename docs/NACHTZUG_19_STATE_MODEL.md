# NACHTZUG 19 – Simplified State Model (v1)

Status: Final (für MVP)
Ziel: Weniger Komplexität, weniger Fehlerquellen, trotzdem echte Konsequenzen.

---

## 1) Warum ein State-Modell trotzdem nötig ist

Ohne State gibt es keine sauberen Konsequenzen. Dann bleibt nur:
- linearer Text mit „weiter"-Buttons, oder
- Branching-Chaos ohne Regeln, das nach 10 Entscheidungen unwartbar wird.

Das Konzept **lebt** von wiederkehrenden Effekten:
- Kontrollen werden härter,
- Erinnerungen kippen (Drift),
- bestimmte Wagen/Infos werden nur unter Bedingungen erreichbar,
- Beziehungen verändern Dialoge/Enden.

Das ist ohne State nicht "einfacher", sondern "nicht umsetzbar".

---

## 2) Was wir bewusst streichen (um es stabil zu halten)

### Entfernt
- **Mut / Wissen / Empathie** (RPG-Stats)

Begründung:
- schwer zu balancen
- KI macht bei Checks gern Mist (unpassende Schwellen, widersprüchliche Anforderungen)
- wirkt oft künstlich („Warum ist das jetzt Wissen 3?")
- für Mystery ist es nicht nötig

Ersatz:
- Entscheidungen formen stattdessen **Ticket-Muster + Druck + Drift + Beziehung**
- das passt thematisch besser und ist deutlich robuster

---

## 3) Minimaler State für NACHTZUG 19 (MVP-tauglich)

### 3.1 Ticket-Counter (0–5)

Diese vier Werte sind der Kern. Sie definieren „warum" du im Zug bist.
- `tickets_truth`  (Wahrheit)
- `tickets_escape` (Flucht)
- `tickets_guilt`  (Schuld)
- `tickets_love`   (Liebe)

**Regel:** Jede relevante Entscheidung muss mindestens *einen* Ticket-Wert beeinflussen.

---

### 3.2 Druck / Chaos (0–6)

Diese zwei Werte steuern Eskalation und Textvarianten.
- `conductor_attention` (Aufmerksamkeit des Schaffners)
- `memory_drift` (Erinnerungsverschiebung)

**Warum wichtig:**
- `conductor_attention` macht Kontrollen messbar härter
- `memory_drift` sorgt dafür, dass Stationen echte Folgen haben (Text kippt / Details ändern sich)

---

### 3.3 Beziehung (optional, aber empfehlenswert: 1 Wert)

Für „Abteil 7" reicht ein einziger Relationship-Wert.
- `rel_comp7` (Frau Abteil 7) **Range: -2 bis +4**

**Regel:** Romance/Bindung ist nur sinnvoll, wenn sie Plot & Enden beeinflusst. Sonst weglassen.

---

### 3.4 Items (max. 2, sonst wird's Sammelmist)

- `has_recorder` (Kassettenrekorder) – bool
- `has_tag19` (Schlüsselanhänger „19") – bool

Items dienen nur als:
- **Gate-Öffner** (Wagon 12)
- **Joker** (1x Aussage fixieren / Tür öffnen)

---

## 4) Default State (Startwerte)

Empfohlene Startwerte:
- `tickets_truth = 0`
- `tickets_escape = 0`
- `tickets_guilt = 0`
- `tickets_love = 0`
- `conductor_attention = 0`
- `memory_drift = 0`
- `rel_comp7 = 0`
- `has_recorder = false`
- `has_tag19 = false`

---

## 5) Harte Canon-Regeln (nicht verhandelbar)

### R1: Stationen verursachen Drift

Am Ende jedes Kapitels mit Station:
- entweder `memory_drift += 1`
- oder eine definierte „Korrektur" wird als Effect im State markiert (aber trotzdem *konsequent*).

**MVP-Empfehlung:** Immer `memory_drift += 1`. Einfach, zuverlässig, testbar.

---

### R2: Kontrollen sind feste Gatepoints

Kontrollen passieren immer in:
- Kapitel 2 (Kontrolle 1)
- Kapitel 3 (Kontrolle 2)
- Kapitel 5 (Kontrolle 3 Final)

**Kontrollen müssen** mindestens einen dieser Werte verändern:
- Tickets (mind. 1)
- `conductor_attention`
- `rel_comp7`

---

### R3: Jede Choice muss Folgen haben

Jede Choice muss:
1) mindestens **eine** State-Variable verändern
2) und später sichtbar zurückkommen (Callback)

Beispiele für Callbacks:
- andere Dialogzeile bei hoher Aufmerksamkeit
- Zugang zu Wagon 12 nur bei `has_tag19` oder „Wahrheit"-Pfad
- Abteil 7 reagiert anders bei `rel_comp7` hoch/niedrig
- bei Drift kippt ein Detail im Text wiederkehrend

---

### R4: Der Zug lügt nicht direkt

Der Text darf irritieren, aber nicht plump falsch sein.
Statt „X ist Y" gilt:
- Bedeutung verschieben
- Kontext verdrehen
- Auslassungen nutzen

---

## 6) Content-Format (vereinfacht, KI-sicher)

### 6.1 Scene Schema

Pflicht:
- `id`
- `chapter`
- `title`
- `narrative`
- `choices[]`
- `tags[]` (z.B. `control`, `station_end`)
- `state_notes[]` (max 3 Callback-Hinweise)

Optional:
- `entry_effects[]`
- `exit_effects[]`

---

### 6.2 Choice Schema

Pflicht:
- `id`
- `label`
- `effects[]` (mind. 1)
- `next` (Scene-ID) **oder** `ending` (A/B/C)

Optional:
- `condition` (z.B. `tickets_truth >= 1`, `rel_comp7 >= 2`, `has_tag19 == true`)

---

## 7) Welche Checks sind erlaubt (ohne Stats)

### Erlaubt
- Ticket-Schwellen: `tickets_truth >= 3`
- Aufmerksamkeit: `conductor_attention <= 3`
- Drift-Schwellen: `memory_drift >= 3` (Text kippt)
- Beziehung: `rel_comp7 >= 2`
- Items: `has_tag19 == true`

### Nicht erlaubt
- freie, weiche Checks wie „wenn Spieler nett war"
- neue Variablen spontan erfinden („mood", „karma", „luck")

---

## 8) MVP-Scope (damit es nicht eskaliert)

Erster spielbarer Meilenstein:
- **Kapitel 1–2** komplett spielbar
- **Kontrolle 1** integriert
- **Station-Ende** mit `memory_drift += 1`
- max. 10–14 Szenen insgesamt
- mind. 2 Callbacks sichtbar

Erst wenn das funktioniert und Spaß macht:
- Kapitel 3 (Abteil 7 + Kontrolle 2)
- Kapitel 5 (Finale Kontrolle)
- Kapitel 6A/6B Split
- Enden A/B/C

---

## 9) Test-Regeln (damit es nicht kaputtgeht)

Mindestens diese Validierungen für Content:
1) `next`-Scene existiert
2) keine Choice ohne `effects`
3) keine unknown Variables in conditions/effects
4) Szenen mit `tag: station_end` erhöhen Drift (oder definierte Korrektur)
5) Kapitel 2/3/5 enthalten eine `control`-Szene

---

## 10) Kurzfazit

- State ist Pflicht, sonst keine Konsequenzen.
- RPG-Stats (Mut/Wissen/Empathie) sind optional und fürs MVP eher Ballast.
- Minimal-State mit Tickets + Attention + Drift + 1 Beziehung + 2 Items ist:
  - stabil
  - KI-freundlich
  - thematisch passend
  - testbar

Damit bekommst du ein Spiel, das sich nicht nach „Text mit Buttons" anfühlt, ohne dass du dir ein komplexes Balancing-System ans Bein bindest.
