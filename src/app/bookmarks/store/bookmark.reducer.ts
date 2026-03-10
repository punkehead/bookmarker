import { createReducer, on } from '@ngrx/store';
import { Bookmark } from '../models/bookmark.model';
import * as BookmarkActions from './bookmark.actions';

export interface BookmarkState {
  bookmarks: Bookmark[];
  filter: string;
  loading: boolean;
  error: string | null; // More specific type than 'any'
}

// Initial state for the bookmark feature
// We start with an empty list and no filter
export const DEFAULT_STATE: BookmarkState = {
  bookmarks: [],
  filter: '',
  loading: false,
  error: null
};

export const bookmarkReducer = createReducer(
  DEFAULT_STATE,
  
  // Loading flow
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
  
  // Create flow
  on(BookmarkActions.addBookmark, state => ({ ...state, loading: true })),
  on(BookmarkActions.addBookmarkSuccess, (state, { bookmark }) => ({ 
    ...state, 
    loading: false, 
    bookmarks: [...state.bookmarks, bookmark] 
  })),
  on(BookmarkActions.addBookmarkFail, (state, { error }) => ({ ...state, loading: false, error })),
  
  // Update flow
  on(BookmarkActions.updateBookmark, state => ({ ...state, loading: true })),
  on(BookmarkActions.updateBookmarkSuccess, (state, { bookmark }) => ({
    ...state,
    loading: false,
    // Replace the specific item in the array
    bookmarks: state.bookmarks.map(b => b.id === bookmark.id ? bookmark : b)
  })),
  on(BookmarkActions.updateBookmarkFail, (state, { error }) => ({ ...state, loading: false, error })),
  
  // Filter
  on(BookmarkActions.setFilter, (state, { filter }) => ({ ...state, filter }))
);
