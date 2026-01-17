// ============================================================================
// NACHTZUG 19 - Kapitel 3: Wagen 7
// ============================================================================
// Szenen (27):
// Entry: c3_s01_wagen7_locked, c3_s01a_after_station, c3_s01b_boy_return
// Interludes: c3_interlude_01_lights, c3_interlude_02_announcement, c3_interlude_03_window, c3_interlude_04_corridor, c3_interlude_05_mirror
// Recorder: c3_s02_recorder_anomaly, c3_s02a_recorder_listening, c3_s02b_corridor_shift, c3_s02c_sleepless_talk
// Wagen 7: c3_s03_wagen7_approach, c3_s03a_compartment7_door, c3_s03b_inside_comp7, c3_s03c_notebooks_explore
// Truth: c3_s04_comp7_truth, c3_s04a_paradox_window, c3_s04b_third_announcement
// Kontrolle 2: c3_control_02_approach, c3_control_02_question, c3_control_02_aftermath
// Pre-End: c3_s06_passengers_vanish, c3_s06a_drift_intensifies, c3_s06b_boy_final
// End: c3_end_platform_watch, c3_end_station
// ============================================================================

import { ScenesCollection } from '../../../domain/types';

export const chapter3Scenes: ScenesCollection = {
  // ============================================================================
  // c3_s01_wagen7_locked: Einstieg - Wagen 7 ist verschlossen
  // ============================================================================
  'c3_s01_wagen7_locked': {
    id: 'c3_s01_wagen7_locked',
    chapter: 3,
    title: 'Verschlossen',
    narrative: `Du stehst vor einer Tür am Ende des Gangs.

Auf der Tür: Eine 7. Handgemalt, präzise. Kleine Buchstaben.

Du greifst nach dem Griff. Kalt. Metall. Er dreht sich nicht.

Die Tür ist verschlossen.

Du erinnerst dich nicht, diese Tür vorher gesehen zu haben. Aber du bist sicher, dass du sie gesucht hast.

Oder solltest du sie suchen?

Der Zug rattert. Die Neonröhren flackern. Aus. An. Aus. An.

Hinter dir: Schritte. Oder das Echo deiner eigenen.`,
    choices: [
      {
        id: 'try_to_open',
        label: 'Versuchen die Tür zu öffnen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_s01a_after_station'
      },
      {
        id: 'wait_at_door',
        label: 'Vor der Tür warten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s01a_after_station'
      },
      {
        id: 'knock_on_door',
        label: 'An die Tür klopfen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s01a_after_station'
      }
    ],
    tags: ['setup', 'drift_seed'],
    state_notes: [
      'Wagen 7 ist verschlossen - aber war das immer so?',
      'try_to_open erhöht conductor_attention',
      'knock_on_door erhöht memory_drift (Grenze verwischt)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s01a_after_station: Nach zweiter Station
  // ============================================================================
  'c3_s01a_after_station': {
    id: 'c3_s01a_after_station',
    chapter: 3,
    title: 'Nach dem Halt',
    narrative: `Der Zug fährt weiter. Das Rattern ist lauter geworden. Oder hörst du nur genauer hin?

Die Neonröhren flackern schneller. Nicht mehr synchron.

Du gehst zurück durch den Gang. Der Schlaflose sitzt drei Reihen weiter hinten. Seine Jacke ist jetzt schwarz.

Du erinnerst dich: Sie war rot. Oder grün. Oder beides. Oder nie eine von beidem.

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
        next: 'c3_interlude_01_lights'
      },
      {
        id: 'leave_notebook',
        label: 'Das Notizbuch liegenlassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_interlude_01_lights'
      },
      {
        id: 'read_notebook',
        label: 'Im Notizbuch lesen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s01b_boy_return'
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
  // c3_interlude_01_lights: Interlude - Lichter
  // ============================================================================
  'c3_interlude_01_lights': {
    id: 'c3_interlude_01_lights',
    chapter: 3,
    title: 'Lichter',
    narrative: `Die Neonröhren über dir flackern.

Aus. An. Aus. An.

Jedes Mal wenn das Licht zurückkommt, ist der Gang ein bisschen anders.

Ein Schatten weiter links. Eine Tür weiter rechts. Der Teppich dunkler.

Du blinzelst. Das Licht bleibt stabil.

Alles ist, wie es war. Oder wie du denkst, dass es war.`,
    choices: [
      {
        id: 'continue',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s01b_boy_return'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Lichtwechsel verändert Wahrnehmung',
      'Subtiler Drift: Räumliche Details verschieben sich'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c3_s01b_boy_return: Junge kehrt zurück
  // ============================================================================
  'c3_s01b_boy_return': {
    id: 'c3_s01b_boy_return',
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
        next: 'c3_interlude_02_announcement'
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

Das hast du ihm gesagt. In einem anderen Gespräch. Aber wie ist es auf der Kassette?

Der Junge nickt. „Der Zug zeichnet alles auf."`,
    choices: [
      {
        id: 'listen_more',
        label: 'Weiterhören',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s02a_recorder_listening'
      },
      {
        id: 'stop_recorder',
        label: 'Den Rekorder ausschalten',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c3_interlude_02_announcement'
      },
      {
        id: 'ask_boy_how',
        label: '„Wie funktioniert das?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 2 }
        ],
        next: 'c3_s02a_recorder_listening'
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
  // c3_s02a_recorder_listening: Kassette weiterhören
  // ============================================================================
  'c3_s02a_recorder_listening': {
    id: 'c3_s02a_recorder_listening',
    chapter: 3,
    title: 'Aufnahme (Fortsetzung)',
    narrative: `Die Kassette läuft weiter.

Eine neue Stimme. Comp7:

„—Passagier ohne Ticket. Kapitel 3. Kontrolle kommt. Er muss etwas geben—"

Das hat sie nie gesagt. Oder doch? Oder wird sie es noch sagen?

Dann Rauschen. Ein Schienenstoß. Das Klacken der Türen.

Eine tiefere Stimme. Der Schaffner:

„—Warum sind Sie hier—"

Die Frage. Wieder die gleiche Frage.

Dann deine Stimme: „Ich—"

Stille.

Der Junge nimmt dir den Rekorder aus der Hand. „Manche Antworten stehen noch nicht drauf," sagt er.`,
    choices: [
      {
        id: 'ask_what_answer',
        label: '„Welche Antwort soll ich geben?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c3_s02b_corridor_shift'
      },
      {
        id: 'take_recorder_back',
        label: 'Den Rekorder zurücknehmen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s02b_corridor_shift'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Kassette spielt Zukunft ab: Kontrolle 2 wird vorhergesagt',
      'ask_what_answer: Spieler sucht Guidance'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_interlude_02_announcement: Interlude - Durchsage verzerrt
  // ============================================================================
  'c3_interlude_02_announcement': {
    id: 'c3_interlude_02_announcement',
    chapter: 3,
    title: 'Durchsage',
    narrative: `Die Lautsprecher knacken.

„Sehr—[RAUSCHEN]—Damen und—[FEHLER]—"

Die Stimme ist langsamer. Tiefer. Wie eine Schallplatte auf falscher Geschwindigkeit.

„—erreichen—Station—[GELÖSCHT]—"

Der Name der Station ist nicht da. Nur ein langer Ton.

„—Bitte—[WIEDERHOLUNG]—Ticket—bereithalten—[WIEDERHOLUNG]—"

Das Wort „Ticket" wiederholt sich. Siebenmal. Achtmal. Du zählst nicht mehr.

Dann Stille.`,
    choices: [
      {
        id: 'continue',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_s02b_corridor_shift'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Durchsage stark verzerrt: Systemfehler eskaliert',
      'conductor_attention steigt: Kontrolle rückt näher'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c3_s02b_corridor_shift: Gang verschiebt sich
  // ============================================================================
  'c3_s02b_corridor_shift': {
    id: 'c3_s02b_corridor_shift',
    chapter: 3,
    title: 'Verschiebung',
    narrative: `Du gehst durch den Gang. Zurück zu deinem Platz.

Der Gang ist anders. Die Abteile sind nicht mehr in der gleichen Reihenfolge.

Vorhin: Schlaflosen-Abteil, dann leeres Abteil, dann das mit der Zeitung.

Jetzt: Leeres Abteil, Zeitung, dann Schlaflosen.

Du zählst die Abteile. Immer noch acht. Aber die Positionen haben gewechselt.

Der Schlaflose winkt dir zu. Als hätte er dich erwartet.`,
    choices: [
      {
        id: 'ignore_sleepless',
        label: 'Weitergehen ohne zu reagieren',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_interlude_03_window'
      },
      {
        id: 'talk_to_sleepless',
        label: 'Zum Schlaflosen gehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c3_s02c_sleepless_talk'
      },
      {
        id: 'count_compartments',
        label: 'Die Abteile nochmal zählen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_interlude_03_window'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Abteil-Reihenfolge ändert sich: Raumlogik bricht',
      'talk_to_sleepless führt zu conditional Szene (nur wenn rel >= 1)',
      'count_compartments: Obsession mit Realität erhöht drift'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c3_s02c_sleepless_talk: Schlafloser warnt
  // (CONDITION: rel_sleepless >= 1)
  // ============================================================================
  'c3_s02c_sleepless_talk': {
    id: 'c3_s02c_sleepless_talk',
    chapter: 3,
    title: 'Warnung',
    narrative: `Du setzt dich neben den Schlaflosen.

„Du suchst Wagen 7," sagt er. Keine Frage.

„Woher—"

„Alle suchen Wagen 7. Am Ende. Oder am Anfang. Je nachdem."

Er deutet nach vorne. „Die Tür ist jetzt offen. War sie vorher nicht. Aber jetzt ist sie es."

Du erinnerst dich: Die Tür war verschlossen. Du hast daran gerüttelt.

„Oder wird sie es sein," sagt er. „Zeit funktioniert hier anders. Kontrolle kommt bald. Du musst etwas haben. Etwas geben. Etwas opfern."

Seine Augen sind müde. „Ich hatte nichts zu geben. Jetzt bin ich immer hier."`,
    choices: [
      {
        id: 'ask_what_to_give',
        label: '„Was soll ich geben?"',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c3_interlude_03_window'
      },
      {
        id: 'refuse_advice',
        label: '„Ich finde einen anderen Weg"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c3_interlude_03_window'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'CONDITION: Nur sichtbar wenn rel_sleepless >= 1',
      'Schlafloser warnt vor Kontrolle 2',
      'refuse_advice verschlechtert Beziehung'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c3_interlude_03_window: Interlude - Fenster
  // ============================================================================
  'c3_interlude_03_window': {
    id: 'c3_interlude_03_window',
    chapter: 3,
    title: 'Fenster',
    narrative: `Du schaust aus dem Fenster.

Draußen: Keine Landschaft. Keine Dunkelheit.

Nur Lichter. Viele. Sie bewegen sich parallel zum Zug.

Du erkennst Formen. Fenster. Abteile. Menschen.

Es ist ein anderer Zug. Er fährt neben euch.

Du siehst eine Person am Fenster. Sie schaut zurück.

Sie hebt die Hand. Du hebst deine Hand.

Sie bewegt sich. Du bewegst dich.

Es ist dein Spiegelbild.

Aber der andere Zug fährt in die entgegengesetzte Richtung.`,
    choices: [
      {
        id: 'continue',
        label: 'Wegschauen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s03_wagen7_approach'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Spiegelbild in anderem Zug: Identity-Drift',
      'Züge fahren in entgegengesetzte Richtungen: Paradox'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s03_wagen7_approach: Annäherung an Wagen 7
  // ============================================================================
  'c3_s03_wagen7_approach': {
    id: 'c3_s03_wagen7_approach',
    chapter: 3,
    title: 'Die Sieben',
    narrative: `Du gehst nach vorne. Oder nach hinten. Der Gang sieht gleich aus in beide Richtungen.

Am Ende: Die Tür. Die 7.

Sie ist angelehnt. War sie vorher verschlossen? Du bist sicher, dass sie verschlossen war.

Aber jetzt steht sie offen.

Licht fällt durch den Spalt. Warmes Licht. Nicht das kalte Neonlicht des Gangs.

Du hörst Papier rascheln. Eine Stimme. Comp7.

„Du kannst reinkommen. Ich weiß, dass du da bist."`,
    choices: [
      {
        id: 'enter_immediately',
        label: 'Sofort eintreten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s03b_inside_comp7'
      },
      {
        id: 'examine_door',
        label: 'Die Tür untersuchen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_s03a_compartment7_door'
      },
      {
        id: 'call_out',
        label: '„Comp7?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s03a_compartment7_door'
      }
    ],
    tags: ['setup'],
    state_notes: [
      'Tür steht offen - war vorher verschlossen',
      'enter_immediately überspringt Untersuchung',
      'call_out stärkt Beziehung'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s03a_compartment7_door: Tür zu Abteil 7
  // ============================================================================
  'c3_s03a_compartment7_door': {
    id: 'c3_s03a_compartment7_door',
    chapter: 3,
    title: 'Die Tür',
    narrative: `Du stehst vor der Tür. Die 7 ist präzise gemalt. Kleine, saubere Striche.

Die gleiche Handschrift wie in Comp7s Notizbuch.

Die Tür öffnet sich weiter. Von allein. Langsam.

Kein Quietschen. Kein Geräusch.

Innen: Ein größerer Raum. Unmöglich groß für ein Abteil.

An den Wänden: Notizbücher. Dutzende. Alle aufgeschlagen.

Comp7 sitzt am Tisch. Ihr Gesicht immer noch verschwommen. Aber weniger als vorher.

Du erkennst Züge. Augen. Mund. Eine Narbe am Kinn.

„Willkommen," sagt sie. „Du bist spät. Oder früh. Je nachdem."`,
    choices: [
      {
        id: 'enter_cautiously',
        label: 'Vorsichtig eintreten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s03b_inside_comp7'
      },
      {
        id: 'ask_from_doorway',
        label: '„Was ist das hier?"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s03b_inside_comp7'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Tür öffnet sich selbst: Zuglogik nimmt Kontrolle',
      'Comp7s Gesicht wird klarer: Drift stabilisiert',
      'Raum ist unmöglich groß'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s03b_inside_comp7: In Abteil 7
  // ============================================================================
  'c3_s03b_inside_comp7': {
    id: 'c3_s03b_inside_comp7',
    chapter: 3,
    title: 'Wagen 7',
    narrative: `Du trittst ein.

Das Abteil ist größer. Viel größer als die anderen. Unmöglich größer.

An den Wänden: Notizbücher. Dutzende. Alle aufgeschlagen. Alle vollgeschrieben.

Comp7 sitzt am Tisch. Ihr Gesicht immer noch unscharf, aber du siehst mehr jetzt.

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
        next: 'c3_s03c_notebooks_explore'
      },
      {
        id: 'look_out_window',
        label: 'Aus dem Fenster schauen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_interlude_04_corridor'
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
  // c3_s03c_notebooks_explore: Notizbücher erkunden
  // ============================================================================
  'c3_s03c_notebooks_explore': {
    id: 'c3_s03c_notebooks_explore',
    chapter: 3,
    title: 'Aufzeichnungen',
    narrative: `Du gehst zu den Notizbüchern.

Jedes ist aufgeschlagen. Jedes zeigt eine andere Seite.

„Passagier #12: Hat Ticket. Steigt bei Station 4 aus. Vergisst alles."

„Passagier #7: Kein Ticket. Opfert Erinnerung. Wird Schaffner-Assistent."

„Passagier #19: Kein Ticket. Findet Wagen 7. Bleibt."

Die Handschrift ist überall die gleiche. Präzise. Klein. Comp7s Handschrift.

Ein Notizbuch zeigt ein Foto. Du erkennst den Bahnsteig. Den leeren Bahnsteig aus Kapitel 1.

Auf dem Foto: Eine Person. Du kannst das Gesicht nicht erkennen. Zu verschwommen.

Aber du erkennst die Kleidung. Deine Kleidung.

„Du bist schon mal hier gewesen," sagt Comp7.`,
    choices: [
      {
        id: 'ask_when',
        label: '„Wann war ich hier?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s04_comp7_truth'
      },
      {
        id: 'deny',
        label: '„Das kann nicht sein"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s04_comp7_truth'
      },
      {
        id: 'read_own_entry',
        label: 'Nach dem eigenen Eintrag suchen',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c3_s04_comp7_truth'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'CONDITION: read_own_entry nur bei tickets_truth >= 2',
      'Notizbücher zeigen andere Passagiere (Timeline-Varianten)',
      'Foto zeigt Spieler auf Bahnsteig: Loop-Hinweis'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_interlude_04_corridor: Interlude - Endlosgang
  // ============================================================================
  'c3_interlude_04_corridor': {
    id: 'c3_interlude_04_corridor',
    chapter: 3,
    title: 'Wiederholung',
    narrative: `Du verlässt Wagen 7. Oder versuchst es.

Der Gang ist anders. Er wiederholt sich.

Abteil 1. Abteil 2. Abteil 3.

Dann wieder: Abteil 1. Abteil 2. Abteil 3.

Die gleichen Abteile. In der gleichen Reihenfolge.

Du gehst weiter. Die Abteile wiederholen sich.

Du drehst dich um. Gehst zurück. Die gleiche Wiederholung.

Dann: Ein Unterschied. Eine Tür mit einer 7.

Du öffnest sie. Du bist wieder in Wagen 7.

Comp7 schaut auf. „Der Gang hat kein Ende. Nur Schleifen."`,
    choices: [
      {
        id: 'continue',
        label: 'Zurück zu Comp7',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s04_comp7_truth'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Gang wird endlose Schleife',
      'Wagen 7 ist immer erreichbar (Safe Space)'
    ],
    atmosphere: 'tense'
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

Sie schließt das Notizbuch. „Der Junge sagt, es bist du. Der Schlaflose sagt, es bin ich. Ich weiß es nicht mehr."`,
    choices: [
      {
        id: 'accept_truth',
        label: '„Ich verstehe"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s04a_paradox_window'
      },
      {
        id: 'deny_truth',
        label: '„Das kann nicht sein"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_interlude_05_mirror'
      },
      {
        id: 'ask_who',
        label: '„Wer hält uns hier?"',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s04a_paradox_window'
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
  // c3_s04a_paradox_window: Fenster-Paradox
  // ============================================================================
  'c3_s04a_paradox_window': {
    id: 'c3_s04a_paradox_window',
    chapter: 3,
    title: 'Paradox',
    narrative: `Du schaust aus dem Fenster von Wagen 7.

Draußen: Der Gang. Du siehst dich selbst.

Du stehst im Gang. Schaust aus einem Fenster. Siehst in Wagen 7.

Siehst dich selbst, wie du aus dem Fenster schaust.

„Schleife," sagt Comp7. „Innen ist außen. Außen ist innen."

Du hebst die Hand. Das andere Du hebt auch die Hand.

Aber es ist keine Spiegelung. Das andere Du bewegt sich anders. Später. Oder früher.

„Welches bin ich?" fragst du.

Comp7 zuckt mit den Schultern. „Beide. Oder keines."`,
    choices: [
      {
        id: 'accept_paradox',
        label: 'Das Paradox akzeptieren',
        condition: {
          type: 'compare',
          target: 'memory_drift',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s04b_third_announcement'
      },
      {
        id: 'look_away',
        label: 'Wegschauen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s04b_third_announcement'
      },
      {
        id: 'try_to_reach',
        label: 'Versuchen das andere Du zu erreichen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s04b_third_announcement'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'CONDITION: accept_paradox nur bei memory_drift >= 2',
      'Fenster zeigt Paradox-Schleife: Spieler sieht sich selbst',
      'accept_paradox: Hohe Truth, aber hoher Drift-Preis'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_interlude_05_mirror: Interlude - Spiegel
  // ============================================================================
  'c3_interlude_05_mirror': {
    id: 'c3_interlude_05_mirror',
    chapter: 3,
    title: 'Reflektion',
    narrative: `Du gehst durch den Gang. Zurück zu deinem Platz.

An der Wand: Ein Spiegel. Du erinnerst dich nicht, einen Spiegel gesehen zu haben.

Du schaust hinein.

Dein Gesicht ist unscharf. Nicht verschwommen. Sondern doppelt.

Zwei Gesichter überlagert. Leicht verschoben. Eines lächelt. Eines nicht.

Du blinzelst. Das Bild stabilisiert sich. Ein Gesicht. Deines.

Oder das, an das du dich erinnerst.`,
    choices: [
      {
        id: 'continue',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s04b_third_announcement'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Spiegel zeigt doppeltes Gesicht: Identity-Drift',
      'Subtiler Hinweis: Spieler ist möglicherweise mehrere Versionen'
    ],
    atmosphere: 'dark'
  },

  // ============================================================================
  // c3_s04b_third_announcement: Dritte Durchsage
  // ============================================================================
  'c3_s04b_third_announcement': {
    id: 'c3_s04b_third_announcement',
    chapter: 3,
    title: 'Ankündigung',
    narrative: `Die Lautsprecher knacken. Laut. Zu laut.

„Sehr—[RAUSCHEN]—Fahrgäste—"

Die Stimme ist verzerrt. Nicht mehr menschlich. Tiefer. Mechanisch.

„—erreichen—[FEHLER]—Station—[GELÖSCHT]—"

„—Kontrolle—[WIEDERHOLUNG]—Kontrolle—[WIEDERHOLUNG]—"

Das Wort wiederholt sich. Immer wieder. Schneller.

„Kontrolle-Kontrolle-Kontrolle-Kontrolle—"

Dann Stille.

Comp7 steht auf. „Sie kommen. Wieder. Sie kommen immer wieder."

Du hörst Schritte. Schwer. Rhythmisch. Näher.

Der Schaffner.`,
    choices: [
      {
        id: 'hide_in_comp7',
        label: 'In Wagen 7 bleiben',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_control_02_approach'
      },
      {
        id: 'go_to_control',
        label: 'Rausgehen zur Kontrolle',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_control_02_approach'
      },
      {
        id: 'ask_comp7_help',
        label: 'Comp7 um Hilfe bitten',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c3_control_02_approach'
      }
    ],
    tags: [],
    state_notes: [
      'Durchsage stark verzerrt: Systemfehler eskaliert',
      'ask_comp7_help: Starke Beziehung (+2)',
      'Vorbereitung auf Kontrolle 2'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_control_02_approach: Kontrolle 2 - Annäherung (Set-Piece Teil 1)
  // ============================================================================
  'c3_control_02_approach': {
    id: 'c3_control_02_approach',
    chapter: 3,
    title: 'Kontrolle - Annäherung',
    narrative: `Die Schritte werden lauter.

Du siehst ihn durch die Tür von Wagen 7. Der Schaffner.

Er ist größer als vorhin. Oder du bist kleiner. Schwer zu sagen.

Er geht langsam durch den Gang. Öffnet jede Tür. Schaut in jedes Abteil.

Bei jedem Abteil bleibt er stehen. Nickt. Macht eine Notiz auf seiner Kelle.

Dann geht er weiter.

Er kommt näher. Drei Abteile entfernt. Zwei. Eins.

Comp7 steht neben dir. „Er kann Wagen 7 nicht betreten," flüstert sie. „Aber er kann warten."

Der Schaffner bleibt vor der Tür stehen. Schaut direkt zu dir.

„Fahrkarten bitte," sagt er.`,
    choices: [
      {
        id: 'step_outside',
        label: 'Nach draußen gehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_control_02_question'
      },
      {
        id: 'stay_inside',
        label: 'In Wagen 7 bleiben',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 2 }
        ],
        next: 'c3_control_02_question'
      },
      {
        id: 'let_comp7_talk',
        label: 'Comp7 sprechen lassen',
        condition: {
          type: 'compare',
          target: 'rel_comp7',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_control_02_question'
      }
    ],
    tags: ['control'],
    state_notes: [
      'CONDITION: let_comp7_talk nur bei rel_comp7 >= 2',
      'stay_inside erhöht attention stärker (Flucht)',
      'Wagen 7 ist Safe Space, aber Kontrolle ist unvermeidlich'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_control_02_question: Kontrolle 2 - Befragung (Set-Piece Teil 2)
  // ============================================================================
  'c3_control_02_question': {
    id: 'c3_control_02_question',
    chapter: 3,
    title: 'Kontrolle - Teil 2',
    narrative: `Der Schaffner steht vor dir. Er ist größer als bei der ersten Kontrolle.

Seine Kelle ist nicht leer. Darauf steht:

„Passagier ohne Ticket. Station 3. Wiederholen: Station 3."

„Sie haben zwei Optionen," sagt er. „Sie können aussteigen. Oder Sie können ein Ticket kaufen."

„Mit was?"

Er deutet auf den Rekorder. „Mit dem. Oder mit der Wahrheit. Oder mit jemandem."

Seine Stimme ist tiefer. Mechanischer. „Oder Sie können nichts geben. Dann komme ich bei der nächsten Station wieder. Und die Frage wird härter."`,
    choices: [
      {
        id: 'offer_recorder',
        label: 'Den Rekorder anbieten',
        condition: {
          type: 'bool',
          target: 'has_recorder',
          value: true
        },
        effects: [
          { type: 'set', target: 'has_recorder', value: false },
          { type: 'inc', target: 'tickets_guilt', value: 2 },
          { type: 'dec', target: 'conductor_attention', value: 2 }
        ],
        next: 'c3_control_02_aftermath'
      },
      {
        id: 'offer_truth',
        label: '„Die Wahrheit: Ich gehöre hierher"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_control_02_aftermath'
      },
      {
        id: 'offer_someone',
        label: '„Was meinst du mit ›jemandem‹?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_control_02_aftermath'
      },
      {
        id: 'offer_nothing',
        label: 'Nichts sagen',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 3 }
        ],
        next: 'c3_control_02_aftermath'
      }
    ],
    tags: ['control'],
    state_notes: [
      'CONDITION: offer_recorder nur wenn has_recorder == true',
      'CONDITION: offer_nothing nur wenn conductor_attention >= 3 (härtere Version)',
      'offer_recorder: Verlust von Key-Item, senkt attention stark',
      'offer_someone: Deutet Opfer-Mechanik an'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_control_02_aftermath: Kontrolle 2 - Nachwirkung (Set-Piece Teil 3)
  // ============================================================================
  'c3_control_02_aftermath': {
    id: 'c3_control_02_aftermath',
    chapter: 3,
    title: 'Kontrolle - Nachwirkung',
    narrative: `Der Schaffner bleibt stehen. Bewegt sich nicht.

„Sie haben gegeben," sagt er. „Aber nicht genug."

Comp7 tritt aus Wagen 7. Ihr Gesicht ist klarer jetzt. Schärfer. Du erkennst sie.

„Er kann dich nicht rauswerfen," sagt sie. „Weil du schon draußen bist. Weil wir alle draußen sind."

Der Schaffner dreht sich zu ihr. „Sie sollten nicht hier sein."

„Niemand sollte hier sein," sagt Comp7. „Aber wir sind es trotzdem."

Der Schaffner nickt. Langsam. Macht eine Notiz auf seiner Kelle.

Dann geht er weiter. Seine Schritte entfernen sich.

Comp7 schaut dich an. „Er kommt wieder. Bei der nächsten Station. Und der nächsten. Bis du die richtige Antwort gibst."

„Was ist die richtige Antwort?"

„Das weiß niemand," sagt sie. „Vielleicht gibt es keine."`,
    choices: [
      {
        id: 'thank_comp7',
        label: '„Danke"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c3_s06_passengers_vanish'
      },
      {
        id: 'ask_how_many',
        label: '„Wie viele Stationen noch?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_s06_passengers_vanish'
      },
      {
        id: 'walk_away',
        label: 'Weggehen ohne zu antworten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s06_passengers_vanish'
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
  // c3_s06_passengers_vanish: Passagiere verschwinden
  // ============================================================================
  'c3_s06_passengers_vanish': {
    id: 'c3_s06_passengers_vanish',
    chapter: 3,
    title: 'Leere',
    narrative: `Du gehst durch den Gang.

Der Schlaflose ist weg. Sein Abteil leer.

Der Junge ist weg. Sein Abteil leer.

Die Frau mit der Zeitung. Weg.

Alle Abteile leer. Nur noch Sitze. Stille.

Du bist allein im Zug.

Oder fast allein. Comp7 steht in der Tür von Wagen 7. Schaut dir nach.

„Sie kommen wieder," ruft sie. „Bei der nächsten Station. Aber anders."

Du verstehst nicht. Aber du gehst weiter.`,
    choices: [
      {
        id: 'go_to_comp7',
        label: 'Zu Comp7 zurückgehen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s06a_drift_intensifies'
      },
      {
        id: 'search_train',
        label: 'Den Zug durchsuchen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s06a_drift_intensifies'
      },
      {
        id: 'sit_down',
        label: 'Sich hinsetzen und warten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s06a_drift_intensifies'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Alle Passagiere verschwunden: Drift-Höhepunkt',
      'Nur Comp7 bleibt (Safe Space / Anker)',
      'search_train erhöht drift (Obsession)'
    ],
    atmosphere: 'dark'
  },

  // ============================================================================
  // c3_s06a_drift_intensifies: Drift verstärkt sich
  // ============================================================================
  'c3_s06a_drift_intensifies': {
    id: 'c3_s06a_drift_intensifies',
    chapter: 3,
    title: 'Auflösung',
    narrative: `Der Gang verändert sich.

Die Fenster zeigen nicht mehr nach draußen. Sie zeigen andere Gänge. Andere Züge. Oder den gleichen Zug.

Die Neonröhren flackern. Manche sind aus. Manche sind zu hell.

Du zählst die Abteile. Eins. Zwei. Drei. Vier. Fünf. Sechs. Sieben.

Dann wieder: Eins. Zwei. Drei.

Der Gang hat keine Enden mehr. Er wiederholt sich.

Du gehst weiter. Die Wiederholung bleibt.

Dann: Ein Unterschied. Eine Tür. Die 7.

Dahinter: Der Junge. Er sitzt in seinem Abteil. Schaut dich an.

„Manche Leute kommen zurück," sagt er. „Aber nicht die gleichen."`,
    choices: [
      {
        id: 'talk_to_boy',
        label: 'Mit dem Jungen reden',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c3_s06b_boy_final'
      },
      {
        id: 'ignore_boy',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_end_platform_watch'
      },
      {
        id: 'ask_where_others',
        label: '„Wo sind die anderen?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_s06b_boy_final'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Gang wird endlose Schleife',
      'Junge kehrt zurück - aber "nicht der gleiche"',
      'talk_to_boy führt zu conditional Szene'
    ],
    atmosphere: 'dark'
  },

  // ============================================================================
  // c3_s06b_boy_final: Finale Begegnung mit Junge
  // (CONDITION: rel_boy >= 1 oder vorherige Choice)
  // ============================================================================
  'c3_s06b_boy_final': {
    id: 'c3_s06b_boy_final',
    chapter: 3,
    title: 'Der Junge',
    narrative: `Du setzt dich neben den Jungen.

„Wo warst du?" fragst du.

„Überall," sagt er. „Nirgends. Der Zug ist groß."

Er zeigt dir den Rekorder. „Die Aufnahme ist fertig jetzt. Willst du hören?"

Du nickst.

Er drückt auf Play.

Stille. Dann eine Stimme. Deine Stimme:

„—ich bin bereit—"

Das hast du noch nicht gesagt. Aber du weißt, dass du es sagen wirst.

„Wofür bereit?" fragst du.

Der Junge zuckt mit den Schultern. „Das weiß ich nicht. Das steht noch nicht auf der Kassette."`,
    choices: [
      {
        id: 'take_boys_recorder',
        label: 'Den Rekorder nehmen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'set', target: 'has_recorder', value: true }
        ],
        next: 'c3_end_platform_watch'
      },
      {
        id: 'leave_recorder',
        label: 'Den Rekorder beim Jungen lassen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c3_end_platform_watch'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'CONDITION: Nur sichtbar wenn rel_boy >= 1 oder via c3_s06a',
      'Kassette spielt Zukunft ab: "ich bin bereit"',
      'take_boys_recorder: Möglichkeit has_recorder wiederzubekommen'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c3_end_platform_watch: Bahnsteig beobachten
  // ============================================================================
  'c3_end_platform_watch': {
    id: 'c3_end_platform_watch',
    chapter: 3,
    title: 'Beobachtung',
    narrative: `Der Zug wird langsamer.

Du gehst zur Tür. Schaust durch das Fenster.

Draußen: Ein Bahnsteig. Leer.

Aber nicht ganz.

Am Ende des Bahnsteigs steht jemand. Eine Gestalt.

Du kannst das Gesicht nicht erkennen. Zu weit weg. Zu verschwommen.

Aber du erkennst die Haltung. Die Kleidung.

Es ist jemand, den du kennst.

Oder warst.

Oder sein wirst.

Der Zug hält.`,
    choices: [
      {
        id: 'try_to_exit',
        label: 'Versuchen auszusteigen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_end_station'
      },
      {
        id: 'stay_on_train',
        label: 'Im Zug bleiben',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_end_station'
      },
      {
        id: 'wave_to_figure',
        label: 'Der Gestalt zuwinken',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c3_end_station'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Gestalt auf Bahnsteig: Doppelgänger oder Erinnerung',
      'Vorbereitung auf station_end'
    ],
    atmosphere: 'dark'
  },

  // ============================================================================
  // c3_end_station: Dritte Station (station_end)
  // ============================================================================
  'c3_end_station': {
    id: 'c3_end_station',
    chapter: 3,
    title: 'Dritter Halt',
    narrative: `Die Tür öffnet sich.

Der Bahnsteig ist nicht leer.

Da steht jemand. Eine Gestalt. Gesicht unscharf.

Du erkennst die Kleidung. Die Haltung.

Es ist der Schlaflose. Oder der Junge. Oder Comp7.

Oder du.

Die Gestalt winkt. Steigt ein.

Geht an dir vorbei. Langsam. Du hörst ihre Schritte. Sie klingen wie deine.

Sie setzt sich in ein Abteil. Dein Abteil.

Die Tür schließt sich.

Der Zug fährt weiter.

Du bleibst stehen. Zwischen den Wagen.

Durch das Fenster siehst du: Die Gestalt öffnet ein Notizbuch. Beginnt zu schreiben.`,
    choices: [
      {
        id: 'continue_to_chapter_4',
        label: 'Weitergehen',
        effects: [
          { type: 'set', target: 'chapter_index', value: 4 },
          { type: 'inc', target: 'station_count', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s01_mirror'
      }
    ],
    tags: ['station_end'],
    exit_effects: [
      { type: 'inc', target: 'memory_drift', value: 1 }
    ],
    state_notes: [
      'Dritte station_end: memory_drift +1 (automatisch)',
      'Doppelgänger steigt ein: Identity-Drift',
      'Übergang zu Kapitel 4 (Spiegelung)'
    ],
    atmosphere: 'dark'
  }
};
