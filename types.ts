export type Gender = 'boy' | 'girl' | 'unisex' | 'all';

export interface PopularityTrend {
  rank: number;
  trend: 'rising' | 'peaking' | 'classic' | 'unique';
  forecastYear: number;
  changePercent: number;
  trajectory: number[]; // 5-year trajectory from (currentYear - 2) to (currentYear + 2)
}

export interface BabyName {
  id: string;
  name: string;
  meaning: string;
  origin: string;
  gender: 'boy' | 'girl' | 'unisex';
  pronunciation: string;
  syllables: number;
  vibe: string;
  imageUrl: string;
  popularityTrend: PopularityTrend;
  numerologyNumber: number;
  astrologySign: string;
  element: 'Air' | 'Water' | 'Fire' | 'Earth';
  historicMeaning?: string;
  famousNamesakes?: string[];
}

export interface GenerationFilters {
  culture: string;
  letter: string;
  gender: Gender;
  vibe: string;
  count: number;
}

export interface AnnouncementCardConfig {
  name: string;
  meaning: string;
  pronunciation: string;
  origin: string;
  birthDate?: string;
  weight?: string;
  theme: 'rose' | 'cupertino' | 'champagne' | 'mint' | 'obsidian';
}