import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateComponent } from './create.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { addBookmark, updateBookmark } from '../../store/bookmark.actions';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { selectBookmarkById } from '../../store/bookmark.selectors';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let store: MockStore;
  let activatedRoute: any;

  const initialState = {
    bookmarks: {
      bookmarks: [
        { id: '1', name: 'Angular', url: 'https://angular.io' }
      ]
    }
  };

  beforeEach(async () => {
    activatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({})
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        CreateComponent, 
        BrowserAnimationsModule, 
        RouterTestingModule
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate form when empty', () => {
    expect(component.bookmarkForm.valid).toBeFalsy();
  });

  it('should validate form when filled correctly', () => {
    component.bookmarkForm.controls['name'].setValue('Test');
    component.bookmarkForm.controls['url'].setValue('http://test.com');
    expect(component.bookmarkForm.valid).toBeTruthy();
  });

  it('should dispatch addBookmark action on submit', () => {
    component.bookmarkForm.controls['name'].setValue('Test');
    component.bookmarkForm.controls['url'].setValue('http://test.com');
    
    component.onSubmit();
    
    expect(store.dispatch).toHaveBeenCalled();
    const actions = (store.dispatch as jasmine.Spy).calls.mostRecent().args[0];
    expect(actions.type).toBe(addBookmark.type);
    expect(actions.bookmark.name).toBe('Test');
  });

  describe('Edit Mode', () => {
    beforeEach(() => {
      activatedRoute.snapshot.paramMap = convertToParamMap({ id: '1' });
      store.overrideSelector(selectBookmarkById('1'), { id: '1', name: 'Angular', url: 'https://angular.io' });
      
      fixture = TestBed.createComponent(CreateComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should initialize form with bookmark data', () => {
      expect(component.isEditMode).toBeTrue();
      const val = component.bookmarkForm.value as any;
      expect(val.name).toBe('Angular');
      expect(val.url).toBe('https://angular.io');
    });

    it('should dispatch updateBookmark action on submit', () => {
      component.bookmarkForm.controls['name'].setValue('Updated Angular');
      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalled();
      const actions = (store.dispatch as jasmine.Spy).calls.mostRecent().args[0];
      expect(actions.type).toBe(updateBookmark.type);
      expect(actions.bookmark.id).toBe('1');
      expect(actions.bookmark.name).toBe('Updated Angular');
    });
  });
});
