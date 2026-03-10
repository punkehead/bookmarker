import { bookmarkReducer, DEFAULT_STATE } from './bookmark.reducer';
import * as BookmarkActions from './bookmark.actions';
import { Bookmark } from '../models/bookmark.model';

describe('Bookmarks Reducer', () => {
  const testBookmark: Bookmark = {
    id: '1',
    name: 'Testing a bookmark',
    url: 'http://test.com',
    date: '2026-03-09'
  };

  it('should return initial state', () => {
    const action = { type: 'Unknown' } as any;
    const state = bookmarkReducer(DEFAULT_STATE, action);
    expect(state).toBe(DEFAULT_STATE);
  });

  it('should set loading to true', () => {
    const action = BookmarkActions.loadBookmarks();
    const state = bookmarkReducer(DEFAULT_STATE, action);
    expect(state.loading).toBe(true);
  });

  it('should update bookmarks', () => {
    const bookmarks = [testBookmark];
    const action = BookmarkActions.loadBookmarksSuccess({ bookmarks });
    const state = bookmarkReducer(DEFAULT_STATE, action);
    expect(state.loading).toBe(false);
    expect(state.bookmarks).toEqual(bookmarks);
  });

  it('should update error', () => {
    const error = 'Error';
    const action = BookmarkActions.loadBookmarksFail({ error });
    const state = bookmarkReducer(DEFAULT_STATE, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
  
  it('should add a bookmark', () => {
    const action = BookmarkActions.addBookmarkSuccess({ bookmark: testBookmark });
    const state = bookmarkReducer(DEFAULT_STATE, action);
    expect(state.bookmarks).toContain(testBookmark);
  });
  
  it('should update the filter', () => {
    const filter = 'angular';
    const action = BookmarkActions.setFilter({ filter });
    const state = bookmarkReducer(DEFAULT_STATE, action);
    expect(state.filter).toBe(filter);
  });
});
