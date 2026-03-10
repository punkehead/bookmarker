import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BookmarkActions from './bookmark.actions';
import { mergeMap, map, catchError, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { BookmarkingService } from '../services/bookmarking.service';

@Injectable()
export class BookmarkEffects {
  private actions$ = inject(Actions);
  private bookmarkingService = inject(BookmarkingService);
  private router = inject(Router);

  loadBookmarks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.loadBookmarks),
      switchMap(() =>
        this.bookmarkingService.fetchAllBookmarks().pipe(
          map(bookmarks => BookmarkActions.loadBookmarksSuccess({ bookmarks })),
          catchError(err => {
            console.error('Failed to load bookmarks', err);
            return of(BookmarkActions.loadBookmarksFail({ error: err.message || 'Error loading bookmarks' }));
          })
        )
      )
    )
  );

  addBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.addBookmark),
      mergeMap(({ bookmark }) =>
        this.bookmarkingService.createBookmark(bookmark).pipe(
          map(newBookmark => BookmarkActions.addBookmarkSuccess({ bookmark: newBookmark })),
          catchError(error => {
            console.error('Create failed', error);
            return of(BookmarkActions.addBookmarkFail({ error }));
          })
        )
      )
    )
  );

  updateBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.updateBookmark),
      mergeMap(({ bookmark }) =>
        this.bookmarkingService.updateBookmark(bookmark).pipe(
          map(updated => BookmarkActions.updateBookmarkSuccess({ bookmark: updated })),
          catchError(error => of(BookmarkActions.updateBookmarkFail({ error })))
        )
      )
    )
  );

}
