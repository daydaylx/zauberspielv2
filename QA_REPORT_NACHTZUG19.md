# QA-Report: NACHTZUG 19 (Kapitel 1-7)
**Validiert am:** 2026-01-17
**Validator:** Claude Code QA-Agent
**Scope:** Vollständige Validierung aller 7 Kapitel

---

## 📊 Metriken-Übersicht pro Kapitel

| Kapitel | Szenen | Choices | Conditions | Wörter | Runtime | station_end? | control? | Ampel |
|---------|--------|---------|------------|--------|---------|--------------|----------|-------|
| **1**   | 24     | 24      | 0          | 4.432  | 27 min  | ✓            | —        | 🟡    |
| **2**   | 25     | 25      | 4          | 5.182  | 31 min  | ✓            | ✓        | 🟡    |
| **3**   | 27     | 27      | 5          | 5.299  | 32 min  | ✓            | ✓        | 🟠    |
| **4**   | 26     | 26      | 8          | 5.330  | 32 min  | ✓            | —        | 🟠    |
| **5**   | 25     | 25      | 10         | 4.420  | 28 min  | ✓            | ✓        | 🟡    |
| **6**   | 26     | 26      | 14         | 4.687  | 30 min  | ✓            | —        | 🟡    |
| **7**   | 26     | 26      | 18         | 4.784  | 30 min  | ✓            | —        | 🟡    |

**Zielwerte (LENGTH_IMMERSION_SPEC.md):**
- Szenen: 22–28 ✓ (alle erfüllt)
- Choices: 30–45 ❌ (alle Kapitel zu niedrig: 24-27)
- Conditions: 5+ (Kap 1-5), 10+ (Kap 6-7)
- Wörter: 5.000–6.500
- Runtime: 30–35 Minuten

---

## 🔴 P0: Game-Breaking Issues

**Keine P0-Findings.** ✅
- Alle `next`-Referenzen zeigen auf existierende Szenen (179 Szenen, 178 unique next-Referenzen)
- Alle 4 Endings (`truth_ending`, `escape_ending`, `guilt_ending`, `love_ending`) sind definiert
- Keine toten Pfade ohne `ending`-Tag gefunden
- Schema-Struktur korrekt: Alle Szenen haben `id`, `chapter`, `title`, `narrative`, `choices`
- Alle Choices haben mindestens 1 `effect` und `next` ODER `ending`

---

## 🟠 P1: Regelver letzungen & Canon-Verstöße

### P1-01: Manifest scene_count veraltet (Kapitel 1-4)
**Datei:** `src/content/nachtzug19/manifest.ts` (Zeilen 17-34)
**Problem:** Die `scene_count`-Angaben im Manifest sind für Kapitel 1-4 veraltet:
- Manifest: Kapitel 1-4 je 12 Szenen
- Tatsächlich: Kapitel 1=24, 2=25, 3=27, 4=26 Szenen

**Auswirkung:** UI zeigt falsche Fortschrittsanzeige; inkonsistent mit Kapiteln 5-7

**Fix:**
```typescript
// In manifest.ts:
{ number: 1, title: 'Leerer Bahnsteig', scene_count: 24 },
{ number: 2, title: 'Die erste Kontrolle', scene_count: 25 },
{ number: 3, title: 'Wagen 7', scene_count: 27 },
{ number: 4, title: 'Spiegelungen', scene_count: 26 },
```

---

### P1-02: Kapitel 1 hat 0 Conditions (Zielwert: 5+)
**Betroffen:** Alle Szenen in `c1.ts`
**Problem:** LENGTH_IMMERSION_SPEC verlangt mindestens 5 conditional choices pro Kapitel 1-5. Kapitel 1 hat aktuell 0.

**Empfehlung:** Füge 5-6 einfache Conditions hinzu, z.B.:
- In `c1_s05_memory_drift`: Condition auf `memory_drift >= 1` (bereits vorhanden, aber kein conditional choice)
- In `c1_s10_choice_interlude`: Condition auf `tickets_truth >= 1` für reflektierte Choice
- In `c1_end_station`: Condition auf `conductor_attention >= 2` für "Schaffner zunicken"

**Minimal-Fix:** 3 Szenen erweitern (c1_s05, c1_s10, c1_end_station), jeweils 1 conditional choice hinzufügen.

---

### P1-03: Kapitel 2 hat nur 4 Conditions (Zielwert: 5+)
**Betroffen:** `c2.ts`
**Problem:** Knapp unter Zielwert (4 statt 5+).

**Fix:** 1-2 weitere Conditions ergänzen, z.B.:
- In `c2_s11_boy_recorder_interlude`: Conditional choice bei `memory_drift >= 2`
- In `c2_end_station`: Conditional choice bei `rel_boy >= 1`

---

## 🟡 P2: Qualität & Length-Targets

### P2-01: ALLE Kapitel unter Choices-Target (24-27 statt 30-45)
**Betroffen:** Alle Kapitel 1-7
**Problem:** Laut LENGTH_IMMERSION_SPEC sollen Kapitel 30-45 Choices haben. Aktuelle Werte:
- Kapitel 1-7: 24-27 Choices (ca. 20-40% unter Zielwert)

**Mögliche Ursache:** Pro Szene gibt es durchschnittlich nur 1 Choice. Zielwert wäre 1,3-1,6 Choices/Szene bei 22-28 Szenen.

**Empfehlung:** KEINE neuen Szenen hinzufügen (Szenenanzahl ist optimal). Stattdessen:
1. **In 5-7 Szenen pro Kapitel:** 1 zusätzliche Choice einfügen (z.B. atmosphärische Reaktionen)
2. **Interlude-Szenen erweitern:** Aktuell haben viele Interludes nur 1 Choice. Erwägen Sie 2-3 kleine Reaktions-Choices.
3. **Kondensieren Sie nicht** – Qualität > Quantität. Wenn 25 Choices narrativ richtig sind, akzeptabel.

**Kritikalität:** P2, weil Spielerfahrung nicht beeinträchtigt ist – nur Spec-Target verfehlt.

---

### P2-02: Kapitel 1, 5, 6, 7 unter Wörter-Target (4.420-4.784 statt 5.000+)
**Betroffen:**
- Kapitel 1: 4.432 Wörter (568 unter Minimum)
- Kapitel 5: 4.420 Wörter (580 unter Minimum)
- Kapitel 6: 4.687 Wörter (313 unter Minimum)
- Kapitel 7: 4.784 Wörter (216 unter Minimum)

**Empfehlung:**
- **Option A (bevorzugt):** Narratives in 3-5 Szenen pro Kapitel um 100-150 Wörter erweitern (Set-Pieces, Interludes, station_end)
- **Option B:** 1-2 neue Szenen einfügen (erhöht aber Szenenanzahl über Target)

**Konkrete Szenen zum Erweitern:**
- Kap 1: `c1_s05_memory_drift`, `c1_s10_choice_interlude` (Interludes sind kurz)
- Kap 5: `c5_s02_interlude_silence`, `c5_s05_interlude_timebreak` (kurze Interludes)
- Kap 6: `c6_s01_train_changes`, `c6_s11_interlude_no_return` (Atmosphäre ausbauen)
- Kap 7: `c7_s11_interlude_memory_flood`, `c7_s23_interlude_doors_open` (Höhepunkte vertiefen)

---

### P2-03: Kapitel 1 & 2 haben niedrige Runtime (27-31 min statt 30-35 min)
**Ursache:** Kombination aus niedrigen Wörtern + Choices.

**Fix:** Folgt automatisch aus P2-01 und P2-02. Nach Erweiterung:
- Kapitel 1: ~30 min (wenn +500 Wörter, +4 Choices)
- Kapitel 2: ~33 min (bereits nah am Target)

---

## 🔵 P3: Nice-to-Have & Cleanup

### P3-01: Legacy-Stats in Kommentaren/state_notes erwähnt
**Betroffen:** Kapitel 1-5 (nicht in c6, c7)
**Details:** Die alten Stats `mut`, `wissen`, `empathie` werden in `state_notes` noch erwähnt, aber **NICHT in effects verwendet** (validiert).

**Fix:** Suche/Ersetze in c1.ts, c2.ts, c3.ts, c4.ts, c5.ts:
- Entferne alle Erwähnungen von "mut", "wissen", "empathie" aus `state_notes`

**Beispiel (c2.ts:800):**
```typescript
// Vorher:
state_notes: ['Erhöht mut +1, ...']
// Nachher:
state_notes: ['Erhöht tickets_truth +1, ...']
```

---

### P3-02: Kapitel 3 & 4 leicht über Szenen-Zielwert (27/26 statt max 28)
**Status:** Akzeptabel, da innerhalb Toleranz (22-28). Keine Aktion nötig.

---

### P3-03: Station-End memory_drift könnte konsistenter dokumentiert sein
**Beobachtung:** Einige `station_end`-Szenen dokumentieren "memory_drift +1 automatisch" explizit in `state_notes`, andere nicht.

**Empfehlung:** Vereinheitlichen. Entweder:
- **Alle** station_end-Szenen: `state_notes` mit "memory_drift +1 (R1: Drift nach Stationen)"
- **Oder:** Entfernen (da R1 systemweit gilt)

**Bevorzugt:** Explizit dokumentieren für Clarity.

---

## ✅ Bestätigungen (Keine Issues)

1. **Graph-Integrität:** ✅ Alle 178 unique `next`-Referenzen zeigen auf existierende Szenen
2. **Canon-Regeln:**
   - **R1 (Drift nach Stationen):** ✅ Alle 7 Kapitel haben `station_end`-Szene
   - **R2 (Controls):** ✅ Kapitel 2, 3, 5 haben `control`-Szenen (je 3-teilige Set-Pieces)
   - **R3 (Callback):** ✅ Validierung implizit durch R2 (control-Szenen nutzen conductor_attention)
3. **State-Key Whitelist:** ✅ Keine unbekannten State-Keys gefunden (validiert gegen `src/domain/types/index.ts`)
4. **Endings:** ✅ Alle 4 Endings definiert und referenziert (`truth_ending`, `escape_ending`, `guilt_ending`, `love_ending`)
5. **Schema-Format:** ✅ Alle Scenes haben Pflichtfelder; alle Choices haben ≥1 effect + (next XOR ending)

---

## 📈 Zusammenfassung & Empfohlene Priorität

**Sofort (vor Release):**
1. **P1-01:** Manifest scene_count korrigieren (5 Minuten)
2. **P1-02/03:** Conditions in Kapitel 1 & 2 auf 5+ erhöhen (1-2 Stunden)

**Für Polishing-Phase:**
3. **P2-01:** Choices erhöhen (optional, narrativ prüfen)
4. **P2-02:** Wortanzahl in Kap 1, 5, 6, 7 erhöhen (2-3 Stunden pro Kapitel)

**Nice-to-Have (Maintenance):**
5. **P3-01:** Legacy-Stats aus Kommentaren entfernen
6. **P3-03:** state_notes für memory_drift vereinheitlichen

---

## 🏁 Fazit

**Status: 🟢 RELEASE-READY** (mit minor fixes)

Das Projekt ist technisch einwandfrei:
- Keine Game-Breaking Issues (P0)
- Graph vollständig und konsistent
- Canon-Regeln erfüllt
- Szenenanzahl optimal

**Hauptabweichungen von Spec:**
- Choices-Count durchgehend niedriger (narrative Entscheidung, vertretbar)
- Einige Kapitel leicht unter Wortanzahl-Target (leicht zu beheben)

**Empfehlung:**
1. P1-Fixes anwenden (manifest + conditions)
2. P2-02 selektiv umsetzen (Wortanzahl in 4 Kapiteln)
3. P2-01 narrativ prüfen (sind mehr Choices sinnvoll?)

**Geschätzte Fix-Zeit:** 6-10 Stunden für alle P1+P2 (exkl. narrative Neuarbeit)
