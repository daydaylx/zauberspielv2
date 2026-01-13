export type PlayerStats = {
  mut: number;
  wissen: number;
  empathie: number;
};

export type Flags = {
  trusted_by_lira?: boolean;
  trusted_by_jorin?: boolean;
  helped_jorin_prolog?: boolean; // Wichtig für Callback
  saw_shadow_truth?: boolean;
  book_sealed?: boolean;
  book_used?: boolean;
  rivalry_kaelen?: boolean; // Neuer Rivale
  [key: string]: boolean | undefined;
};

export type Choice = {
  text: string;
  beschreibungFolge?: string;
  werteAenderung?: {
    mut?: number;
    wissen?: number;
    empathie?: number;
  };
  flagsAenderung?: Flags;
  itemBelohnung?: string; // NEU: Gegenstand erhalten
  itemVerlust?: string; // NEU: Gegenstand entfernen
  naechsteSzeneId: string;
  condition?: (stats: PlayerStats, flags: Flags, inventory: string[]) => boolean;
};

export type Scene = {
  id: string;
  kapitel: string;
  titel: string;
  beschreibung: string;
  atmosphere?: 'normal' | 'danger' | 'mystic' | 'dream' | 'tense' | 'somber' | 'dark'; // NEU: Für CSS-Styling
  effekteBeimBetreten?: {
    mut?: number;
    wissen?: number;
    empathie?: number;
    flagsAenderung?: Flags;
    itemBelohnung?: string;
  };
  choices: Choice[];
};

export type Ending = {
  id: string;
  titel: string;
  beschreibung: string;
};

export type GameState = {
  currentSceneId: string;
  stats: PlayerStats;
  flags: Flags;
  inventory: string[]; // NEU: Inventar
  history: string[];
  isGameOver: boolean;
  endingId?: string;
};