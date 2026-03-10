import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateComponent } from './create.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { addBookmark } from '../../store/bookmark.actions';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let store: MockStore;

  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateComponent, 
        BrowserAnimationsModule, 
        RouterTestingModule
      ],
      providers: [
        provideMockStore({ initialState })
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
    component.bookmarkForm.controls['group'].setValue('work');
    expect(component.bookmarkForm.valid).toBeTruthy();
  });

  it('should dispatch addBookmark action on submit', () => {
    component.bookmarkForm.controls['name'].setValue('Test');
    component.bookmarkForm.controls['url'].setValue('http://test.com');
    component.bookmarkForm.controls['group'].setValue('work');
    
    component.onSubmit();
    
    expect(store.dispatch).toHaveBeenCalled();
    const actions = (store.dispatch as jasmine.Spy).calls.mostRecent().args[0];
    expect(actions.type).toBe(addBookmark.type);
    expect(actions.bookmark.name).toBe('Test');
  });
});
