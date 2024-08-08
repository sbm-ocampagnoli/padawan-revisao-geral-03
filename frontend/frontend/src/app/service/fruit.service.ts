import { HttpClient, HttpParams } from '@angular/common/http';
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
  add(newFruit: Fruit): Observable<Fruit> {
    return this.http.post<Fruit>(`${this.url}`, newFruit);
  }

  update(fruit: Fruit): Observable<Fruit> {
    return this.http.put<Fruit>(`${this.url}/${fruit.id}`, fruit);
  }

  delete(fruit: Fruit): Observable<any> {
    return this.http.delete<any>(`${this.url}/${fruit.id}`);
  }

  filterComposed(fruit: Fruit): Observable<Fruit[]> {
    let params = new HttpParams();
    debugger;
    if (fruit.importDate) {
      let dateConverted = this.convertToDateTime(fruit.importDate);
      console.log(dateConverted);
      params = params.set('origin', fruit.origin);
      params = params.set('importDate', dateConverted);
      params = params.set('quantity', fruit.quantity);
      return this.http.get<Fruit[]>(`${this.url}/filter`, { params });
    }

    params = params.set('origin', fruit.origin);
    params = params.set('importDate', '');
    params = params.set('quantity', fruit.quantity);

    return this.http.get<Fruit[]>(`${this.url}/filter`, { params });
  }

  convertToDateTime(data: Date): string {
    debugger;
    let dateString = data.toString();
    return dateString.slice(0, 19);
  }
}
