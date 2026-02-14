
export enum Faction {
  SPACE_FEDERATION = 'SPACE_FEDERATION',
  EARTH_UNION = 'EARTH_UNION'
}

export interface DialogueState {
  speaker: string;
  text: string;
  backgroundUrl: string;
  characterUrl: string;
}
