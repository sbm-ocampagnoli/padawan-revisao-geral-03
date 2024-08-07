import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fruit } from '../interface/fruit';

@Injectable({
  providedIn: 'root',
})
export class FruitService {
  private url = environment.apiUrl + '/fruits';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Fruit[]> {
    return this.http.get<Fruit[]>(this.url);
  }

  update(fruit: Fruit): Observable<Fruit> {
    return this.http.put<Fruit>(`${this.url}/${fruit.id}`, fruit);
  }

  delete(fruit: Fruit): Observable<any> {
    return this.http.delete<any>(`${this.url}/${fruit.id}`);
  }
}
