// ============================================================================
// NACHTZUG 19 - Kapitel 3: Wagen 7
// ============================================================================
// Szenen (12):
// - c3_s01_after_station: Nach zweiter Station
// - c3_s01a_boy_return: Junge kehrt zurück (anders)
// - c3_s02_recorder_anomaly: Kassette spielt neue Aufnahme
// - c3_s02a_corridor_shift: Gang verschiebt sich
// - c3_s03_compartment7_door: Tür zu Abteil 7
// - c3_s03a_inside_comp7: In Abteil 7
// - c3_s04_comp7_truth: Comp7 erklärt den Zug
// - c3_s04a_third_announcement: Dritte Durchsage (stark verzerrt)
// - c3_s05_second_control: Zweite Kontrolle (R3)
// - c3_s05a_control_resistance: Widerstand oder Kooperation
// - c3_s06_drift_intensifies: Drift verstärkt sich
// - c3_end_station: Dritte Station (starker Drift)
// ============================================================================

import { ScenesCollection } from '../../../domain/types';

export const chapter3Scenes: ScenesCollection = {
  // ============================================================================
  // c3_s01_after_station: Nach zweiter Station
  // ============================================================================
  'c3_s01_after_station': {
    id: 'c3_s01_after_station',
    chapter: 3,
    title: 'Nach dem Halt',
    narrative: `Der Zug fährt weiter. Das Rattern ist lauter geworden. Oder hörst du nur genauer hin?

Die Neonröhren flackern schneller. Aus. An. Aus. An. Nicht mehr synchron.

Du stehst im Gang. Der Schlaflose sitzt drei Reihen weiter hinten. Seine Jacke ist jetzt schwarz. Du erinnerst dich: Sie war rot. Oder grün. Oder beides.

Comp7 ist weg. Ihr Abteil leer. Nur das Notizbuch liegt noch da, aufgeschlagen.

Auf der Seite steht: „Passagier #[UNLESBAR]: Sucht nach Jungen. Findet Wagen 7."

Du hast den Jungen nicht gesucht. Noch nicht.`,
    choices: [
      {
        id: 'take_notebook',
        label: 'Das Notizbuch nehmen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s01a_boy_return'
      },
      {
        id: 'leave_notebook',
        label: 'Das Notizbuch liegenlassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s01a_boy_return'
      },
      {
        id: 'read_notebook',
        label: 'Im Notizbuch lesen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s01a_boy_return'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Comp7 verschwunden, Notizbuch enthält Vorhersage',
      'read_notebook: Hoher Truth-Gewinn, aber memory_drift steigt',
      'Jackenfarbe unklar: Spieler erinnert sich nicht mehr genau'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s01a_boy_return: Junge kehrt zurück
  // ============================================================================
  'c3_s01a_boy_return': {
    id: 'c3_s01a_boy_return',
    chapter: 3,
    title: 'Rückkehr',
    narrative: `Der Junge sitzt wieder in seinem Abteil.

Du bist sicher: Er war weg. Das Abteil war leer. Du hast es gesehen.

Er hält den Kassettenrekorder. Den gleichen, den er dir gegeben hat. Aber du hast ihn doch noch.

Du greifst in deine Tasche. Der Rekorder ist da. Kalt. Schwer.

Der Junge schaut dich an. „Es gibt zwei jetzt," sagt er. „Manchmal werden Dinge mehr."

Er drückt auf Play. Sein Rekorder spielt. Kein Knistern. Nur Stille.

„Deiner auch?" fragt er.`,
    choices: [
      {
        id: 'play_own_recorder',
        label: 'Den eigenen Rekorder abspielen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c3_s02_recorder_anomaly'
      },
      {
        id: 'refuse_to_check',
        label: '„Ich will es nicht wissen"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_boy', value: 1 }
        ],
        next: 'c3_s02a_corridor_shift'
      },
      {
        id: 'ask_about_duplication',
        label: '„Was meinst du mit ›mehr‹?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c3_s02_recorder_anomaly'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Junge kehrt zurück mit dupliziertem Rekorder',
      'Drift-Mechanik: Objekte können sich verdoppeln',
      'refuse_to_check verschlechtert rel_boy'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s02_recorder_anomaly: Kassette spielt neue Aufnahme
  // ============================================================================
  'c3_s02_recorder_anomaly': {
    id: 'c3_s02_recorder_anomaly',
    chapter: 3,
    title: 'Die Aufnahme',
    narrative: `Du drückst auf Play.

Knistern. Dann eine Stimme. Deine Stimme.

„—ich bin im NACHTZUG 19. Ich habe kein Ticket. Der Schaffner kommt—"

Das hast du nie gesagt. Das hast du nie aufgenommen.

Die Stimme weiter: „—Comp7 sagt, es gibt keinen Ausstieg. Der Junge sagt, Dinge werden mehr—"

Das hast du gerade erst gehört. Vor Sekunden.

Dann eine andere Stimme. Der Schlaflose:

„—die Jacke. Sie ändert sich. Ich weiß nicht mehr, welche Farbe—"

Das hast du ihm gesagt. In Kapitel 2. Aber wie ist es auf der Kassette?

Der Junge nickt. „Der Zug zeichnet alles auf."`,
    choices: [
      {
        id: 'listen_more',
        label: 'Weiterhören',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s02a_corridor_shift'
      },
      {
        id: 'stop_recorder',
        label: 'Den Rekorder ausschalten',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c3_s02a_corridor_shift'
      },
      {
        id: 'ask_boy_how',
        label: '„Wie funktioniert das?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 2 }
        ],
        next: 'c3_s02a_corridor_shift'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Kassette zeichnet Spieler-Dialoge auf (Meta-Element)',
      'listen_more erhöht memory_drift (zu viel Wahrheit)',
      'ask_boy_how: Starke Beziehung (+2)'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_s02a_corridor_shift: Gang verschiebt sich
  // ============================================================================
  'c3_s02a_corridor_shift': {
    id: 'c3_s02a_corridor_shift',
    chapter: 3,
    title: 'Verschiebung',
    narrative: `Du gehst durch den Gang. Zurück zu deinem Platz.

Der Gang ist anders. Die Abteile sind nicht mehr in der gleichen Reihenfolge.

Vorhin: Schlaflosen-Abteil, dann leeres Abteil, dann das mit der Zeitung.

Jetzt: Leeres Abteil, Zeitung, dann Schlaflosen.

Du zählst die Abteile. Immer noch acht. Aber die Positionen haben gewechselt.

Der Schlaflose winkt dir zu. Als hätte er dich erwartet. „Du suchst Wagen 7," sagt er.

„Woher—"

„Alle suchen Wagen 7. Am Ende."

Er deutet nach vorne. „Oder nach hinten. Je nachdem."`,
    choices: [
      {
        id: 'go_forward',
        label: 'Nach vorne gehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_s03_compartment7_door'
      },
      {
        id: 'go_backward',
        label: 'Nach hinten gehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s03_compartment7_door'
      },
      {
        id: 'ask_sleepless_direction',
        label: '„Was meinst du damit?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c3_s03_compartment7_door'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Abteil-Reihenfolge ändert sich: Raumlogik bricht',
      'Schlaflosen weiß von Wagen 7 (NPC-Wissen)',
      'Beide Richtungen führen zum gleichen Ziel (Paradox)'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c3_s03_compartment7_door: Tür zu Abteil 7
  // ============================================================================
  'c3_s03_compartment7_door': {
    id: 'c3_s03_compartment7_door',
    chapter: 3,
    title: 'Die Tür',
    narrative: `Am Ende des Gangs: Eine Tür.

Sie war vorher nicht da. Oder du hast sie nicht gesehen.

Auf der Tür steht: 7

Die Schrift ist handgemalt. Kleine, präzise Buchstaben. Wie in Comp7s Notizbuch.

Die Tür ist angelehnt. Licht fällt durch den Spalt.

Du hörst eine Stimme. Comp7.

„Du kannst reinkommen. Ich weiß, dass du da bist."

Die Tür öffnet sich weiter. Von allein.`,
    choices: [
      {
        id: 'enter_compartment7',
        label: 'Eintreten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s03a_inside_comp7'
      },
      {
        id: 'stay_outside',
        label: 'Draußen bleiben',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s04a_third_announcement'
      },
      {
        id: 'ask_from_outside',
        label: '„Was ist da drin?"',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c3_s03a_inside_comp7'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Abteil 7 erscheint: Zentrale Story-Location',
      'Tür öffnet sich selbst: Zuglogik nimmt Kontrolle',
      'stay_outside überspringt wichtige Enthüllung'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s03a_inside_comp7: In Abteil 7
  // ============================================================================
  'c3_s03a_inside_comp7': {
    id: 'c3_s03a_inside_comp7',
    chapter: 3,
    title: 'Wagen 7',
    narrative: `Du trittst ein.

Das Abteil ist größer. Viel größer als die anderen. Unmöglich größer.

An den Wänden: Notizbücher. Dutzende. Alle aufgeschlagen. Alle vollgeschrieben.

Comp7 sitzt am Tisch. Ihr Gesicht immer noch unscharf.

„Willkommen in Wagen 7," sagt sie. „Oder Abteil 7. Je nachdem, wie du es siehst."

Du schaust aus dem Fenster. Draußen: Nicht die Gleise. Nicht die Dunkelheit.

Sondern der Gang des Zuges. Von außen.

„Der Zug ist größer innen als außen," sagt Comp7. „Und kleiner außen als innen. Das ist Teil des Problems."`,
    choices: [
      {
        id: 'examine_notebooks',
        label: 'Die Notizbücher untersuchen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s04_comp7_truth'
      },
      {
        id: 'look_out_window',
        label: 'Aus dem Fenster schauen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s04_comp7_truth'
      },
      {
        id: 'ask_comp7_explain',
        label: '„Erkläre mir das"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c3_s04_comp7_truth'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Abteil 7: Impossibles Raumparadox (größer innen)',
      'Fenster zeigt Zuginnenraum: Meta-Schleife',
      'ask_comp7_explain: Starke Beziehung (+2)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s04_comp7_truth: Comp7 erklärt den Zug
  // ============================================================================
  'c3_s04_comp7_truth': {
    id: 'c3_s04_comp7_truth',
    chapter: 3,
    title: 'Die Wahrheit',
    narrative: `Comp7 blättert in einem der Notizbücher.

„Der NACHTZUG 19 ist keine Zugfahrt," sagt sie. „Er ist eine Schleife. Wir fahren nicht von A nach B. Wir fahren von A nach A."

Sie zeigt dir eine Seite. Eine Karte. Kreisförmig.

„Sieben Stationen. Jede ist die gleiche. Jede ist leer. Am Ende kommen wir wieder am Anfang an."

„Warum?"

„Weil jemand nicht loslassen kann. Weil jemand nicht aussteigen will. Weil jemand denkt, dass die nächste Station anders wird."

Sie schließt das Notizbuch. „Der Junge sagt, es bist du. Der Schlaflose sagt, es bin ich. Ich weiß es nicht mehr."

Die Lautsprecher knacken. Eine Durchsage kommt.`,
    choices: [
      {
        id: 'accept_truth',
        label: '„Ich verstehe"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s04a_third_announcement'
      },
      {
        id: 'deny_truth',
        label: '„Das kann nicht sein"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s04a_third_announcement'
      },
      {
        id: 'ask_who',
        label: '„Wer hält uns hier?"',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s04a_third_announcement'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Kernthese: NACHTZUG 19 ist Schleife, nicht Fahrt',
      'Jemand will nicht loslassen (Protagonist? Comp7?)',
      'accept_truth: Hoher Truth-Gewinn (+2)'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c3_s04a_third_announcement: Dritte Durchsage
  // ============================================================================
  'c3_s04a_third_announcement': {
    id: 'c3_s04a_third_announcement',
    chapter: 3,
    title: 'Durchsage',
    narrative: `Die Lautsprecher knacken. Laut. Zu laut.

„Sehr—[RAUSCHEN]—Fahrgäste—"

Die Stimme ist verzerrt. Nicht mehr menschlich.

„—erreichen—[FEHLER]—Station—[GELÖSCHT]—"

„—Kontrolle—[WIEDERHOLUNG]—Kontrolle—[WIEDERHOLUNG]—"

Das Wort wiederholt sich. Immer wieder. Schneller.

„Kontrolle-Kontrolle-Kontrolle-Kontrolle—"

Dann Stille.

Comp7 steht auf. „Sie kommen. Wieder. Sie kommen immer wieder."

Du hörst Schritte. Schwer. Rhythmisch.

Der Schaffner.`,
    choices: [
      {
        id: 'hide_in_comp7',
        label: 'In Abteil 7 bleiben',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s05_second_control'
      },
      {
        id: 'go_to_control',
        label: 'Rausgehen zur Kontrolle',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_s05_second_control'
      },
      {
        id: 'ask_comp7_help',
        label: 'Comp7 um Hilfe bitten',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c3_s05_second_control'
      }
    ],
    tags: [],
    state_notes: [
      'Durchsage stark verzerrt: Systemfehler eskaliert',
      'ask_comp7_help: Starke Beziehung (+2)',
      'Vorbereitung auf zweite Kontrolle (R3)'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_s05_second_control: Zweite Kontrolle (R3)
  // ============================================================================
  'c3_s05_second_control': {
    id: 'c3_s05_second_control',
    chapter: 3,
    title: 'Zweite Kontrolle',
    narrative: `Der Schaffner steht vor dir.

Er ist größer als vorhin. Oder du bist kleiner.

„Fahrkarten bitte."

Du sagst: „Ich habe keine."

Er nickt. Langsam. „Ich weiß. Sie haben nie eine gehabt."

Seine Kelle ist nicht leer. Darauf steht:

„Passagier ohne Ticket. Station 3. Wiederholen: Station 3."

„Sie haben zwei Optionen," sagt er. „Sie können aussteigen. Oder Sie können ein Ticket kaufen."

„Mit was?"

Er deutet auf den Rekorder. „Mit dem. Oder mit der Wahrheit. Oder mit jemandem."`,
    choices: [
      {
        id: 'offer_recorder',
        label: 'Den Rekorder anbieten',
        effects: [
          { type: 'set', target: 'has_recorder', value: false },
          { type: 'inc', target: 'tickets_guilt', value: 2 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_s05a_control_resistance'
      },
      {
        id: 'offer_truth',
        label: '„Die Wahrheit: Ich gehöre hierher"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 }
        ],
        next: 'c3_s05a_control_resistance'
      },
      {
        id: 'offer_someone',
        label: '„Was meinst du mit ›jemandem‹?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_s05a_control_resistance'
      }
    ],
    tags: ['control'],
    state_notes: [
      'R3: Zweite Kontrolle (Kapitel 3)',
      'offer_recorder: Verlust von Key-Item, senkt attention',
      'offer_someone: Deutet Opfer-Mechanik an'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_s05a_control_resistance: Nach der Kontrolle
  // ============================================================================
  'c3_s05a_control_resistance': {
    id: 'c3_s05a_control_resistance',
    chapter: 3,
    title: 'Widerstand',
    narrative: `Der Schaffner bleibt stehen. Bewegt sich nicht.

„Sie haben nichts gegeben," sagt er. „Nichts, das zählt."

Comp7 tritt aus Abteil 7. Ihr Gesicht ist klarer jetzt. Schärfer. Du erkennst Züge.

„Er kann dich nicht rauswerfen," sagt sie. „Weil du schon draußen bist. Weil wir alle draußen sind."

Der Schaffner dreht sich zu ihr. „Sie sollten nicht hier sein."

„Niemand sollte hier sein," sagt Comp7. „Aber wir sind es trotzdem."

Der Schaffner nickt. Geht weiter. Seine Schritte entfernen sich.

Comp7 schaut dich an. „Er kommt wieder. Bei der nächsten Station. Und der nächsten."`,
    choices: [
      {
        id: 'thank_comp7',
        label: '„Danke"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c3_s06_drift_intensifies'
      },
      {
        id: 'ask_how_many',
        label: '„Wie viele Stationen noch?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_s06_drift_intensifies'
      },
      {
        id: 'walk_away',
        label: 'Weggehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s06_drift_intensifies'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Comp7 konfrontiert Schaffner: NPC-Agency',
      'thank_comp7: Starke Beziehung (+2)',
      'Schleife wird explizit: "Er kommt wieder"'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c3_s06_drift_intensifies: Drift verstärkt sich
  // ============================================================================
  'c3_s06_drift_intensifies': {
    id: 'c3_s06_drift_intensifies',
    chapter: 3,
    title: 'Auflösung',
    narrative: `Du gehst durch den Gang.

Alles ist anders.

Die Abteile sind leer. Alle. Kein Schlaflosen. Kein Junge. Keine Frau mit Zeitung.

Die Fenster zeigen nicht mehr nach draußen. Sie zeigen andere Gänge. Andere Züge. Oder den gleichen Zug.

Die Neonröhren flackern. Manche sind aus. Manche sind zu hell.

Du zählst die Abteile. Eins. Zwei. Drei. Vier. Fünf. Sechs. Sieben.

Dann wieder: Eins. Zwei. Drei.

Der Gang hat keine Enden mehr. Er wiederholt sich.

Du bleibst stehen.

Der Zug hält.`,
    choices: [
      {
        id: 'accept_loop',
        label: 'Die Schleife akzeptieren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_end_station'
      },
      {
        id: 'try_to_exit',
        label: 'Versuchen auszusteigen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 }
        ],
        next: 'c3_end_station'
      },
      {
        id: 'call_for_comp7',
        label: 'Nach Comp7 rufen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_end_station'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Alle Passagiere verschwunden: Drift-Höhepunkt',
      'Gang wird endlose Schleife: Räumliches Paradox',
      'accept_loop erhöht memory_drift (Realitätsakzeptanz)'
    ],
    atmosphere: 'dark'
  },

  // ============================================================================
  // c3_end_station: Dritte Station
  // ============================================================================
  'c3_end_station': {
    id: 'c3_end_station',
    chapter: 3,
    title: 'Dritter Halt',
    narrative: `Der Zug hält.

Du gehst zur Tür. Sie öffnet sich.

Der Bahnsteig ist nicht leer.

Da steht jemand. Eine Gestalt. Gesicht unscharf.

Du erkennst die Kleidung. Die Haltung.

Es ist der Schlaflose. Oder der Junge. Oder Comp7.

Oder du.

Die Gestalt winkt. Steigt ein.

Geht an dir vorbei. Setzt sich in dein Abteil.

Die Tür schließt sich.

Der Zug fährt weiter.`,
    choices: [
      {
        id: 'continue_chapter4',
        label: '[Kapitel 4 folgt]',
        effects: [
          { type: 'set', target: 'chapter_index', value: 4 }
        ],
        next: 'c4_s01_mirror'
      }
    ],
    tags: ['station_end'],
    state_notes: [
      'Dritte station_end: memory_drift +1 (automatisch)',
      'Doppelgänger steigt ein: Identity-Drift',
      'Übergang zu Kapitel 4 (Spiegelung)'
    ],
    atmosphere: 'dark'
  }
};
