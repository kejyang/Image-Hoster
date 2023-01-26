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
 //private url = 'https://art-hoster.onrender.com';  
 private images$: Subject<Image[]> = new Subject();
 
 constructor(private httpClient: HttpClient) { }
 
 private refreshImages() {
   this.httpClient.get<Image[]>(`${this.url}/images`)
     .subscribe(images => {
       this.images$.next(images);
     });
 }
 
 getImages(): Subject<Image[]> {
   this.refreshImages();
   return this.images$;
 }

getImage(id: string): Observable<Image> {
  return this.httpClient.get<Image>(`${this.url}/images/${id}`);
} 

 
createImage(image: Image): Observable<string> {
  return this.httpClient.post(`${this.url}/images`, image, { responseType: 'text' });
}
 
updateImage(id: string, image: Image): Observable<string> {
   return this.httpClient.put(`${this.url}/images/${id}`, image, { responseType: 'text' });
 } 
 
/*  deleteImage(image: string): Observable<string> {
   return this.httpClient.delete(`${this.url}/images/${image}`, { responseType: 'text' });
 } */

 deleteImage(image: string): Observable<string> {
  return this.httpClient.delete(`${this.url}/images/${image}`, { responseType: 'text' });
}
}

