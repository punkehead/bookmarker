import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { setFilter } from '../store/bookmark.actions';
import { selectFilter } from '../store/bookmark.selectors';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, AsyncPipe, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private store = inject(Store);
  filter$ = this.store.select(selectFilter);

  onFilterChange(value: string) {
    this.store.dispatch(setFilter({ filter: value }));
  }
}
