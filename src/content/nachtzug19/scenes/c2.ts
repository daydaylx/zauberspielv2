// ============================================================================
// NACHTZUG 19 - Kapitel 2: Die erste Kontrolle
// ============================================================================
// Szenen:
// - c2_s01_ticket_search: Ticket-Suche beginnt
// - c2_s02_boy_recorder: Kassettenjunge erscheint
// - c2_s03_comp7_intro: Comp7 (mysteriöser Mitreisender)
// - c2_s04_announcement: Zweite Durchsage (mehr Drift)
// - c2_control_01: Erste Kontrolle (R2)
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
        id: 'search_compartment',
        label: 'Ein Abteil durchsuchen',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_s02_boy_recorder'
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
        next: 'c2_s03_comp7_intro'
      },
      {
        id: 'refuse_recorder',
        label: '„Das kann ich nicht annehmen"',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'dec', target: 'rel_boy', value: 1 }
        ],
        next: 'c2_s03_comp7_intro'
      },
      {
        id: 'ask_why',
        label: '„Warum gibst du mir das?"',
        effects: [
          { type: 'set', target: 'has_recorder', value: true },
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 2 }
        ],
        next: 'c2_s03_comp7_intro'
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
        next: 'c2_s04_announcement'
      },
      {
        id: 'ask_name',
        label: '„Du weißt deinen Namen nicht?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_s04_announcement'
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
      'Comp7 ist zentrale Figur (Wagen 7, Mysterium)',
      'ask_notebook: Truth-Path (Fakten sammeln)',
      'ask_name: Love-Path (Empathie zeigen)',
      'Gesicht unscharf: Drift-Effekt auf NPCs'
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
        next: 'c2_control_01'
      },
      {
        id: 'prepare_lie',
        label: '„Ich erfinde eine Geschichte"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_control_01'
      },
      {
        id: 'prepare_hide',
        label: '„Ich verstecke mich"',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 2 }
        ],
        next: 'c2_control_01'
      }
    ],
    tags: [],
    state_notes: [
      'prepare_lie/hide erhöhen conductor_attention (wird Kontrolle härter machen)',
      'Vorbereitung auf erste Kontrolle (R2)'
    ],
    atmosphere: 'tense'
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
        next: 'c2_end_station'
      },
      {
        id: 'offer_guilt',
        label: '„Ich weiß nicht, wie ich hierhergekommen bin."',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 2 }
        ],
        next: 'c2_end_station'
      },
      {
        id: 'offer_love',
        label: '„Ich suche jemanden."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 }
        ],
        next: 'c2_end_station'
      }
    ],
    tags: ['control'],
    state_notes: [
      'R2: Erste Kontrolle (Kapitel 2)',
      'Jede Antwort gibt +2 Tickets (wichtige Weichenstellung)',
      'offer_truth senkt attention (Ehrlichkeit wird belohnt)',
      'Schaffner liest von Kelle ab -> Mystery-Element'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_end_station: Zweite Station (drift)
  // ============================================================================
  'c2_end_station': {
    id: 'c2_end_station',
    chapter: 2,
    title: 'Zweiter Halt',
    narrative: `Der Schaffner geht weiter.

Der Zug hält.

Wieder ein leerer Bahnsteig. Wieder niemand steigt ein oder aus.

Du drehst dich um.

Der Schlaflose sitzt jetzt drei Reihen weiter hinten. Du bist sicher, dass er vorher vorne saß. Seine Jacke ist jetzt schwarz. War sie nicht blau?

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
      'Zweite station_end-Szene: memory_drift +1 (automatisch)',
      'Callbacks: Sleepless-Position verschoben, Jackenfarbe erneut geändert',
      'Junge verschwunden (wird in Kap. 3 erklärt)',
      'MVP-Ende: Weitere Kapitel folgen'
    ],
    atmosphere: 'somber'
  }
};
