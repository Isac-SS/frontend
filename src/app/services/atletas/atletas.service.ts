
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AtletasService {
  private apiUrl = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) {}

  cadastrarAtleta(atleta: any): Observable<any> {
    return this.http.post(this.apiUrl, atleta);
  }

  listarAtletas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  encontrarAtleta(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  atualizarAtleta(id: string, novoAtleta: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, novoAtleta);
  }

  excluirAtleta(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
