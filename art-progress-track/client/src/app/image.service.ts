import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Image } from './image';
import { Url } from 'url';
 
@Injectable({
 providedIn: 'root'
})
export class ImageService {
 private url = 'http://localhost:5200';
 private images$: Subject<Image[]> = new Subject();
 
 constructor(private httpClient: HttpClient) { }
 
 private refreshusers() {
   this.httpClient.get<Image[]>(`${this.url}/images`)
     .subscribe(images => {
       this.images$.next(images);
     });
 }
 
 getImages(): Subject<Image[]> {
   this.refreshusers();
   return this.images$;
 }
 
 /*getUser(id: string): Observable<User> {
   return this.httpClient.get<User>(`${this.url}/users/${id}`);
 }*/

/* getImage(image: string): Observable<Image> {
  return this.httpClient.get<Image>(`${this.url}/images/${image}`);
}  */

getImage(image: string): Observable<Image> {
  console.log('this is the image service image', image)
  return this.httpClient.get<Image>(`${this.url}/images/${image}`);
} 

 
 createImage(image: Image): Observable<string> {
   return this.httpClient.post(`${this.url}/images`, image, { responseType: 'text' });
 }
 
/*  updateUser(email: string, image: Image): Observable<string> {
   return this.httpClient.put(`${this.url}/images/${email}`, image, { responseType: 'text' });
 } */
 
/*  deleteImage(image: string): Observable<string> {
   return this.httpClient.delete(`${this.url}/images/${image}`, { responseType: 'text' });
 } */

 deleteImage(image: string): Observable<string> {
  return this.httpClient.delete(`${this.url}/images/${image}`, { responseType: 'text' });
}
}