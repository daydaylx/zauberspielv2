
// Effect Types
export type EffectType = 'inc' | 'dec' | 'set' | 'clamp';

export type Effect = {
  type: EffectType;
  target: string;
  value: number | boolean | string;
};

// Condition Types
export type ConditionOperator = 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'has';

// Legacy Condition Function Type
export type LegacyCondition = (stats: PlayerStats, flags: Flags, inventory: string[]) => boolean;

// Structured Condition Types
export type ComparisonCondition = {
  type: 'comparison';
  target: string;
  operator: ConditionOperator;
  value: number | boolean | string;
};

export type BoolCondition = {
  type: 'bool';
  target: string;
  value: boolean;
};

export type LogicCondition = {
  type: 'and' | 'or';
  conditions: Condition[];
};

export type Condition =
  | string
  | LegacyCondition
  | ComparisonCondition
  | BoolCondition
  | LogicCondition;

// Legacy Stats
export type PlayerStats = {
  mut: number;
  wissen: number;
  empathie: number;
};

export type Flags = Record<string, boolean | undefined>;

// New Stats Structure
export type NachtzugStats = {
  tickets_truth: number;
  tickets_escape: number;
  tickets_guilt: number;
  tickets_love: number;
  conductor_attention: number;
  memory_drift: number;
  rel_comp7: number;
  rel_boy: number;
  rel_sleepless: number;
};

export type Choice = {
  id?: string;
  text: string;
  label?: string;

  // Legacy fields
  beschreibungFolge?: string;
  werteAenderung?: Partial<PlayerStats>;
  flagsAenderung?: Flags;
  itemBelohnung?: string;
  itemVerlust?: string;

  // New fields
  effects?: Effect[];
  condition?: Condition;

  naechsteSzeneId?: string;
  next?: string;
};

export type Scene = {
  id: string;
  kapitel: number | string;
  titel: string;
  beschreibung?: string; // Made optional
  narrative?: string;

  atmosphere?: 'normal' | 'danger' | 'mystic' | 'dream' | 'tense' | 'somber' | 'dark';

  tags?: string[];
  state_notes?: string[];

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
  inventory: string[];

  nachtzugStats: NachtzugStats;
  items: Record<string, boolean>;

  history: string[];
  isGameOver: boolean;
  endingId?: string;
};
