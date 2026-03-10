import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bookmark } from '../models/bookmark.model';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


const API_URL = '/api/bookmarks';

@Injectable({
  providedIn: 'root'
})
export class BookmarkingService {
  private http = inject(HttpClient);


  fetchAllBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(API_URL).pipe(
      tap(res => console.debug(`Fetched ${res.length} bookmarks`)),
      catchError(err => {
      console.error('Error fetching bookmarks', err);
      return throwError(() => new Error('Fetch failed'));
    })
    );
  }


  createBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(API_URL, bookmark).pipe(
      tap(() => console.log(`created new bookmark: ${bookmark.name}`)),
      catchError(err => {
      console.error('Error creating bookmark', err);
      return throwError(() => new Error('Create failed'));
    })
    );
  }

  updateBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.put<Bookmark>(`${API_URL}/${bookmark.id}`, bookmark).pipe(
      tap(() => console.log(`updated bookmark: ${bookmark.name}`)),
      catchError(err => {
        console.error('Error updating bookmark', err);
        return throwError(() => new Error('Update failed'));
      })
    );
  }

  // Not used yet
  removeBookmark(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`).pipe(
      tap(() => console.log(`deleted bookmark with id: ${id}`)),
      catchError(err => {
        console.error('Error deleting bookmark', err);
        return throwError(() => new Error('Delete failed'));
      })
    );
  }
}
