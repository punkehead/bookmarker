import { createReducer, on } from '@ngrx/store';
import * as BookmarkActions from './bookmark.actions';
import { BookmarkState } from '../models/bookmark.state.model';

// Initial state for the bookmarks store
export const DEFAULT_STATE: BookmarkState = {
  bookmarks: [],
  filter: '',
  loading: false,
  error: null
};

export const bookmarkReducer = createReducer(
  DEFAULT_STATE,

  // Load bookmarks state reducers
  on(BookmarkActions.loadBookmarks, state => ({ ...state, loading: true, error: null })),
  on(BookmarkActions.loadBookmarksSuccess, (state, { bookmarks }) => ({ 
    ...state, 
    loading: false, 
    bookmarks 
  })),
  on(BookmarkActions.loadBookmarksFail, (state, { error }) => ({ 
    ...state, 
    loading: false, 
    error: typeof error === 'string' ? error : 'An unexpected error occurred'
  })),
  
  // Add bookmark state reducers
  on(BookmarkActions.addBookmark, state => ({ ...state, loading: true })),
  on(BookmarkActions.addBookmarkSuccess, (state, { bookmark }) => ({ 
    ...state, 
    loading: false, 
    bookmarks: [...state.bookmarks, bookmark] 
  })),
  on(BookmarkActions.addBookmarkFail, (state, { error }) => ({ ...state, loading: false, error })),
  
  // Update bookmark state reducers
  on(BookmarkActions.updateBookmark, state => ({ ...state, loading: true })),
  on(BookmarkActions.updateBookmarkSuccess, (state, { bookmark }) => ({
    ...state,
    loading: false,
    // Replace the specific item in the array
    bookmarks: state.bookmarks.map(b => b.id === bookmark.id ? bookmark : b)
  })),
  on(BookmarkActions.updateBookmarkFail, (state, { error }) => ({ ...state, loading: false, error })),
  
  // Filter reducer
  on(BookmarkActions.setFilter, (state, { filter }) => ({ ...state, filter }))
);
