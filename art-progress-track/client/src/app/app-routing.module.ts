import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { HomeComponent } from './home/home.component';
import { ImagePageComponent } from './image-page/image-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { GlobalImagesComponent } from './global-images/global-images.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { UserImageEditComponent } from './user-image-edit/user-image-edit.component';
import { ImageSearchComponent } from './image-search/image-search.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'image-page/:img/:description/:title', component: ImagePageComponent },
  { path: 'home/user-page', component: UserPageComponent },
  { path: 'home/all-images', component: GlobalImagesComponent },
  { path : 'home/upload-image-page', component: UploadImageComponent},
  { path : 'user-image-edit/:id', component: UserImageEditComponent},
  { path : 'image-search', component: ImageSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
