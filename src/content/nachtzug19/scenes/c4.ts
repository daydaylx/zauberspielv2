// ============================================================================
// NACHTZUG 19 - Kapitel 4: Spiegelungen
// ============================================================================
// Szenen (12):
// - c4_s01_mirror: Spiegelung im Gang
// - c4_s02_wrong_name: Jemand nennt dich falsch
// - c4_s02a_recorder_reversed: Recorder spielt rückwärts
// - c4_s03_compartment_swap: Abteile vertauscht
// - c4_s04_time_anomaly: Uhrzeit springt
// - c4_s05_false_memory: Falsche Erinnerung (drift-abhängig)
// - c4_s06_comp7_again: Comp7 erscheint wieder
// - c4_s07_mirror_self: Doppelgänger-Begegnung
// - c4_s08_announcement_wrong: Verschobene Durchsage
// - c4_s09_ticket_appears: Plötzlich ein Ticket?
// - c4_s10_drift_peak: Drift-Höhepunkt
// - c4_end_station: Vierte Station
// ============================================================================

import { ScenesCollection } from '../../../domain/types';

export const chapter4Scenes: ScenesCollection = {
  // ============================================================================
  // c4_s01_mirror: Spiegelung im Gang
  // ============================================================================
  'c4_s01_mirror': {
    id: 'c4_s01_mirror',
    chapter: 4,
    title: 'Spiegelung',
    narrative: `Der Zug fährt weiter.

Du stehst im Gang. Blickst aus dem Fenster.

Aber es ist kein Fenster. Es ist ein Spiegel.

Du siehst dich. Aber etwas stimmt nicht.

Im Spiegelbild trägst du eine Jacke. Eine rote Jacke. Du trägst keine Jacke.

Du hebst die rechte Hand. Im Spiegel hebt dein Abbild die rechte Hand. Nicht die linke.

Das ist falsch. Spiegel kehren um.

Du trittst näher. Dein Spiegelbild lächelt. Du lächelst nicht.

Dann dreht sich das Spiegelbild um. Geht weg. Den Gang entlang.

Du bleibst stehen.`,
    choices: [
      {
        id: 'follow_reflection',
        label: 'Dem Spiegelbild folgen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s02_wrong_name'
      },
      {
        id: 'look_away',
        label: 'Wegschauen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_s02_wrong_name'
      },
      {
        id: 'touch_mirror',
        label: 'Den Spiegel berühren',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s02_wrong_name'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Spiegel kehrt nicht um: Grundlegende Physik bricht',
      'Spiegelbild hat eigene Agency',
      'follow_reflection/touch_mirror erhöhen memory_drift'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c4_s02_wrong_name: Jemand nennt dich falsch
  // ============================================================================
  'c4_s02_wrong_name': {
    id: 'c4_s02_wrong_name',
    chapter: 4,
    title: 'Falscher Name',
    narrative: `Du gehst weiter. Der Schlaflose sitzt in seinem Abteil.

Er winkt dir zu. „Guten Abend, Alex."

Alex. Das ist nicht dein Name.

„Ich heiße nicht—"

„Natürlich," sagt er. „Entschuldigung. Ich vergesse Namen. Wie war es nochmal? Sarah?"

Auch nicht dein Name.

„Nein, ich—"

„Moment." Er blättert in einem Notizbuch. „Hier steht: Passagier unbekannt. Kein Name registriert."

Du öffnest deinen Mund. Willst deinen Namen sagen.

Du weißt ihn nicht mehr.`,
    choices: [
      {
        id: 'try_to_remember',
        label: 'Versuchen dich zu erinnern',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c4_s02a_recorder_reversed'
      },
      {
        id: 'accept_no_name',
        label: '„Vielleicht brauche ich keinen"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c4_s02a_recorder_reversed'
      },
      {
        id: 'ask_sleepless_name',
        label: '„Wie heißt du?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c4_s02a_recorder_reversed'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Protagonist verliert eigenen Namen (Identity-Drift)',
      'try_to_remember: Starke Drift-Erhöhung (+2)',
      'accept_no_name: Akzeptanz der Auflösung'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c4_s02a_recorder_reversed: Recorder spielt rückwärts
  // ============================================================================
  'c4_s02a_recorder_reversed': {
    id: 'c4_s02a_recorder_reversed',
    chapter: 4,
    title: 'Rückwärts',
    narrative: `Du greifst in deine Tasche. Der Rekorder ist noch da.

Du drückst auf Play. Ohne zu überlegen.

Die Kassette läuft. Aber rückwärts.

„—gnuz red ni hci. hci. hci—"

Deine Stimme. Verzerrt. Rückwärts.

„—nebah eid. rettiN nov thcaN. tskcür. tskcür—"

Dann eine andere Stimme. Comp7. Vorwärts:

„Der Zug läuft rückwärts. Nicht räumlich. Zeitlich. Wir kommen nicht näher. Wir entfernen uns."

Der Rekorder stoppt.

Du schaust auf das Display. Es zeigt: -00:00

Negative Null.`,
    choices: [
      {
        id: 'rewind_more',
        label: 'Weiter zurückspulen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s03_compartment_swap'
      },
      {
        id: 'turn_off_recorder',
        label: 'Rekorder ausschalten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_s03_compartment_swap'
      },
      {
        id: 'smash_recorder',
        label: 'Rekorder gegen die Wand schlagen',
        effects: [
          { type: 'set', target: 'has_recorder', value: false },
          { type: 'inc', target: 'tickets_guilt', value: 2 },
          { type: 'dec', target: 'rel_boy', value: 1 }
        ],
        next: 'c4_s03_compartment_swap'
      }
    ],
    tags: [],
    state_notes: [
      'Recorder läuft rückwärts: Zeit-Paradox',
      'rewind_more: Hoher Truth-Gewinn (+2)',
      'smash_recorder: Verlust von Key-Item, rel_boy sinkt'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c4_s03_compartment_swap: Abteile vertauscht
  // ============================================================================
  'c4_s03_compartment_swap': {
    id: 'c4_s03_compartment_swap',
    chapter: 4,
    title: 'Vertauschung',
    narrative: `Du gehst zurück zu deinem Platz.

Aber es ist nicht mehr dein Platz.

Im Abteil sitzt jemand anderes. Der Junge. Auf deinem Sitz. Mit deiner Tasche.

„Das ist—"

„Mein Platz," sagt er. „Ich sitze hier seit drei Stationen."

Du schüttelst den Kopf. „Nein. Ich saß hier. Du warst drei Reihen weiter."

Er deutet auf ein Schild über dem Sitz. Darauf steht: Reserviert - Passagier #19

„Das ist meine Nummer," sagt er.

Du schaust auf dein Ticket. Du hast kein Ticket. Du hattest nie eins.

Aber in deiner Hand liegt plötzlich ein Zettel. Darauf steht: Passagier #91

Spiegelverkehrt.`,
    choices: [
      {
        id: 'claim_seat',
        label: '„Gib mir meinen Platz zurück"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'dec', target: 'rel_boy', value: 1 }
        ],
        next: 'c4_s04_time_anomaly'
      },
      {
        id: 'find_other_seat',
        label: 'Einen anderen Platz suchen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_s04_time_anomaly'
      },
      {
        id: 'sit_with_boy',
        label: '„Kann ich mich dazusetzen?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 2 }
        ],
        next: 'c4_s04_time_anomaly'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Plätze vertauschen sich: Räumliche Identität bricht',
      'Ticket-Nummer 19/91 Spiegelung',
      'sit_with_boy: Starke Beziehung (+2)'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c4_s04_time_anomaly: Uhrzeit springt
  // ============================================================================
  'c4_s04_time_anomaly': {
    id: 'c4_s04_time_anomaly',
    chapter: 4,
    title: 'Zeitsprung',
    narrative: `Du schaust auf deine Uhr. 23:47.

Du blinkst. 23:43.

Die Zeit läuft rückwärts.

Du starrst auf das Zifferblatt. Die Sekunden ticken. Rückwärts.

59. 58. 57. 56.

An der Wand hängt eine Bahnhofsuhr. Sie zeigt: 00:12. Vorwärts.

Der Schlaflose schaut auf seine Uhr. „Wie spät hast du?"

„23:43. Oder 23:47. Ich weiß nicht."

„Ich habe 02:31," sagt er. „Seit zwei Stunden."

Der Junge ruft: „Bei mir ist es 19:19!"

Alle Uhren laufen anders. Oder keine läuft richtig.

Oder die Zeit selbst ist zerbrochen.`,
    choices: [
      {
        id: 'sync_watches',
        label: 'Versuchen die Uhren zu synchronisieren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c4_s05_false_memory'
      },
      {
        id: 'ignore_time',
        label: 'Die Uhr ablegen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_s05_false_memory'
      },
      {
        id: 'ask_what_time_matters',
        label: '„Spielt die Zeit noch eine Rolle?"',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c4_s05_false_memory'
      }
    ],
    tags: [],
    state_notes: [
      'Zeit läuft asynchron: Jeder Passagier in anderer Zeitzone',
      'Zeit-Bruch verstärkt Drift-Gefühl',
      'ignore_time: Akzeptanz des Chaos'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c4_s05_false_memory: Falsche Erinnerung (drift-abhängig)
  // ============================================================================
  'c4_s05_false_memory': {
    id: 'c4_s05_false_memory',
    chapter: 4,
    title: 'Erinnerung',
    narrative: `Du erinnerst dich an den Bahnsteig. Am Anfang.

Es war leer. Du warst allein.

Nein. Warte.

Da war jemand. Der Schlaflose. Er stand am Rand.

Nein. Das war später. Im Zug.

Oder?

Du konzentrierst dich. Der Bahnsteig. Leer. Dunkel. Nebel.

Aber in deiner Erinnerung steht plötzlich noch jemand da. Comp7. Sie winkt dir zu.

Das ist nicht passiert. Das kann nicht passiert sein.

Du hast Comp7 erst im Zug getroffen. In Kapitel 2. Oder 3.

Aber die Erinnerung ist da. Klar. Fest.

Sie war am Bahnsteig. Sie hat dich in den Zug gerufen.`,
    choices: [
      {
        id: 'trust_false_memory',
        label: 'Der Erinnerung vertrauen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        condition: {
          type: 'compare',
          target: 'memory_drift',
          operator: '>=',
          value: 2
        },
        next: 'c4_s06_comp7_again'
      },
      {
        id: 'reject_false_memory',
        label: 'Die Erinnerung ablehnen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_s06_comp7_again'
      },
      {
        id: 'ask_others',
        label: 'Die anderen fragen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 2
        },
        next: 'c4_s06_comp7_again'
      },
      {
        id: 'accept_uncertainty',
        label: '„Ich weiß es nicht mehr"',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s06_comp7_again'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Falsche Erinnerung: Comp7 war am Bahnsteig (retcon)',
      'trust_false_memory: Nur bei memory_drift >= 2, starke Drift (+2)',
      'ask_others: Nur bei tickets_truth >= 2'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c4_s06_comp7_again: Comp7 erscheint wieder
  // ============================================================================
  'c4_s06_comp7_again': {
    id: 'c4_s06_comp7_again',
    chapter: 4,
    title: 'Wiedersehen',
    narrative: `Comp7 steht im Gang.

Du bist sicher: Sie war eben noch nicht da.

Ihr Gesicht ist klarer jetzt. Du erkennst Züge. Augen. Mund.

„Du erinnerst dich falsch," sagt sie.

„Was?"

„Deine Erinnerungen. Sie ändern sich. Der Zug schreibt sie um."

„Wie—"

„Weil du zu lange hier bist. Weil du zu viel akzeptiert hast. Weil du angefangen hast zu glauben."

Sie tritt näher. „Ich war am Bahnsteig. Das ist jetzt wahr. Vorher war es nicht wahr. Jetzt ist es wahr."

„Das ergibt keinen Sinn."

„Der NACHTZUG 19 ergibt keinen Sinn. Er ändert Sinn. Rückwirkend."

Sie reicht dir etwas. Ein Foto. Darauf: Der Bahnsteig. Nebel. Und Comp7. Sie winkt.

Das Foto ist alt. Vergilbt. Als wäre es vor Jahren aufgenommen worden.`,
    choices: [
      {
        id: 'take_photo',
        label: 'Das Foto nehmen',
        effects: [
          { type: 'set', target: 'photo_anomaly', value: true },
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c4_s07_mirror_self'
      },
      {
        id: 'refuse_photo',
        label: '„Ich will das nicht sehen"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_comp7', value: 1 }
        ],
        next: 'c4_s07_mirror_self'
      },
      {
        id: 'ask_comp7_purpose',
        label: '„Warum zeigst du mir das?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c4_s07_mirror_self'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Comp7 erklärt retroaktive Realität',
      'take_photo: Erhält photo_anomaly Item, Truth +2',
      'ask_comp7_purpose: Starke Beziehung (+2)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c4_s07_mirror_self: Doppelgänger-Begegnung
  // ============================================================================
  'c4_s07_mirror_self': {
    id: 'c4_s07_mirror_self',
    chapter: 4,
    title: 'Doppelt',
    narrative: `Du gehst durch den Gang.

Am Ende siehst du dich selbst.

Nicht im Spiegel. Nicht als Spiegelbild.

Du stehst da. Am Ende des Gangs.

Du trägst die gleiche Kleidung. Die gleiche Haltung.

Dein Doppelgänger schaut dich an.

Dann spricht er. Mit deiner Stimme:

„Du bist spät dran."

„Was?"

„Ich bin schon drei Stationen weiter. Du holst mich nicht mehr ein."

Dein Doppelgänger lächelt. „Oder ich hole dich nicht mehr ein. Je nachdem."

Er dreht sich um. Geht zur Tür am Ende des Gangs. Öffnet sie.

Dahinter: Nicht der nächste Wagen.

Sondern der Bahnsteig. Der Anfang.

Er steigt aus. Die Tür schließt sich.`,
    choices: [
      {
        id: 'chase_double',
        label: 'Hinterherrennen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s08_announcement_wrong'
      },
      {
        id: 'let_double_go',
        label: 'Ihn gehen lassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_s08_announcement_wrong'
      },
      {
        id: 'call_out',
        label: '„Warte!"',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c4_s08_announcement_wrong'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Doppelgänger ist zeitlich verschoben (3 Stationen)',
      'Doppelgänger steigt am Anfang aus (Paradox-Schleife)',
      'chase_double: Starke Drift-Erhöhung'
    ],
    atmosphere: 'dark'
  },

  // ============================================================================
  // c4_s08_announcement_wrong: Verschobene Durchsage
  // ============================================================================
  'c4_s08_announcement_wrong': {
    id: 'c4_s08_announcement_wrong',
    chapter: 4,
    title: 'Durchsage',
    narrative: `Die Lautsprecher knacken.

„Sehr geehrte—[RAUSCHEN]—"

Die Stimme stoppt. Startet neu.

„—erreicht. Nächster Halt: [FEHLER]—Bahnhof—[BEREITS PASSIERT]—"

Das ist falsch. Die Durchsage kommt zu früh. Der Zug hält noch nicht.

Oder zu spät. Der Zug hat schon gehalten.

„—Bitte—[UMKEHREN]—aussteigen—[EINSTEIGEN]—"

Die Wörter sind vertauscht. Falsch zusammengesetzt.

„—Passagier #19—[WARNUNG]—Passagier #91—[IDENTISCH]—"

Deine Nummer. Und die gespiegelte.

„—Wagen 7—[EXISTIERT NICHT]—Wagen 7—[EXISTIERT ÜBERALL]—"

Dann Stille.

Der Zug rattert weiter. Aber das Rattern klingt falsch. Asynchron.`,
    choices: [
      {
        id: 'listen_carefully',
        label: 'Genau hinhören',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c4_s09_ticket_appears'
      },
      {
        id: 'cover_ears',
        label: 'Ohren zuhalten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_s09_ticket_appears'
      },
      {
        id: 'repeat_announcement',
        label: 'Die Durchsage wiederholen',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s09_ticket_appears'
      }
    ],
    tags: [],
    state_notes: [
      'Durchsage mit verschobenen/vertauschten Wörtern',
      'Warnung für Passagier #19/#91 (Spiegelung)',
      'repeat_announcement: Spieler internalisiert falsche Info'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c4_s09_ticket_appears: Plötzlich ein Ticket?
  // ============================================================================
  'c4_s09_ticket_appears': {
    id: 'c4_s09_ticket_appears',
    chapter: 4,
    title: 'Das Ticket',
    narrative: `Du greifst in deine Tasche.

Da ist ein Ticket.

Ein richtiges Ticket. Gedruckt. Mit Stempel.

„NACHTZUG 19 - Gültig für: Passagier #19 - Von: [UNLESERLICH] - Nach: [UNLESERLICH]"

Du hast nie ein Ticket gekauft. Du hast nie eins gehabt.

Aber es ist da. Echt. Schwer.

Du drehst es um. Auf der Rückseite steht:

„Dieses Ticket wurde nie ausgestellt. Dieser Passagier existiert nicht. Diese Fahrt findet nicht statt."

Dann darunter, in kleiner Schrift:

„Gültig für 0 Stationen. Bereits abgelaufen seit: [IMMER]"

Du schaust auf. Der Schaffner steht nicht da. Niemand kommt.

Das Ticket wird warm in deiner Hand. Dann heiß.

Du lässt es fallen. Es verbrennt. Wird zu Asche.`,
    choices: [
      {
        id: 'keep_ashes',
        label: 'Die Asche aufsammeln',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s10_drift_peak'
      },
      {
        id: 'leave_ashes',
        label: 'Die Asche liegenlassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_s10_drift_peak'
      },
      {
        id: 'try_to_reconstruct',
        label: 'Versuchen das Ticket zu rekonstruieren',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s10_drift_peak'
      }
    ],
    tags: [],
    state_notes: [
      'Ticket erscheint und verbrennt: Paradoxe Existenz',
      'Ticket bestätigt Nicht-Existenz des Passagiers',
      'try_to_reconstruct: Hoher Guilt-Gewinn (+2), Spieler will Realität erzwingen'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c4_s10_drift_peak: Drift-Höhepunkt
  // ============================================================================
  'c4_s10_drift_peak': {
    id: 'c4_s10_drift_peak',
    chapter: 4,
    title: 'Auflösung',
    narrative: `Alles verschwimmt.

Die Abteile. Der Gang. Die Fenster.

Du siehst alles gleichzeitig:

Den Bahnsteig am Anfang. Den Schaffner bei der ersten Kontrolle. Comp7 in Wagen 7. Den Jungen mit dem Rekorder. Deinen Doppelgänger.

Alle Momente auf einmal.

Und du siehst dich selbst. In jedem Moment. Alle Entscheidungen gleichzeitig.

Die Schleife ist nicht linear. Sie ist nicht temporal.

Sie ist alles. Auf einmal.

Comp7 steht neben dir. Oder vor dir. Oder hinter dir.

„Jetzt siehst du es," sagt sie. „Der Zug ist keine Fahrt. Er ist ein Zustand."

Die Welt stabilisiert sich. Langsam.

Du stehst wieder im Gang. Alles ist normal.

Aber du weißt: Das ist nur eine Ebene.`,
    choices: [
      {
        id: 'embrace_understanding',
        label: 'Das Verständnis annehmen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c4_end_station'
      },
      {
        id: 'retreat_to_normal',
        label: 'Zur Normalität zurückkehren',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 }
        ],
        next: 'c4_end_station'
      },
      {
        id: 'ask_comp7_how_to_escape',
        label: '„Wie kommen wir hier raus?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c4_end_station'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Drift-Höhepunkt: Alle Momente gleichzeitig sichtbar',
      'embrace_understanding: Starke Truth + rel_comp7 (+2 beide)',
      'Spieler versteht nicht-lineare Natur des Zuges'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c4_end_station: Vierte Station
  // ============================================================================
  'c4_end_station': {
    id: 'c4_end_station',
    chapter: 4,
    title: 'Vierter Halt',
    narrative: `Der Zug hält.

Die Tür öffnet sich.

Der Bahnsteig ist anders diesmal. Nicht leer.

Es stehen Menschen da. Dutzende. Hunderte.

Alle haben dein Gesicht.

Alle tragen die gleiche Kleidung.

Alle schauen dich an.

Dann sprechen sie. Gleichzeitig. Mit deiner Stimme:

„Willkommen zurück."

Niemand steigt ein. Niemand steigt aus.

Die Tür schließt sich.

Der Zug fährt weiter.

Du stehst im Gang. Allein.

Comp7 ist weg. Der Junge ist weg. Der Schlaflose ist weg.

Nur du.

Und dann, hinter dir, ein Flüstern:

„Nächster Halt."`,
    choices: [
      {
        id: 'continue_chapter5',
        label: '[Weiter zu Kapitel 5]',
        effects: [
          { type: 'set', target: 'chapter_index', value: 5 },
          { type: 'inc', target: 'station_count', value: 1 }
        ],
        ending: 'ending_test'
      }
    ],
    tags: ['station_end'],
    state_notes: [
      'Vierte station_end: station_count +1',
      'Bahnsteig voller Doppelgänger: Identity-Auflösung',
      'Alle NPCs verschwunden: Isolation für Kapitel 5'
    ],
    atmosphere: 'dark'
  }
};
