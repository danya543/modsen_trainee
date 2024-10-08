import { Pagination } from './Arts';

export type Results = {
  id: number;
  title: string;
  thumbnail: { alt_text: string };
};
export interface SearchResults {
  data: Results[];
  pagination: Pagination;
}
