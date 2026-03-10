import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { Store } from '@ngrx/store';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { addBookmark } from '../../store/bookmark.actions';
import { Bookmark } from '../../models/bookmark.model';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-create',
  standalone: true,
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, RouterModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  bookmarkForm = this.fb.group({
    name: ['', Validators.required],
    url: ['', [Validators.required, Validators.pattern('https?://.+')]],
    group: ['', Validators.required]
  });

  onSubmit() {
    if (this.bookmarkForm.valid) {
      const bookmark: Bookmark = {
        id: '', 
        date: new Date().toISOString(),
        ...this.bookmarkForm.value as { name: string, url: string, group: string }
      };
      this.store.dispatch(addBookmark({ bookmark }));
    }
  }
}
