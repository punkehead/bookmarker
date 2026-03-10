import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../models/bookmark.model';

export const loadBookmarks = createAction('Load Bookmarks');
export const loadBookmarksSuccess = createAction('Load Bookmarks Success', props<{ bookmarks: Bookmark[] }>());
export const loadBookmarksFail = createAction('Load Bookmarks Fail', props<{ error: any }>());

export const addBookmark = createAction('Add Bookmark', props<{ bookmark: Bookmark }>());
export const addBookmarkSuccess = createAction('Add Bookmark Success', props<{ bookmark: Bookmark }>());
export const addBookmarkFail = createAction('Add Bookmark Fail', props<{ error: any }>());

export const updateBookmark = createAction('Update Bookmark', props<{ bookmark: Bookmark }>());
export const updateBookmarkSuccess = createAction('Update Bookmark Success', props<{ bookmark: Bookmark }>());
export const updateBookmarkFail = createAction('Update Bookmark Fail', props<{ error: any }>());

