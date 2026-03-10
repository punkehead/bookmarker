import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { Store } from '@ngrx/store';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { addBookmark, updateBookmark } from '../../store/bookmark.actions';
import { Bookmark } from '../../models/bookmark.model';
import { CommonModule } from '@angular/common';
import { selectBookmarkById } from '../../store/bookmark.selectors';
import { take } from 'rxjs';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, RouterModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = false;
  bookmarkId: string | null = null;
  submitted = false;

  bookmarkForm = this.fb.group({
    name: ['', Validators.required],
    url: ['', [Validators.required, Validators.pattern('https?://.+')]]
  });

  ngOnInit() {
    this.bookmarkId = this.route.snapshot.paramMap.get('id');
    if (this.bookmarkId) {
      this.isEditMode = true;
      this.store.select(selectBookmarkById(this.bookmarkId)).pipe(take(1)).subscribe(bookmark => {
        if (bookmark) {
          this.bookmarkForm.patchValue({
            name: bookmark.name,
            url: bookmark.url
          });
        }
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.bookmarkForm.valid) {
      const formValue = this.bookmarkForm.value;
      const bookmark: Bookmark = {
        name: formValue.name!,
        url: formValue.url!,
        date: new Date().toISOString()
      };

      if (this.isEditMode && this.bookmarkId) {
        this.store.dispatch(updateBookmark({ bookmark: { ...bookmark, id: this.bookmarkId } }));
      } else {
        this.store.dispatch(addBookmark({ bookmark }));
      }
    }
  }
}
