# NACHTZUG 19 – Konzept & Szenenplan

## 1) Elevator Pitch

Du steigst nachts in einen Zug, der offiziell nicht existiert. Er hält an Stationen, die es nicht gibt. Nach jedem Halt verändert sich ein Detail deiner Erinnerung. Der Schaffner fragt nie „wer", sondern nur „warum". Du sammelst keine Gegenstände um des Sammelns willen, sondern „Tickets": Entscheidungsmuster (Wahrheit, Flucht, Schuld, Liebe), die bestimmen, welche Wagen sich öffnen und welches Ende du bekommst.

## 2) Genre / Ton / Versprechen

- **Genre**: Mystery / Psycho-Thriller / leise Romance (optional)
- **Ton**: spannend, melancholisch, konkret, wenig Pathos, keine Fantasy-Schulklischees
- **Versprechen**: klare Regeln, spürbare Konsequenzen, faire Hinweise statt Twist-Gewitter

## 3) Weltregeln (die NIE gebrochen werden)

1. **Der Zug lügt nie direkt.** Er verschiebt Bedeutungen.
2. **Nach jeder Station passiert eine „Erinnerungs-Korrektur"** (memory drift steigt oder ein Detail kippt).
3. **Kontrollen passieren in Kapitel 2, 3 und 5** (klein → mittel → final).
4. **Der Schaffner fragt nicht nach Identität, sondern nach Motivation** („warum").
5. **Entscheidungen müssen später sichtbar zurückkommen** (Callback-Regel).

## 4) Spiellogik: Variablen / Flags / Beziehungen

### 4.1 Stats (vorhanden)
- `mut` (Courage, Willenskraft)
- `wissen` (Erkenntnis, Verständnis)
- `empathie` (Verbindung, Mitgefühl)

### 4.2 Ticket-Counter (0–5)
- `tickets_truth`: Ehrlichkeit, Selbsterkenntnis
- `tickets_escape`: Flucht, Vermeidung
- `tickets_guilt`: Schuld, Verantwortung
- `tickets_love`: Bindung, Beziehung

### 4.3 Druck/Chaos (0–6)
- `conductor_attention`: je höher, desto härter Kontrollen / weniger Spielraum
- `memory_drift`: je höher, desto mehr Details/Namen kippen, Textvarianten werden „falsch"

### 4.4 Beziehungen
- `rel_comp7` (Frau Abteil 7): -2 bis +4
- `rel_boy` (Kassetten-Junge): -2 bis +3
- `rel_sleepless` (Schlafloser): -2 bis +3

### 4.5 Item-Flags (optional, sparsam)
- `has_recorder`: Kassettenrekorder
- `has_tag19`: Schlüsselanhänger „19"
- `photo_anomaly`: Foto-Hinweis erkannt

## 5) Kapitelplan (7 Kapitel)

### Kapitel 1: Der Bahnsteig ohne Name

**Zweck**: Hook, Zug-Logik, erster Regelkontakt.
**Neue Regel**: Der Zug erscheint nur ohne Zeugen.

**Szenen**:

**1.1 Leerer Bahnsteig**
- **Choice A**: Warten → `wissen +1`, `conductor_attention +1`
- **Choice B**: Gehen → `mut +1`
- **Choice C**: Kaffee/Rauchen → `memory_drift +1` (Spiegelbild reagiert „zu spät")

**1.2 Einstieg**
- **Choice A**: Einsteigen → `tickets_escape +1`
- **Choice B**: Näher ran, nicht einsteigen → `wissen +1`, `conductor_attention +1`
- **Choice C**: Wegrennen → du bist wieder am Gleis → `memory_drift +1`, `mut -1`

**1.3 Schlafloser**
- **Choice A**: Reden (`empathie >=2`) → `rel_sleepless +1`, Regel-Tipp: „Sag nie dein Ziel zuerst."
- **Choice B**: Ignorieren → `tickets_truth +1`, `rel_sleepless -1`

**Kapitelende**: erster Textglitch (Bahnsteigname wechselt).

---

### Kapitel 2: Die Fahrkarten, die du nicht gekauft hast

**Zweck**: Ticket-System, Kassetten-Junge, Kontrolle 1.
**Neue Regel**: Ticket existiert immer, Ziel „RÜCKFAHRT".

**Szenen**:

**2.1 Ticket finden**
- **Wegwerfen** → kommt wieder → `memory_drift +1`
- **Markieren/Einreißen** → `conductor_attention +1`
- **Studieren** → `wissen +1` (versteckter Code)

**2.2 Kassetten-Junge**
- **Anhören** → `tickets_truth +1`, `memory_drift +1`, `rel_boy +1`
- **Stoppen** → `mut +1`, `rel_boy -1`
- **Rekorder nehmen** (`mut >=3`):
  - **Erfolg**: `has_recorder=true`
  - **Fail**: `conductor_attention +1`

**2.3 Durchsage**: Name minimal falsch (Anagramm-Hinweis bei `wissen>=2`)

**KONTROLLE 1**: „Warum sind Sie hier?"
- **„Ich will nach Hause."** → `tickets_escape +1`, `conductor_attention +1`
- **„Ich suche jemanden."** → `tickets_love +1`, `conductor_attention 0`
- **(wenn `tickets_truth>=1`)** „Ich weiß es nicht." → `tickets_truth +1`, `conductor_attention -1`

**Kapitelende**: Station 1 → `memory_drift +1`, Detail aus Kap.1 kippt.

---

### Kapitel 3: Abteil 7

**Zweck**: emotionaler Anker + Beziehung + Mystery-Fakten, Kontrolle 2.

**Szenen**:

**3.1 Begegnung**
- **„Wir kennen uns nicht."** → `tickets_truth +1`, `rel_comp7 -1`, `memory_drift +1`
- **„Tut mir leid."** → `empathie +1`, `rel_comp7 +1`, `tickets_guilt +1`
- **Mitspielen** → `tickets_escape +1`, `rel_comp7 +1`, `conductor_attention +1`

**3.2 Foto**
- **(`wissen>=3`)** Spiegelung zeigt anderen Zugnamen → `photo_anomaly=true`

**3.3 Nähe/Misstrauen**
- **Echte Erinnerung** (`empathie>=3`) → `rel_comp7 +2`, `tickets_love +1`, `memory_drift -1`
- **Ausweichen** → `tickets_escape +1`, `rel_comp7 -1`
- **Zur Rede stellen** (`mut>=3`):
  - **Erfolg**: „Kontrolle"-Hinweis
  - **Fail**: `rel_comp7 -2`

**KONTROLLE 2**: „Name des Zielortes?"
- **„Rückfahrt."** → `tickets_truth +1`, `conductor_attention +1`
- **„Nächste raus."** → `tickets_escape +1`, `conductor_attention +2`
- **(wenn `rel_comp7>=2`)** Sie antwortet → `tickets_love +1`, `conductor_attention -1`

**Kapitelende**: Station 2 → `memory_drift +1`, ab `drift>=3`: Körperdetail kippt (Narbe/Ring etc.).

---

### Kapitel 4: Station „Rückfahrt"

**Zweck**: Reality-Check, Preis der „Heimkehr".

**Szenen**:

**4.1 Türen öffnen** (Alltag leicht falsch)
- **Rausgehen** → `tickets_escape +1`, `conductor_attention +1`
- **Drinbleiben** → `tickets_truth +1`, `mut -1`
- **Nur schauen** → `wissen +1`, `memory_drift +1`

**4.2 „Falscher" Mensch**
- **Ansprechen** (`empathie>=3`):
  - **Erfolg**: `memory_drift -1`
  - **Fail**: `tickets_guilt +1`
- **Beobachten** → `wissen +1`, Hinweis auf „19"

**4.3 Anhänger „19"**
- **Nehmen** → `has_tag19=true`, `conductor_attention +1`

**Kapitelende**: Station 3 → `memory_drift +1`; wenn `rel_comp7>=2`: Erinnerung kippt, Distanz steigt (later repair).

---

### Kapitel 5: Große Kontrolle

**Zweck**: Gatekeeper, Hauptlinie wird gewählt.

**Szenen**:

**5.1 Kontrolle in allen Wagen** (Druck)
- Bei `conductor_attention>=4`: Zug „enger", Türen schließen, Stress-Texte.

**5.2 Vorbereitung**
- **Mit Abteil 7** (`empathie>=3`) → `rel_comp7 +1`, `tickets_love +1`
- **Mit Schlaflosem** → `rel_sleepless +1`, `tickets_escape +1`
- **Rekorder nutzen** (`has_recorder`) → Joker: 1 Aussage später „fixieren"

**KONTROLLE 3 (FINAL)**: „Warum. Sind. Sie. Hier."
- **WAHRHEIT**: „Ich glaube mir selbst nicht." → `tickets_truth +2`, `memory_drift +1`, `conductor_attention +1` (Unlock Wagon 12 via `wissen>=3` oder `has_tag19`)
- **FLUCHT**: „Ich kann nicht zurück." → `tickets_escape +2`, `conductor_attention +2`, `rel_comp7 -1` (wenn anwesend)
- **SCHULD**: „Ich habe etwas getan…" → `tickets_guilt +2`, `empathie +1`, `memory_drift +1`
- **LIEBE** (`rel_comp7>=2`): „Ich will niemanden nochmal verlieren." → `tickets_love +2`, `conductor_attention -1`, `memory_drift -1`

**Gate**: Wenn Wahrheit gewählt oder (`wissen` hoch + `has_tag19`): Kapitel 6A, sonst 6B.

---

### Kapitel 6A: Der verschlossene Wagon 12 (Reveal)

**Zweck**: Erklärung ohne „alles war Traum", Systemlogik.

**Szenen**:

**6A.1 Türmechanik**
- Öffnet mit `has_tag19` oder `wissen>=4` oder Rekorder-Joker

**6A.2 Archivwagen** (Akten, Tickets)
- **Eigene Akte lesen** → `tickets_truth +1`, `memory_drift +1`
- **Akte von Abteil 7 lesen** → `tickets_love +1`, `rel_comp7 -1`
- **Akte verbrennen** (`mut>=4`):
  - **Erfolg**: `conductor_attention +2`, aber Freiheit steigt (Ende A leichter)

**6A.3 Angebot des Schaffners**: „Stabilisieren gegen Ticket"
- **Akzeptieren** → `memory_drift -2`, `tickets_guilt +1`
- **Ablehnen** → `mut +1`, `conductor_attention +1`
- **Deal umdrehen** (`wissen>=5`) → Regelbruch erzwingen, Ende C ohne totale Willkür

---

### Kapitel 6B: Normale Wagen (kein großer Reveal)

**Zweck**: weniger Erklärung, mehr Druck, härtere Enden.

**Szenen**:
- Passagiere werden „umgeordnet"
- Schlafloser bietet Info gegen Preis:
  - **Gib 1 Ticketpunkt** (`truth` oder `love -1`) → Hinweis für Ende A

---

### Kapitel 7: Endstation

**Zweck**: Finale Entscheidung + Payoff der Ticketlinie.

#### Ende A: AUSSTEIGEN (Stabilität)

**Bedingungen** (eine reicht):
- `tickets_escape>=4` und `conductor_attention<=4`
- oder Akte verbrannt/Regel geknackt in 6A

**Konsequenz**: zurück im Leben, aber 1 Beziehung ist „anders" (Spur bleibt möglich).

---

#### Ende B: BLEIBEN (Beziehung)

**Bedingungen**:
- `tickets_love>=4` und `rel_comp7>=3` und `memory_drift<=4`

**Konsequenz**: bewusst bleiben, Zug wird „Zuhause" (bittersüß, nicht kitschig).

---

#### Ende C: SCHAFFNER WERDEN (Macht/Opfer)

**Bedingungen**:
- `conductor_attention>=5` oder Deal-Option 6A.3 erfolgreich

**Konsequenz**: du übernimmst Regeln. Letzte Durchsage nennt deinen Namen korrekt.

---

#### Epilog-Varianten

- **`has_recorder`**: letzter Ton callbackt Kap.1 fehlenden Satz
- **`tickets_truth` hoch**: Kern-Erinnerung wird klar
- **`tickets_guilt` hoch**: Schuld wird akzeptiert, aber bewusstes Opfer

---

## 6) Umsetzungsformat für Szenen (für spätere Story-Schreibe)

Jede Szene soll im Content-Format folgendes haben:

```typescript
{
  scene_id: string,
  narrative: string,
  choices: [{
    label: string,
    condition?: (stats, flags, inventory) => boolean,
    effects: {
      stats?: { mut?, wissen?, empathie? },
      tickets?: { truth?, escape?, guilt?, love? },
      flags?: { [key]: value },
      items?: { add?, remove? }
    },
    next_scene: string
  }],
  state_notes: string[] // max 3 Callbacks
}
```

**Beispiel**:

```typescript
{
  scene_id: "K1_1_1_bahnsteig",
  narrative: "Der Bahnsteig ist leer. Kein Mensch, kein Geräusch außer deinem Atem...",
  choices: [
    {
      label: "Warten",
      effects: { stats: { wissen: +1 }, tickets: { truth: +1 } },
      next_scene: "K1_1_2_einstieg"
    },
    {
      label: "Gehen",
      effects: { stats: { mut: +1 } },
      next_scene: "K1_1_2_einstieg"
    }
  ],
  state_notes: ["Bahnsteigname wird später geglitcht", "Schaffner beobachtet bereits"]
}
```

---

## 7) Typische Fehler vermeiden

1. **Widersprüche in Regeln** (Drift/Station/Kontrolle)
2. **Entscheidungen ohne Folgen** (jede Choice muss states verändern + später sichtbar werden)
3. **Zu viele Figuren** (Fokus verwässert)
4. **Zu frühe Erklärung oder nie Erklärung**
5. **Twist-Overkill statt Foreshadowing**

---

## 8) Narrative Design-Prinzipien

### 8.1 Show, don't tell
- Regeln werden durch Beobachtung erkennbar, nicht durch Exposition.
- Der Schaffner erklärt nichts direkt, sein Verhalten zeigt die Regeln.

### 8.2 Jede Entscheidung zählt
- Keine „falschen" Choices. Jede Wahl öffnet oder schließt Wege.
- Callbacks machen frühere Entscheidungen sichtbar.

### 8.3 Mystery ohne Willkür
- Alle Hinweise sind fair platziert.
- Wer aufpasst (`wissen` hoch), erkennt Muster früher.

### 8.4 Emotionale Resonanz
- Abteil 7 ist keine Questgeberin, sondern ein Mensch mit eigener Agenda.
- Beziehungen entwickeln sich durch Konsistenz, nicht durch „richtige" Antworten.

---

## 9) Technische Umsetzungshinweise

### 9.1 Memory Drift Implementierung
- Ab `memory_drift >= 3`: Textvarianten mit falschen Namen/Details
- Ab `memory_drift >= 5`: UI-Glitches (flackernde Buttons, vertauschte Labels)

### 9.2 Ticket-Tracking Visualisierung
- Keine explizite Anzeige „Wahrheit: 3/5"
- Stattdessen: subtile UI-Hinweise (Ticket-Kanten färben sich je nach Linie)

### 9.3 Conditional Content
- Szenen können komplett unterschiedlich sein je nach Flags
- Beispiel: Abteil 7 in Kap. 5 existiert nur, wenn `rel_comp7 >= 1`

---

## 10) Erweiterungspotenzial (nicht Scope dieses Konzepts)

- **New Game+**: Schaffner-Perspektive spielbar
- **Alternative Passagiere**: andere Beziehungswege
- **Zeitschleifen-Mechanik**: Kapitel wiederholen mit Erinnerung

---

**Konzeptversion**: 1.0
**Letzte Änderung**: 2026-01-13
**Status**: Vollständig, bereit für Story-Implementierung
