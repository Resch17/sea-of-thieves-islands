export interface Location {
  name: string;
  coordinates: string;
  type: 'Outpost' | 'Seapost' | 'Small Island' | 'Large Island' | 'Fortress';
  region:
    | 'The Ancient Isles'
    | 'The Wilds'
    | 'The Shores of Plenty'
    | "The Devil's Roar";
}

export interface Grouping {
  letter: string;
  locations: Location[];
}
