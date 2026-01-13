import { Scene } from '../../../domain/types';

export const scenes: Record<string, Scene> = {
  // --- KAPITEL 1 ---

  "c1_s01_platform": {
    id: "c1_s01_platform",
    kapitel: 1,
    titel: "Leerer Bahnsteig",
    narrative: "Der Bahnsteig ist leer. Der Betonboden glänzt feucht, obwohl es ein Dach gibt. Es riecht nach Ozon und altem Staub. Du weißt nicht, wie du hierher gekommen bist. Dein Kopf pocht im Rhythmus eines fernen Maschinenschlags.",
    atmosphere: "somber",
    choices: [
      {
        id: "wait",
        text: "Warten",
        effects: [
            { type: "inc", target: "tickets_truth", value: 1 }
        ],
        next: "c1_s02_train_appears"
      },
      {
        id: "look_around",
        text: "Umsehen",
        effects: [
            { type: "inc", target: "tickets_escape", value: 1 }
        ],
        next: "c1_s02_train_appears"
      }
    ]
  },

  "c1_s02_train_appears": {
    id: "c1_s02_train_appears",
    kapitel: 1,
    titel: "Der Zug",
    narrative: "Lautlos schält sich ein Zug aus der Dunkelheit. Er hat keine Lichter, nur das schwache Glimmen aus den Fenstern. Die Türen öffnen sich mit einem Seufzen.",
    atmosphere: "mystic",
    choices: [
      {
        id: "enter",
        text: "Einsteigen",
        effects: [
          { type: "set", target: "has_tag19", value: true }
        ],
        next: "c1_s03_corridor"
      }
    ]
  },

  "c1_s03_corridor": {
    id: "c1_s03_corridor",
    kapitel: 1,
    titel: "Gang",
    narrative: "Der Gang ist eng. Teppichboden, der Geräusche schluckt. An den Wänden hängen Bilder, die du nicht fixieren kannst. Sie verändern sich, wenn du blinzelst.",
    choices: [
        {
            id: "walk",
            text: "Weitergehen",
            effects: [],
            next: "c1_s04_compartment"
        }
    ]
  },

  "c1_s04_compartment": {
      id: "c1_s04_compartment",
      kapitel: 1,
      titel: "Abteil 7",
      narrative: "Du findest ein offenes Abteil. Darin sitzt ein Junge, der auf ein Tonbandgerät starrt. Er sieht nicht auf, als du eintrittst.",
      tags: ["reveal"],
      choices: [
          {
              id: "talk",
              text: "Ansprechen",
              effects: [{type: 'inc', target: 'rel_boy', value: 1}],
              next: "c1_s05_boy_talk"
          },
          {
              id: "sit",
              text: "Setzen",
              effects: [],
              next: "c1_s05_boy_ignore"
          }
      ]
  },

  "c1_s05_boy_talk": {
      id: "c1_s05_boy_talk",
      kapitel: 1,
      titel: "Kassettenjunge",
      narrative: "\"Es nimmt nicht auf\", sagt er leise. \"Es spielt nur ab. Immer wieder.\"",
      choices: [
          {
              id: "ask",
              text: "Was spielt es ab?",
              effects: [{type: 'inc', target: 'tickets_truth', value: 1}],
              next: "c1_s06_ticket_find"
          }
      ]
  },

  "c1_s05_boy_ignore": {
      id: "c1_s05_boy_ignore",
      kapitel: 1,
      titel: "Stille",
      narrative: "Du setzt dich. Der Junge drückt eine Taste. Ein Rauschen füllt den Raum.",
      choices: [
          {
              id: "listen",
              text: "Zuhören",
              effects: [],
              next: "c1_s06_ticket_find"
          }
      ]
  },

  "c1_s06_ticket_find": {
      id: "c1_s06_ticket_find",
      kapitel: 1,
      titel: "Das Ticket",
      narrative: "Auf dem Sitz neben dir liegt ein Ticket. Es ist blanko, bis auf ein Datum. Morgen.",
      choices: [
          {
              id: "take",
              text: "Einstecken",
              effects: [{type: 'inc', target: 'tickets_guilt', value: 1}], // Taking something not yours
              next: "c1_s07_station_arrival"
          },
          {
              id: "leave",
              text: "Liegenlassen",
              effects: [{type: 'inc', target: 'tickets_escape', value: 1}],
              next: "c1_s07_station_arrival"
          }
      ]
  },

  "c1_s07_station_arrival": {
      id: "c1_s07_station_arrival",
      kapitel: 1,
      titel: "Erster Halt",
      narrative: "Der Zug bremst. Draußen ist Nebel. Eine Stimme sagt: 'Niemandsland. Endstation für manche.'",
      tags: ["station_end"], // Triggers Drift
      choices: [
          {
              id: "stay",
              text: "Sitzenbleiben",
              effects: [],
              next: "c2_s01_control_start" // Transition to Chap 2
          }
      ]
  }
};
