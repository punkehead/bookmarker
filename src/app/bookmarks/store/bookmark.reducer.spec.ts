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

  it('should set loading to true when adding a bookmark', () => {
    const action = BookmarkActions.addBookmark({ bookmark: testBookmark });
    const state = bookmarkReducer(DEFAULT_STATE, action);
    expect(state.loading).toBe(true);
  });

  it('should set loading to false and update error when adding a bookmark fails', () => {
    const error = 'Failed to add';
    const action = BookmarkActions.addBookmarkFail({ error });
    const state = bookmarkReducer(DEFAULT_STATE, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should set loading to true when updating a bookmark', () => {
    const action = BookmarkActions.updateBookmark({ bookmark: testBookmark });
    const state = bookmarkReducer(DEFAULT_STATE, action);
    expect(state.loading).toBe(true);
  });

  it('should update a bookmark in the store on success', () => {
    const initialState = {
      ...DEFAULT_STATE,
      bookmarks: [
        { id: '1', name: 'Old Name', url: 'http://old.com', date: '2026-03-01' }
      ]
    };
    const updatedBookmark: Bookmark = { id: '1', name: 'New Name', url: 'http://new.com', date: '2026-03-10' };
    const action = BookmarkActions.updateBookmarkSuccess({ bookmark: updatedBookmark });
    const state = bookmarkReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.bookmarks[0].name).toBe('New Name');
    expect(state.bookmarks.length).toBe(1);
  });

  it('should set loading to false and update error when updating a bookmark fails', () => {
    const error = 'Failed to update';
    const action = BookmarkActions.updateBookmarkFail({ error });
    const state = bookmarkReducer(DEFAULT_STATE, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
});
