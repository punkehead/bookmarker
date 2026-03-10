import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BookmarkState } from '../models/bookmark.state.model';
import { Bookmark } from '../models/bookmark.model';

export const selectBookmarkState = createFeatureSelector<BookmarkState>('bookmarks');

export const selectAllBookmarks = createSelector(
  selectBookmarkState,
  (state: BookmarkState) => state.bookmarks
);

export const selectFilter = createSelector(
  selectBookmarkState,
  (state: BookmarkState) => state.filter  
);

export const selectLoading = createSelector(
  selectBookmarkState,
  (state: BookmarkState) => state.loading
);

export const selectFilteredBookmarks = createSelector(
  selectAllBookmarks,
  selectFilter,
  (bookmarks, filter) => {
    if (!filter) return bookmarks;
    const lowerFilter = filter.toLowerCase();
    return bookmarks.filter(bookmark => 
      bookmark.name.toLowerCase().includes(lowerFilter) || 
      bookmark.url.toLowerCase().includes(lowerFilter)
    );
  }
);

const isSameDate = (date1: Date, date2: Date) => 
  date1.toDateString() === date2.toDateString();

export interface BookmarkGroups {
  today: Bookmark[];
  yesterday: Bookmark[];
  older: Bookmark[];
}

export const selectGroupedBookmarks = createSelector(
  selectFilteredBookmarks,
  (bookmarks): BookmarkGroups => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const groups: BookmarkGroups = { today: [], yesterday: [], older: [] };

    bookmarks.forEach(bookmark => {
      const bDate = new Date(bookmark.date || Date.now());
      if (isSameDate(bDate, today)) groups.today.push(bookmark);
      else if (isSameDate(bDate, yesterday)) groups.yesterday.push(bookmark);
      else groups.older.push(bookmark);
    });
    
    groups.older.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

    return groups;
  }
);

export const selectBookmarkById = (id: string) => createSelector(
  selectAllBookmarks,
  (bookmarks) => bookmarks.find(b => b.id === id)
);
