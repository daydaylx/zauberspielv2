// ============================================================================
// NACHTZUG 19 - Kapitel 2: Die erste Kontrolle
// ============================================================================
// Szenen (erweitert auf 12):
// - c2_s01_ticket_search: Ticket-Suche beginnt
// - c2_s01a_passenger_examination: Andere Passagiere beobachten
// - c2_s02_boy_recorder: Kassettenjunge erscheint
// - c2_s02a_recorder_listening: Kassette abhören
// - c2_s02b_corridor_anomaly: Gang wird länger (Drift)
// - c2_s03_comp7_intro: Comp7 (mysteriöser Mitreisender)
// - c2_s03a_comp7_notebook: Notizbuch untersuchen
// - c2_s04_announcement: Zweite Durchsage (mehr Drift)
// - c2_s04a_conductor_approach: Schaffner nähert sich
// - c2_control_01: Erste Kontrolle (R2)
// - c2_s05_control_aftermath: Nach der Kontrolle
// - c2_end_station: Zweite Station (drift)
// ============================================================================

import { ScenesCollection } from '../../../domain/types';

export const chapter2Scenes: ScenesCollection = {
  // ============================================================================
  // c2_s01_ticket_search: Ticket-Suche
  // ============================================================================
  'c2_s01_ticket_search': {
    id: 'c2_s01_ticket_search',
    chapter: 2,
    title: 'Ohne Ticket',
    narrative: `Du gehst durch den Wagen. Der Schlaflose bleibt zurück, starrt wieder aus dem Fenster.

Du hast kein Ticket. Das wird zum Problem, wenn Kontrolle kommt. Und du weißt – ohne zu wissen, woher – dass Kontrolle kommt.

Im nächsten Abteil sitzt ein Junge, vielleicht zwölf, mit Kopfhörern. Er hält einen alten Kassettenrekorder. Das Ding ist antik. 80er Jahre.

Er bemerkt dich nicht. Oder tut so.`,
    choices: [
      {
        id: 'ask_boy',
        label: 'Den Jungen ansprechen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c2_s02_boy_recorder'
      },
      {
        id: 'examine_passengers',
        label: 'Andere Passagiere beobachten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_s01a_passenger_examination'
      },
      {
        id: 'search_compartment',
        label: 'Ein Abteil durchsuchen',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_s01a_passenger_examination'
      },
      {
        id: 'keep_walking',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s02_boy_recorder'
      }
    ],
    tags: [],
    state_notes: [
      'Boy-Intro: Love-Ticket für Kontakt',
      'search_compartment: Guilt + Attention (unerlaubtes Verhalten)'
    ],
    atmosphere: 'normal'
  },

  // ============================================================================
  // c2_s01a_passenger_examination: Passagiere beobachten
  // ============================================================================
  'c2_s01a_passenger_examination': {
    id: 'c2_s01a_passenger_examination',
    chapter: 2,
    title: 'Die Anderen',
    narrative: `Du bleibst im Gang stehen. Beobachtest.

Eine Frau, mittleren Alters, liest eine Zeitung. Du erkennst die Schlagzeile nicht. Die Buchstaben sind zu klein, oder zu verschwommen, oder beides.

Ein Mann in Anzug tippt auf seinem Laptop. Der Bildschirm zeigt nur blaues Licht. Keine Zeichen, keine Icons. Nur Blau.

Niemand redet. Niemand hustet. Niemand bewegt sich, außer in winzigen, mechanischen Gesten.

Du fragst dich: Haben die Tickets? Oder tun sie nur so?

Der Junge mit dem Kassettenrekorder sitzt noch da. Wartet.`,
    choices: [
      {
        id: 'approach_newspaper_woman',
        label: 'Die Frau mit der Zeitung ansprechen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_s02_boy_recorder'
      },
      {
        id: 'watch_laptop_man',
        label: 'Den Mann mit Laptop beobachten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s02_boy_recorder'
      },
      {
        id: 'go_to_boy',
        label: 'Zum Jungen gehen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c2_s02_boy_recorder'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Zeitungs-Schlagzeile unlesbar, Laptop zeigt nur Blau: Drift-Details',
      'approach_newspaper_woman erhöht Attention (fällt auf)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c2_s02_boy_recorder: Kassettenjunge
  // ============================================================================
  'c2_s02_boy_recorder': {
    id: 'c2_s02_boy_recorder',
    chapter: 2,
    title: 'Der Junge',
    narrative: `Der Junge nimmt die Kopfhörer ab. Ohne dass du was gesagt hättest.

„Du suchst ein Ticket," sagt er. Nicht als Frage.

Du nickst.

„Gibt's nicht. Niemand hat eins."

Er drückt auf Play. Die Kassette läuft. Ein Knistern, dann eine Stimme:

„—nächster Halt: [unverständlich]. Bitte—"

Du erkennst die Durchsage von vorhin. Aber die Aufnahme ist älter. Die Stimme klingt verzerrt.

„Hörst du das?" fragt der Junge. „Die Station. Sie war mal da. Jetzt fehlt sie."

Er reicht dir den Rekorder. „Behalt ihn. Vielleicht hilft's."`,
    choices: [
      {
        id: 'take_recorder',
        label: 'Den Rekorder nehmen',
        effects: [
          { type: 'set', target: 'has_recorder', value: true },
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c2_s02a_recorder_listening'
      },
      {
        id: 'refuse_recorder',
        label: '„Das kann ich nicht annehmen"',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'dec', target: 'rel_boy', value: 1 }
        ],
        next: 'c2_s02b_corridor_anomaly'
      },
      {
        id: 'ask_why',
        label: '„Warum gibst du mir das?"',
        effects: [
          { type: 'set', target: 'has_recorder', value: true },
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 2 }
        ],
        next: 'c2_s02a_recorder_listening'
      }
    ],
    tags: [],
    state_notes: [
      'Rekorder ist Key-Item (wird später für Drift-Varianten genutzt)',
      'ask_why: Stärkere Beziehung (+2), zeigt Empathie',
      'refuse_recorder: Guilt-Pattern, verschlechtert Beziehung'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c2_s02a_recorder_listening: Kassette abhören
  // ============================================================================
  'c2_s02a_recorder_listening': {
    id: 'c2_s02a_recorder_listening',
    chapter: 2,
    title: 'Aufnahme',
    narrative: `Du nimmst den Rekorder. Schwer. Metall und Plastik, kalt in der Hand.

Du drückst auf Rewind. Die Kassette rattert zurück. Dann Play.

Knistern. Stille. Dann:

„—geehrte Fahrgäste, wir erreichen in Kürze Bahnhof [NAME GELÖSCHT]. Bitte—"

Der Stationenname. Nicht unverständlich. Gelöscht. Als hätte jemand ihn ausradiert, aber nur akustisch.

„—steigen Sie bitte—[FEHLER]—nicht aus. Wiederholen: Nicht—"

Die Kassette springt. Knackt. Dann wieder die Stimme, aber anders. Tiefer.

„—Sie sind im NACHTZUG 19. Es gibt keinen Ausstieg."

Du drückst auf Stop. Deine Hand zittert.

Der Junge ist weg. Sein Abteil leer.`,
    choices: [
      {
        id: 'rewind_again',
        label: 'Noch einmal zurückspulen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s02b_corridor_anomaly'
      },
      {
        id: 'put_away',
        label: 'Den Rekorder weglegen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s02b_corridor_anomaly'
      },
      {
        id: 'keep_listening',
        label: 'Weiterhören',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s02b_corridor_anomaly'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Kassette enthält gelöschte Stationennamen und Warnung',
      'keep_listening/rewind_again erhöhen memory_drift (zu viel Wahrheit)',
      'Junge verschwindet spurlos: Drift-Callback'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_s02b_corridor_anomaly: Gang wird länger
  // ============================================================================
  'c2_s02b_corridor_anomaly': {
    id: 'c2_s02b_corridor_anomaly',
    chapter: 2,
    title: 'Der Gang',
    narrative: `Du gehst weiter durch den Gang.

Der Gang ist länger. Viel länger als vorhin. Du zählst die Abteile: Sechs. Sieben. Acht.

Vorhin waren es vier.

Die Neonröhren flackern. Aus. An. Aus. An. Im Rhythmus des Zuges. Oder ist es umgekehrt? Passt sich der Zug den Lichtern an?

Du bleibst stehen. Drehst dich um.

Der Gang hinter dir: Kürzer. Drei Abteile. Der Schlaflose sitzt noch da, genau wie vorhin. Oder ist es jemand anders?

Seine Jacke ist grün. War sie nicht schwarz?

Am Ende des Gangs vor dir: Ein Abteil. Tür halb offen. Licht brennt.

Jemand sitzt drin.`,
    choices: [
      {
        id: 'count_compartments',
        label: 'Die Abteile zählen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s03_comp7_intro'
      },
      {
        id: 'check_sleepless',
        label: 'Zum Schlaflosen zurückgehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c2_s03_comp7_intro'
      },
      {
        id: 'approach_lit_compartment',
        label: 'Zum beleuchteten Abteil gehen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c2_s03_comp7_intro'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Gang ändert Länge: Kernmechanik von Drift',
      'Jackenfarbe des Schlaflosen ändert sich erneut',
      'count_compartments erhöht memory_drift (Realität hinterfragen)'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_s03_comp7_intro: Comp7
  // ============================================================================
  'c2_s03_comp7_intro': {
    id: 'c2_s03_comp7_intro',
    chapter: 2,
    title: 'Abteil 7',
    narrative: `Du gehst weiter. Der Gang ist länger als vorhin. Viel länger.

Am Ende: Ein Abteil mit einer Person.

Sie sitzt im Schatten, Gesicht verdeckt. Vor ihr auf dem Tisch: Ein Notizbuch, vollgeschrieben. Kleine, präzise Schrift.

Als du vorbeigehst, spricht sie:

„Du hast den Rekorder."

Nicht als Frage. Als Feststellung.

Sie blickt auf. Gesicht unscharf. Nicht verschwommen – einfach schwer zu fokussieren.

„Ich bin Comp7," sagt sie. „Oder so nennt mich der Junge. Ich weiß meinen Namen nicht mehr."`,
    choices: [
      {
        id: 'ask_notebook',
        label: '„Was schreibst du auf?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_s03a_comp7_notebook'
      },
      {
        id: 'ask_name',
        label: '„Du weißt deinen Namen nicht?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_s03a_comp7_notebook'
      },
      {
        id: 'back_away',
        label: 'Zurückweichen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_s04_announcement'
      }
    ],
    tags: [],
    state_notes: [
      'Comp7 ist zentrale Figur (Wagen 7, Mysterium), Gesicht unscharf: Drift',
      'ask_notebook: Truth-Path (Fakten sammeln)',
      'ask_name: Love-Path (Empathie zeigen)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c2_s03a_comp7_notebook: Notizbuch untersuchen
  // ============================================================================
  'c2_s03a_comp7_notebook': {
    id: 'c2_s03a_comp7_notebook',
    chapter: 2,
    title: 'Das Notizbuch',
    narrative: `Comp7 schiebt das Notizbuch zu dir. „Schau rein. Vielleicht erkennst du was."

Du blätterst. Seite um Seite. Listen. Daten. Namen.

„Station 1: Leer. Station 2: Leer. Station 3: [GELÖSCHT]"

„Passagier #7: Schlaflosen-Mann. Jacke wechselt Farbe. Blau -> Schwarz -> Grün."

„Passagier #12: Junge mit Rekorder. Verschwindet nach Übergabe."

„Passagier #[UNLESBAR]: Du?"

Du blickst auf. „Woher weißt du das alles?"

Comp7 lächelt. Oder tut so. Ihr Gesicht ist zu unscharf, um sicher zu sein.

„Ich schreibe auf, was passiert. Immer und immer wieder. Damit ich nicht vergesse."

Sie deutet auf eine Seite weiter hinten.

„Dort steht, was als Nächstes kommt."`,
    choices: [
      {
        id: 'read_future',
        label: 'Die nächste Seite lesen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_s04_announcement'
      },
      {
        id: 'refuse_knowledge',
        label: '„Ich will es nicht wissen"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_s04_announcement'
      },
      {
        id: 'ask_purpose',
        label: '„Warum schreibst du das auf?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c2_s04_announcement'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Notizbuch zeigt Drift-Log: Jackenfarben, verschwindende NPCs',
      'read_future: Hoher Truth-Gewinn, aber memory_drift steigt',
      'ask_purpose: Stärkere Comp7-Beziehung (+2)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c2_s04_announcement: Zweite Durchsage
  // ============================================================================
  'c2_s04_announcement': {
    id: 'c2_s04_announcement',
    chapter: 2,
    title: 'Durchsage',
    narrative: `Die Lautsprecherdurchsage wieder:

„Sehr geehrte Fahrgäste—"

Du hörst genau hin.

„—wir erreichen in Kürze [unverständlich]. Die nächste Kontrolle erfolgt in Wagen 1 bis 4."

Kontrolle.

Das Wort bleibt hängen.

Comp7 schließt ihr Notizbuch. „Sie kommen. Du solltest vorbereitet sein."

„Worauf?"

„Sie fragen nach deinem Ticket. Du hast keins. Das ist ein Problem."`,
    choices: [
      {
        id: 'prepare_truth',
        label: '„Ich sage die Wahrheit"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_s04a_conductor_approach'
      },
      {
        id: 'prepare_lie',
        label: '„Ich erfinde eine Geschichte"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_s04a_conductor_approach'
      },
      {
        id: 'prepare_hide',
        label: '„Ich verstecke mich"',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 2 }
        ],
        next: 'c2_s04a_conductor_approach'
      }
    ],
    tags: [],
    state_notes: [
      'prepare_lie/hide erhöhen conductor_attention (wird Kontrolle härter)',
      'Vorbereitung auf erste Kontrolle (R2)'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_s04a_conductor_approach: Schaffner nähert sich
  // ============================================================================
  'c2_s04a_conductor_approach': {
    id: 'c2_s04a_conductor_approach',
    chapter: 2,
    title: 'Annäherung',
    narrative: `Du hörst Schritte. Schwer. Rhythmisch.

Der Schaffner kommt durch den Gang. Du siehst ihn im Spiegelbild der Fensterscheibe.

Groß. Uniform dunkelblau. Gesicht ausdruckslos.

Er stoppt bei jedem Abteil. Sagt etwas. Die Passagiere zeigen ihm etwas. Er nickt. Geht weiter.

Der Schlaflose zeigt ihm nichts. Der Schaffner nickt trotzdem.

Die Frau mit der Zeitung zeigt ihm nichts. Der Schaffner nickt trotzdem.

Jetzt ist er zwei Abteile von dir entfernt.

Comp7 flüstert: „Er kommt zu dir. Er kommt immer zu dir."

Du hast kein Ticket.`,
    choices: [
      {
        id: 'stand_ready',
        label: 'Stehenbleiben und warten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_control_01'
      },
      {
        id: 'move_to_next_car',
        label: 'In den nächsten Wagen gehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 2 }
        ],
        next: 'c2_control_01'
      },
      {
        id: 'ask_comp7_help',
        label: 'Comp7 um Hilfe bitten',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_control_01'
      }
    ],
    tags: [],
    state_notes: [
      'Schaffner akzeptiert fehlende Tickets bei anderen Passagieren',
      'move_to_next_car erhöht Attention stark (+2)',
      'stand_ready: Truth-Path (Konfrontation annehmen)'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_control_01: Erste Kontrolle (R2)
  // ============================================================================
  'c2_control_01': {
    id: 'c2_control_01',
    chapter: 2,
    title: 'Kontrolle',
    narrative: `Der Schaffner kommt.

Er ist groß. Uniform dunkelblau, zu perfekt gebügelt. Gesicht ausdruckslos.

„Fahrkarten bitte."

Du sagst: „Ich habe keine."

Er blickt auf dich herab. Lange. Zu lange.

„Kein Ticket bedeutet keine Berechtigung. Keine Berechtigung bedeutet—"

Er stoppt. Schaut auf seine Kelle. Als würde er lesen.

„—bedeutet, dass Sie an der nächsten Station aussteigen müssen."

Pause.

„Es sei denn."

Er wartet.`,
    choices: [
      {
        id: 'offer_truth',
        label: '„Ich kann nichts anbieten. Nur die Wahrheit."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_s05_control_aftermath'
      },
      {
        id: 'offer_guilt',
        label: '„Ich weiß nicht, wie ich hierhergekommen bin."',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 2 }
        ],
        next: 'c2_s05_control_aftermath'
      },
      {
        id: 'offer_love',
        label: '„Ich suche jemanden."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 }
        ],
        next: 'c2_s05_control_aftermath'
      }
    ],
    tags: ['control'],
    state_notes: [
      'R2: Erste Kontrolle (Kapitel 2)',
      'Jede Antwort gibt +2 Tickets (wichtige Weichenstellung)',
      'offer_truth senkt attention, Schaffner liest von Kelle ab'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_s05_control_aftermath: Nach der Kontrolle
  // ============================================================================
  'c2_s05_control_aftermath': {
    id: 'c2_s05_control_aftermath',
    chapter: 2,
    title: 'Danach',
    narrative: `Der Schaffner nickt. Einmal. Kurz.

„Sie bleiben sitzen," sagt er. „Vorerst."

Er geht weiter. Die Schritte entfernen sich.

Comp7 schaut dich an. „Du hast es gesehen."

„Was?"

„Die Kelle. Sie war leer. Keine Schrift. Nichts."

Du erinnerst dich. Sie hat recht. Die Kelle war leer.

„Er liest nicht ab," sagt Comp7. „Er tut nur so."

Der Schlaflose dreht sich zu euch um. „Alles tut nur so. Der Zug. Die Stationen. Wir."

Seine Jacke ist jetzt rot.`,
    choices: [
      {
        id: 'confront_sleepless',
        label: '„Deine Jacke. Sie ändert sich."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_end_station'
      },
      {
        id: 'ask_comp7_meaning',
        label: 'Comp7: „Was bedeutet das alles?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_end_station'
      },
      {
        id: 'stay_silent',
        label: 'Schweigen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_end_station'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Kelle ist leer: Schaffner folgt keinem Script',
      'Jacke des Schlaflosen ändert erneut Farbe (grün -> rot)',
      'confront_sleepless erhöht memory_drift (Realität direkt hinterfragen)'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c2_end_station: Zweite Station (drift)
  // ============================================================================
  'c2_end_station': {
    id: 'c2_end_station',
    chapter: 2,
    title: 'Zweiter Halt',
    narrative: `Der Zug hält.

Wieder ein leerer Bahnsteig. Wieder niemand steigt ein oder aus.

Du drehst dich um.

Der Schlaflose sitzt jetzt drei Reihen weiter hinten. Du bist sicher, dass er vorher vorne saß. Seine Jacke ist jetzt schwarz. War sie nicht rot?

Der Junge ist weg. Das Abteil leer.

Comp7 sitzt noch da, schreibt in ihr Notizbuch. Als wäre nichts passiert.

Der Zug fährt weiter.`,
    choices: [
      {
        id: 'end_mvp',
        label: '[Ende MVP - Kapitel 3 folgt]',
        effects: [
          { type: 'set', target: 'chapter_index', value: 3 }
        ],
        ending: 'ending_test'
      }
    ],
    tags: ['station_end'],
    state_notes: [
      'Zweite station_end: memory_drift +1 (automatisch)',
      'Sleepless-Position verschoben, Jacke wechselt (rot -> schwarz)',
      'Junge verschwunden (wird in Kap. 3 erklärt)'
    ],
    atmosphere: 'somber'
  }
};
