import { Bookmark } from './bookmark.model';

export interface BookmarkState {
  bookmarks: Bookmark[];
  filter: string;
  loading: boolean;
  error: string | null;
}