// ============================================================================
// NACHTZUG 19 - Manifest
// ============================================================================
// Einstiegspunkt für die Nachtzug 19-Story
// ============================================================================

import { Manifest, EndingsCollection } from '../../domain/types';

export const nachtzug19Manifest: Manifest = {
  id: 'nachtzug19',
  title: 'NACHTZUG 19',
  start_scene_id: 'c1_s01_platform',
  chapters: [
    {
      number: 1,
      title: 'Leerer Bahnsteig',
      scene_count: 12
    },
    {
      number: 2,
      title: 'Die erste Kontrolle',
      scene_count: 12
    },
    {
      number: 3,
      title: 'Wagen 7',
      scene_count: 12
    },
    {
      number: 4,
      title: 'Spiegelungen',
      scene_count: 0 // TODO: Noch nicht implementiert
    },
    {
      number: 5,
      title: 'Die letzte Kontrolle',
      scene_count: 0 // TODO: Noch nicht implementiert
    },
    {
      number: 6,
      title: 'Ende der Linie',
      scene_count: 0 // TODO: Noch nicht implementiert
    },
    {
      number: 7,
      title: 'Entscheidung',
      scene_count: 0 // TODO: Noch nicht implementiert
    }
  ]
};

/**
 * Endings für NACHTZUG 19
 */
export const nachtzug19Endings: EndingsCollection = {
  'ending_test': {
    id: 'ending_test',
    titel: 'Test-Ende',
    beschreibung: 'Dies ist ein temporäres Test-Ende für das MVP.\n\nDu hast die ersten beiden Kapitel durchgespielt. Weitere Kapitel folgen in späteren Versionen.',
    title: 'Test-Ende',
    narrative: 'Dies ist ein temporäres Test-Ende für das MVP.\n\nDu hast die ersten beiden Kapitel durchgespielt. Weitere Kapitel folgen in späteren Versionen.'
  }
};
