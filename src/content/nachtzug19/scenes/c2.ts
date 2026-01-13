import { Scene } from '../../../domain/types';

export const scenes: Record<string, Scene> = {
  // --- KAPITEL 2 ---

  "c2_s01_control_start": {
      id: "c2_s01_control_start",
      kapitel: 2,
      titel: "Schritte",
      narrative: "Der Zug fährt wieder an. Schwere Schritte im Gang. Der Schaffner. Du spürst seinen Blick durch die geschlossene Tür.",
      atmosphere: "tense",
      tags: ["control"],
      choices: [
          {
              id: "hide",
              text: "Verstecken",
              effects: [{type: 'inc', target: 'conductor_attention', value: 1}],
              next: "c2_s02_door_opens"
          },
          {
              id: "wait_calm",
              text: "Ruhig bleiben",
              effects: [{type: 'dec', target: 'conductor_attention', value: 1}], // Reduce attention
              next: "c2_s02_door_opens"
          }
      ]
  },

  "c2_s02_door_opens": {
      id: "c2_s02_door_opens",
      kapitel: 2,
      titel: "Kontrolle",
      narrative: "Die Tür gleitet auf. Eine Uniform ohne Gesicht. 'Fahrscheine, bitte.'",
      choices: [
          {
              id: "show_ticket",
              text: "Ticket zeigen", // Needs ticket logic if we implemented item check properly
              condition: { type: 'bool', target: 'has_tag19', value: true }, // Using has_tag19 as dummy ticket for now? Or just always available
              effects: [{type: 'inc', target: 'tickets_truth', value: 1}],
              next: "c2_s03_checked"
          },
          {
              id: "no_ticket",
              text: "Kein Ticket",
              effects: [{type: 'inc', target: 'conductor_attention', value: 2}],
              next: "c2_s03_warning"
          }
      ]
  },

  "c2_s03_checked": {
      id: "c2_s03_checked",
      kapitel: 2,
      titel: "Abgestempelt",
      narrative: "Er locht das Ticket. Das Loch blutet leicht. 'Gute Reise.'",
      choices: [
          {
              id: "ok",
              text: "...",
              effects: [],
              next: "c2_s04_sleepless"
          }
      ]
  },

  "c2_s03_warning": {
      id: "c2_s03_warning",
      kapitel: 2,
      titel: "Verwarnung",
      narrative: "Er macht eine Notiz in einem schwarzen Buch. 'Das nächste Mal kostet es mehr als Geld.'",
      choices: [
          {
              id: "nod",
              text: "Nicken",
              effects: [],
              next: "c2_s04_sleepless"
          }
      ]
  },

  "c2_s04_sleepless": {
      id: "c2_s04_sleepless",
      kapitel: 2,
      titel: "Die Schlaflose",
      narrative: "Im Gang steht eine Frau. Sie sieht müde aus, als hätte sie seit Jahren nicht geschlafen.",
      choices: [
          {
              id: "greet",
              text: "Grüßen",
              effects: [{type: 'inc', target: 'rel_sleepless', value: 1}],
              next: "c2_s05_end_demo"
          }
      ]
  },

  "c2_s05_end_demo": {
      id: "c2_s05_end_demo",
      kapitel: 2,
      titel: "Ende der Demo",
      narrative: "Hier endet der erste Auszug aus Nachtzug 19. Danke fürs Testen.",
      tags: ["ending"],
      choices: [
          {
              id: "restart",
              text: "Neustart",
              effects: [],
              next: "start" // Loop back
          }
      ]
  }
};
