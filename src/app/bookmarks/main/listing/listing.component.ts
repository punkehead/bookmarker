import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { loadBookmarks } from '../../store/bookmark.actions';
import { HeaderComponent } from '../../header/header.component';
import { selectGroupedBookmarks, selectLoading, BookmarkGroups } from '../../store/bookmark.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [HeaderComponent, CommonModule, AsyncPipe, RouterModule, MatListModule, MatButtonModule, MatIconModule, MatCardModule, MatProgressBarModule, MatChipsModule],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent {
  private store = inject(Store);
  groupedBookmarks$: Observable<BookmarkGroups> = this.store.select(selectGroupedBookmarks);
  loading$ = this.store.select(selectLoading);

  ngOnInit() {
    this.store.dispatch(loadBookmarks());
  }
}


