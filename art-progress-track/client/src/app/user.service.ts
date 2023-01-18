import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { User } from './user';
 
@Injectable({
 providedIn: 'root'
})
export class UserService {
 private url = 'https://art-hoster.onrender.com';
 private users$: Subject<User[]> = new Subject();
 
 constructor(private httpClient: HttpClient) { }
 
 private refreshusers() {
   this.httpClient.get<User[]>(`${this.url}/users`)
     .subscribe(users => {
       this.users$.next(users);
     });
 }
 
 getUsers(): Subject<User[]> {
   this.refreshusers();
   return this.users$;
 }
 
 /*getUser(id: string): Observable<User> {
   return this.httpClient.get<User>(`${this.url}/users/${id}`);
 }*/

 getUser(email: string): Observable<User> {
  return this.httpClient.get<User>(`${this.url}/users/${email}`);
}
 
 createUser(user: User): Observable<string> {
   return this.httpClient.post(`${this.url}/users`, user, { responseType: 'text' });
 }
 
 updateUser(email: string, user: User): Observable<string> {
   return this.httpClient.put(`${this.url}/users/${email}`, user, { responseType: 'text' });
 }
 
 deleteUser(id: string): Observable<string> {
   return this.httpClient.delete(`${this.url}/users/${id}`, { responseType: 'text' });
 }
}
