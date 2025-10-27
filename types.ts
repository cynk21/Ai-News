
export interface Source {
  name: string;
  url: string;
}

export interface NewsItem {
  rank: number;
  headline: string;
  summary: string;
  sources: Source[];
}
