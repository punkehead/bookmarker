import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { setFilter } from '../store/bookmark.actions';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, BrowserAnimationsModule, RouterModule.forRoot([])],
      providers: [provideMockStore()]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch setFilter action on filter change', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const filterValue = 'test search';
    
    component.onFilterChange(filterValue);
    
    expect(dispatchSpy).toHaveBeenCalledWith(setFilter({ filter: filterValue }));
  });
});
