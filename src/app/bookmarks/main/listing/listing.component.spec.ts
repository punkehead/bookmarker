import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListingComponent } from './listing.component';
import { provideMockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

describe('ListingComponent', () => {
  let component: ListingComponent;
  let fixture: ComponentFixture<ListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingComponent, BrowserAnimationsModule, RouterModule.forRoot([])],
      providers: [provideMockStore()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
