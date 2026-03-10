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
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();

export const selectGroupedBookmarks = createSelector(
  selectFilteredBookmarks,
  (bookmarks) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todayList: Bookmark[] = [];
    const yesterdayList: Bookmark[] = [];
    const olderList: Bookmark[] = [];

    bookmarks.forEach((bookmark: Bookmark) => {
      const bDate = new Date(bookmark.date || new Date());
      if (isSameDate(bDate, today)) {
        todayList.push(bookmark);
      } else if (isSameDate(bDate, yesterday)) {
        yesterdayList.push(bookmark);
      } else {
        olderList.push(bookmark);
      }
    });
    
    olderList.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

    return { today: todayList, yesterday: yesterdayList, older: olderList };
  }
);

export const selectBookmarkById = (id: string) => createSelector(
  selectAllBookmarks,
  (bookmarks) => bookmarks.find(b => b.id === id)
);
