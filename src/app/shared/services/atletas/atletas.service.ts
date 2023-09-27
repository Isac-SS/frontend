
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atleta } from '../../model/atleta.model';

@Injectable({
  providedIn: 'root',
})
export class AtletasService {

  apiUrl = 'http://localhost:3000/api/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
    ) {}

    public getAtletasList(): Observable<Atleta[]> {
      return this.httpClient.get<Atleta[]>(`${this.apiUrl}atletas`);
    }
}
