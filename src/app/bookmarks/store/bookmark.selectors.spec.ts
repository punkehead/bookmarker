import { BookmarkState } from '../models/bookmark.state.model';
import { Bookmark } from '../models/bookmark.model';
import * as Selectors from './bookmark.selectors';

describe('Bookmark Selectors', () => {
    const initialState: BookmarkState = {
        bookmarks: [
            { id: '1', name: 'Angular', url: 'https://angular.io', date: new Date().toISOString() },
            { id: '2', name: 'NgRx', url: 'https://ngrx.io', date: new Date(Date.now() - 86400000).toISOString() },
            { id: '3', name: 'Older site', url: 'https://old.com', date: '2020-01-01' }
        ],
        filter: '',
        loading: false,
        error: null
    };

    it('should select the bookmark state', () => {
        const result = Selectors.selectBookmarkState.projector(initialState);
        expect(result).toEqual(initialState);
    });

    it('should select all bookmarks', () => {
        const result = Selectors.selectAllBookmarks.projector(initialState);
        expect(result.length).toBe(3);
        expect(result[0].name).toBe('Angular');
    });

    it('should select the filter', () => {
        const result = Selectors.selectFilter.projector(initialState);
        expect(result).toBe('');
    });

    it('should select the loading state', () => {
        const result = Selectors.selectLoading.projector(initialState);
        expect(result).toBe(false);
    });

    it('should filter bookmarks by name', () => {
        const bookmarks = initialState.bookmarks;
        const filter = 'angular';
        const result = Selectors.selectFilteredBookmarks.projector(bookmarks, filter);
        expect(result.length).toBe(1);
        expect(result[0].name).toBe('Angular');
    });

    it('should filter bookmarks by url', () => {
        const bookmarks = initialState.bookmarks;
        const filter = 'old';
        const result = Selectors.selectFilteredBookmarks.projector(bookmarks, filter);
        expect(result.length).toBe(1);
        expect(result[0].url).toBe('https://old.com');
    });

    it('should return all bookmarks if filter is empty', () => {
        const bookmarks = initialState.bookmarks;
        const filter = '';
        const result = Selectors.selectFilteredBookmarks.projector(bookmarks, filter);
        expect(result.length).toBe(3);
    });

    it('should group bookmarks correctly', () => {
        const bookmarks = initialState.bookmarks;
        const result = Selectors.selectGroupedBookmarks.projector(bookmarks);
        
        expect(result.today.length).toBe(1);
        expect(result.today[0].name).toBe('Angular');
        
        expect(result.yesterday.length).toBe(1);
        expect(result.yesterday[0].name).toBe('NgRx');
        
        expect(result.older.length).toBe(1);
        expect(result.older[0].name).toBe('Older site');
    });

    it('should select bookmark by id', () => {
        const bookmarks = initialState.bookmarks;
        const selector = Selectors.selectBookmarkById('2');
        const result = selector.projector(bookmarks);
        expect(result?.name).toBe('NgRx');
    });
});
