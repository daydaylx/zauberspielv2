// ============================================================================
// NACHTZUG 19 - Kapitel 1: Leerer Bahnsteig
// ============================================================================
// Szenen (12):
// - c1_s01_platform: Einstieg, leerer Bahnsteig
// - c1_s01a_platform_details: Bahnsteig genauer untersuchen
// - c1_s02_train_appears: Zug erscheint
// - c1_s02a_train_exterior: Zug von außen betrachten
// - c1_s03_inside_train: Im Zug
// - c1_s03a_corridor_walk: Gang-Wanderung
// - c1_s04_sleepless_intro: Der Schlaflose
// - c1_s04a_sleepless_past: Tiefere Konversation
// - c1_s05_first_anomaly: Erste Anomalie (Name fehlt)
// - c1_s05a_other_passengers: Andere Passagiere beobachten
// - c1_s05b_compartment7_tease: Abteil 7 Andeutung
// - c1_end_station: Station Ende (drift)
// ============================================================================

import { ScenesCollection } from '../../../domain/types';

export const chapter1Scenes: ScenesCollection = {
  // ============================================================================
  // c1_s01_platform: Einstieg
  // ============================================================================
  'c1_s01_platform': {
    id: 'c1_s01_platform',
    chapter: 1,
    title: 'Leerer Bahnsteig',
    narrative: `Der Bahnsteig ist leer. Nicht „spät abends leer", sondern falsch leer.

Keine Werbeplakate. Keine Bänke. Keine Automaten. Nur nackte Wände aus Beton, fleckig von Feuchtigkeit. Eine Neonröhre flackert über dir. Das Licht ist kalt, blaugrün.

Die Anzeigetafel zeigt: 23:47.

Kein Text. Kein „Nächster Zug". Nur ein blinkendes Feld, leer wie der Bahnsteig.

Du weißt nicht mehr, warum du hier bist. Die Erinnerung fühlt sich an wie ein Traum, der dir beim Aufwachen durch die Finger rinnt.

Aber du weißt: Du wartest auf etwas.

Die Luft riecht nach altem Zigarettenrauch und Maschinenöl. Kalt. Zu kalt für Juni.`,
    choices: [
      {
        id: 'look_around',
        label: 'Umsehen und warten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s01a_platform_details'
      },
      {
        id: 'check_phone',
        label: 'Handy checken',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s01a_platform_details'
      },
      {
        id: 'try_leave',
        label: 'Versuchen zu gehen',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_s01a_platform_details'
      }
    ],
    tags: ['setup'],
    state_notes: [
      'Erste Ticket-Verteilung: Truth (beobachten), Escape (ablenken), Guilt (gehen wollen)',
      'try_leave erhöht conductor_attention (wird später relevant)'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c1_s01a_platform_details: Bahnsteig genauer untersuchen
  // ============================================================================
  'c1_s01a_platform_details': {
    id: 'c1_s01a_platform_details',
    chapter: 1,
    title: 'Details',
    narrative: `Du gehst ein paar Schritte. Der Beton unter deinen Sohlen klingt hohl.

Am Rand des Bahnsteigs: Eine gelbe Linie, abgeblättert. Dahinter die Schienen. Sie glänzen nicht. Kein Rost, aber auch kein Metall. Schwarz. Matt.

Die Uhr tickt nicht. Sie steht still. 23:47.

Du drehst dich um. Am anderen Ende des Bahnsteigs – vielleicht hundert Meter entfernt – flackert eine zweite Neonröhre. Zwischen dir und ihr: Nichts. Keine Schatten. Keine Bewegung.

Dann, ein Geräusch.

Nicht das Rattern von Schienen. Tiefer. Ein Brummen, das du im Brustkorb spürst. Von unten. Von überall.`,
    choices: [
      {
        id: 'step_back',
        label: 'Einen Schritt zurücktreten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s02_train_appears'
      },
      {
        id: 'look_tracks',
        label: 'Die Schienen fixieren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s02_train_appears'
      },
      {
        id: 'feel_guilty',
        label: 'Denken: „Ich sollte nicht hier sein"',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c1_s02_train_appears'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Schienen-Detail: schwarz/matt (erste subtile Anomalie)',
      'Uhr steht still (Zeit ist kaputt)',
      'feel_guilty erhöht memory_drift (Unsicherheit manifestiert sich)'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c1_s02_train_appears: Zug erscheint
  // ============================================================================
  'c1_s02_train_appears': {
    id: 'c1_s02_train_appears',
    chapter: 1,
    title: 'Der Zug',
    narrative: `Das Brummen wird lauter. Es kommt nicht näher – es ist einfach da.

Dann gleitet der Zug in den Bahnhof. Lautlos.

Er sieht aus wie ein alter Nachtzug. Achtziger Jahre. Abblätternde dunkelrote Farbe. Fenster zu schmal, Rahmen vergilbt. Die Wagen sind lang. Zu lang.

Durch die Scheiben siehst du Silhouetten – Menschen, die reglos auf ihren Plätzen sitzen. Niemand bewegt sich.

Die Türen öffnen sich mit einem Zischen. Warme Luft strömt heraus. Riecht nach altem Polster und etwas Süßlichem, das du nicht benennen kannst.

Niemand steigt aus.`,
    choices: [
      {
        id: 'board_immediately',
        label: 'Sofort einsteigen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s02a_train_exterior'
      },
      {
        id: 'inspect_train',
        label: 'Den Zug genauer ansehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s02a_train_exterior'
      },
      {
        id: 'hesitate',
        label: 'Zögern',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c1_s02a_train_exterior'
      }
    ],
    tags: ['setup'],
    state_notes: [
      'Hesitate erhöht memory_drift (erstes Zeichen der Unsicherheit)',
      'Süßlicher Geruch (unbenannt = unheimlich)'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c1_s02a_train_exterior: Zug von außen betrachten
  // ============================================================================
  'c1_s02a_train_exterior': {
    id: 'c1_s02a_train_exterior',
    chapter: 1,
    title: 'Von außen',
    narrative: `Du stehst vor der offenen Tür. Die Stufen sind schmal, Metall.

An der Seite des Wagens: Ein Schriftzug. Verblichen. Du kannst nur Teile lesen: „—CHTZUG 1—". Der Rest fehlt. Abgekratzt oder nie dagewesen.

Durch das nächste Fenster siehst du eine Frau. Sie starrt geradeaus. Ihre Augen bewegen sich nicht. Ihre Hände liegen gefaltet im Schoß.

Du wartest darauf, dass sie blinzelt.

Sie tut es nicht.

Hinter dir: Ein Geräusch. Schritte? Nein. Nur das Brummen, das leiser wird. Der Zug wird gleich weiterfahren. Du weißt es.`,
    choices: [
      {
        id: 'board_now',
        label: 'Einsteigen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s03_inside_train'
      },
      {
        id: 'touch_exterior',
        label: 'Die Außenwand berühren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s03_inside_train'
      },
      {
        id: 'ask_aloud',
        label: '„Ist da jemand?" rufen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_s03_inside_train'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Schriftzug unvollständig (NACHTZUG 19 versteckt)',
      'Frau blinzelt nicht (NPC-Anomalie)',
      'ask_aloud erhöht conductor_attention (Lautstärke wird registriert)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c1_s03_inside_train: Im Zug
  // ============================================================================
  'c1_s03_inside_train': {
    id: 'c1_s03_inside_train',
    chapter: 1,
    title: 'Innen',
    narrative: `Du steigst ein.

Die Tür schließt sich hinter dir mit einem finalen Klack. Der Zug setzt sich in Bewegung – sanft, als würde er schweben.

Der Wagen ist ein Gang mit Abteilen. Rote Polstersitze, abgenutzt. Messinglampen, die flackern. Holzverkleidung, die nach altem Rauch riecht.

Zur Linken: Ein Mann, mittleren Alters, der aus dem Fenster starrt. Seine Augen sind rot umrandet.

Zur Rechten: Ein leeres Abteil mit einem Koffer auf dem Sitz. Leder, verwittert. Niemand in der Nähe.`,
    choices: [
      {
        id: 'talk_to_man',
        label: 'Den Mann ansprechen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s03a_corridor_walk'
      },
      {
        id: 'examine_suitcase',
        label: 'Den Koffer untersuchen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s03a_corridor_walk'
      },
      {
        id: 'find_seat',
        label: 'Einfach einen Platz suchen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s03a_corridor_walk'
      }
    ],
    tags: [],
    state_notes: [
      'Talk_to_man etabliert erste Beziehung zu Sleepless',
      'Koffer-Hinweis: Wird in Kap. 2 relevant (Comp7-Intro)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c1_s03a_corridor_walk: Gang-Wanderung
  // ============================================================================
  'c1_s03a_corridor_walk': {
    id: 'c1_s03a_corridor_walk',
    chapter: 1,
    title: 'Gang',
    narrative: `Du gehst den Gang entlang. Die Lampen flackern im Rhythmus der Schienen. Aber es gibt kein Schienenrasseln. Nur das Brummen.

Ein Fenster zur Rechten. Draußen: Schwärze. Keine Lichter. Keine Landschaft. Nur Schwarz, das sich nicht bewegt.

Im nächsten Abteil sitzt ein Kind. Vielleicht acht Jahre alt. Es malt in ein Heft. Du siehst die Zeichnung: Ein Zug. Viel zu lang. Die Wagen sind verbunden mit Strichen, die nicht gerade sind.

Das Kind blickt auf. Sieht dich an. Sagt nichts.

Dann zurück zur Zeichnung.`,
    choices: [
      {
        id: 'ask_child',
        label: '„Was malst du?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c1_s04_sleepless_intro'
      },
      {
        id: 'look_at_drawing',
        label: 'Die Zeichnung genauer ansehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c1_s04_sleepless_intro'
      },
      {
        id: 'keep_walking_past',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s04_sleepless_intro'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Kind malt Zug (Meta-Hinweis: Zug ist zu lang)',
      'Schwärze draußen (keine Außenwelt sichtbar)',
      'look_at_drawing erhöht memory_drift (zu viel Fokus destabilisiert)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c1_s04_sleepless_intro: Der Schlaflose
  // ============================================================================
  'c1_s04_sleepless_intro': {
    id: 'c1_s04_sleepless_intro',
    chapter: 1,
    title: 'Der Schlaflose',
    narrative: `Der Mann bemerkt dich. Seine Augen sind rot umrandet, als hätte er seit Tagen nicht geschlafen.

„Du auch?" sagt er. Seine Stimme ist rau.

Du fragst: „Auch was?"

„Keine Ahnung, wo du eingestiegen bist. Kein Ticket in der Tasche. Keine Erinnerung daran, wie du hier gelandet bist."

Er lächelt müde. „Willkommen im Nachtzug."

Seine Worte treffen wie ein Schlag. Du greifst in deine Tasche. Leer. Kein Ticket. Keine Quittung. Nichts.`,
    choices: [
      {
        id: 'ask_where',
        label: '„Wo fährt der Zug hin?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s04a_sleepless_past'
      },
      {
        id: 'ask_how_long',
        label: '„Wie lange bist du schon hier?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s04a_sleepless_past'
      },
      {
        id: 'deny',
        label: '„Das kann nicht sein."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s04a_sleepless_past'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Sleepless etabliert die Grundregel: Niemand hat ein Ticket',
      'ask_where/ask_how_long: Unterschied zwischen Truth (Fakten) und Love (Empathie)',
      'deny: Escape-Pattern, verschlechtert Beziehung'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c1_s04a_sleepless_past: Tiefere Konversation
  // ============================================================================
  'c1_s04a_sleepless_past': {
    id: 'c1_s04a_sleepless_past',
    chapter: 1,
    title: 'Seine Geschichte',
    narrative: `Der Schlaflose lehnt sich zurück. „Ich weiß es nicht. Wie lange ich hier bin."

Er zeigt auf seine Uhr. Das Zifferblatt ist leer. Keine Zeiger.

„Es war Nacht, als ich eingestiegen bin. Es ist immer noch Nacht. Vielleicht war es immer Nacht."

Er sieht dich an. „Hast du jemanden gesucht? Bevor du hier warst?"

Du denkst nach. Ein Gesicht blitzt auf. Verschwimmt. Weg.

„Ich glaube schon," sagst du.

Er nickt. „Die meisten von uns suchen jemanden. Oder sie laufen weg."`,
    choices: [
      {
        id: 'admit_searching',
        label: '„Ich suche jemanden."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 2 }
        ],
        next: 'c1_s05_first_anomaly'
      },
      {
        id: 'admit_running',
        label: '„Ich laufe weg."',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s05_first_anomaly'
      },
      {
        id: 'ask_about_watch',
        label: '„Was ist mit deiner Uhr passiert?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s05_first_anomaly'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Uhr ohne Zeiger (Zeit existiert nicht), Gesicht blitzt auf (Callback)',
      'admit_searching: Love +1, rel +2 (starke emotionale Öffnung)',
      'admit_running: Guilt-Pattern (Flucht vor Verantwortung)'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c1_s05_first_anomaly: Erste Anomalie
  // ============================================================================
  'c1_s05_first_anomaly': {
    id: 'c1_s05_first_anomaly',
    chapter: 1,
    title: 'Durchsage',
    narrative: `Eine Lautsprecherdurchsage knistert durch den Wagen:

„Sehr geehrte Fahrgäste, wir erreichen in Kürze—"

Pause.

Dann, als würde jemand ein Band zurückspulen:

„—erreichen in Kürze [unverständlich]. Bitte achten Sie auf Ihre persönlichen Gegenstände."

Der Schlaflose zuckt nicht mal. Als hätte er das schon hundertmal gehört.

Du fragst: „Was war das?"

Er seufzt. „Der Name der Station. Er fehlt. Seit drei Halten. Immer dasselbe."`,
    choices: [
      {
        id: 'write_it_down',
        label: 'Versuche, es aufzuschreiben',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_s05a_other_passengers'
      },
      {
        id: 'ignore_anomaly',
        label: 'Ignorieren und weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s05a_other_passengers'
      },
      {
        id: 'ask_sleepless',
        label: 'Den Schlaflosen fragen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s05a_other_passengers'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'write_it_down erhöht conductor_attention (Aufmerksamkeit wird registriert)',
      'Erste Memory-Drift-Manifestation (Stationsname fehlt)',
      'Durchsage wiederholt sich (Loop-Mechanik)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c1_s05a_other_passengers: Andere Passagiere beobachten
  // ============================================================================
  'c1_s05a_other_passengers': {
    id: 'c1_s05a_other_passengers',
    chapter: 1,
    title: 'Die anderen',
    narrative: `Du schaust dich um.

Außer dem Schlaflosen und dem Kind: Vier weitere Passagiere. Alle sitzen allein. Alle starren aus dem Fenster in die Schwärze.

Eine Frau, Ende dreißig. Mantel zugeknöpft, obwohl es warm ist.

Ein Mann mit Brille. Er hält ein Buch. Die Seiten sind leer.

Ein Teenager mit Kopfhörern. Kein Kabel. Die Kopfhörer sind nicht angeschlossen.

Eine alte Frau. Ihre Lippen bewegen sich stumm. Als würde sie beten.

Niemand spricht. Niemand bewegt sich.`,
    choices: [
      {
        id: 'count_passengers',
        label: 'Die Passagiere zählen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s05b_compartment7_tease'
      },
      {
        id: 'approach_woman',
        label: 'Die Frau ansprechen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_s05b_compartment7_tease'
      },
      {
        id: 'leave_them_alone',
        label: 'Sie in Ruhe lassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s05b_compartment7_tease'
      }
    ],
    tags: ['setup'],
    state_notes: [
      'Leere Buchseiten (Realität löst sich auf)',
      'Kopfhörer ohne Kabel (Details stimmen nicht)',
      'approach_woman erhöht conductor_attention (Interaktion = Risiko)'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c1_s05b_compartment7_tease: Abteil 7 Andeutung
  // ============================================================================
  'c1_s05b_compartment7_tease': {
    id: 'c1_s05b_compartment7_tease',
    chapter: 1,
    title: 'Am Ende',
    narrative: `Du gehst weiter durch den Wagen. Der Gang ist länger als vorhin. Viel länger.

Am Ende siehst du eine Tür. Massiv. Holz. Mit einer Zahl darauf:

7

Daneben ein Schild, handgeschrieben: „Besetzt".

Du hörst Geräusche dahinter. Leises Kratzen. Papier auf Papier. Als würde jemand schreiben.

Der Schlaflose ruft von hinten: „Geh da nicht rein. Noch nicht."

Du drehst dich um. „Warum?"

„Du bist noch nicht bereit."`,
    choices: [
      {
        id: 'knock_on_door',
        label: 'An die Tür klopfen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 2 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c1_end_station'
      },
      {
        id: 'listen_to_sleepless',
        label: 'Auf den Schlaflosen hören',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_end_station'
      },
      {
        id: 'feel_drawn',
        label: 'Die Hand auf die Tür legen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c1_end_station'
      }
    ],
    tags: ['reveal', 'setup'],
    state_notes: [
      'Abteil 7 Intro (wird in Kap. 2 wichtig), Comp7-Beziehung etabliert',
      'knock_on_door: Truth + hohe Attention (riskante Neugier)',
      '„Noch nicht bereit" = Zugangsbedingung für später'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c1_end_station: Station Ende (R1: Drift)
  // ============================================================================
  'c1_end_station': {
    id: 'c1_end_station',
    chapter: 1,
    title: 'Halt',
    narrative: `Der Zug hält. Kein Ruck, keine Bremse. Er steht einfach.

Durch das Fenster siehst du einen Bahnsteig. Leer. Identisch zum ersten. Dieselbe Neonröhre. Dieselbe Uhr.

23:47.

Niemand steigt ein. Niemand steigt aus.

Nach dreißig Sekunden: Die Türen schließen sich. Der Zug fährt weiter.

Als du dich umdrehst, fällt dir etwas auf:

Der Schlaflose sieht anders aus. Seine Jacke ist jetzt dunkelblau. Vorher war sie grau. Du bist dir sicher.

Er bemerkt deinen Blick. „Was?"

Du sagst nichts.`,
    choices: [
      {
        id: 'continue_to_chapter_2',
        label: 'Weiter in Kapitel 2',
        effects: [
          { type: 'set', target: 'chapter_index', value: 2 }
        ],
        next: 'c2_s01_ticket_search'
      }
    ],
    tags: ['station_end'],
    state_notes: [
      'Erste station_end-Szene: memory_drift automatisch erhöht (R1)',
      'Jackenfarbe ändert sich (Drift-Effekt), Uhr zeigt wieder 23:47 (Zeit-Loop)',
      'Sleepless reagiert nicht -> niemand bemerkt außer Spieler'
    ],
    atmosphere: 'somber'
  }
};
