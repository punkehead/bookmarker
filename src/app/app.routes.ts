import { Routes } from '@angular/router';
import { ListingComponent } from './bookmarks/main/listing/listing.component';
import { CreateComponent } from './bookmarks/main/create/create.component';

export const routes: Routes = [
  { path: '', component: ListingComponent },
  { path: 'add', component: CreateComponent },
  { path: 'edit/:id', component: CreateComponent },
  { path: '**', redirectTo: '' }
];
