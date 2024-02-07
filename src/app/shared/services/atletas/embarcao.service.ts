import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmbarcacaoService {
  private apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  getEmbarcacoes(): Observable<any> {
    return this.http.get(`${this.apiUrl}embarcacoes`);
  }

  createEmbarcacao(embarcacao: any): Observable<any> {
    return this.http.post(`${this.apiUrl}nova`, embarcacao);
  }

  getEmbarcacaoByCod(cod: string): Observable<any> {
    return this.http.get(`${this.apiUrl}buscar/${cod}`);
  }

  updateEmbarcacao(cod: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}editar/${cod}`, data);
  }

  deleteEmbarcacao(cod: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}excluir/${cod}`);
  }
}