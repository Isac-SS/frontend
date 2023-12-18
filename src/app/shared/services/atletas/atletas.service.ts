import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Atleta } from '../../model/atleta.model';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AtletasService {
  apiUrl = 'http://localhost:3000/api/';

  private recarregarAtletasSubject = new Subject<void>();

  recarregarAtletas$ = this.recarregarAtletasSubject.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public getAtletasList(): Observable<Atleta[]> {
    return this.httpClient.get<Atleta[]>(`${this.apiUrl}atletas`);
  }

  public cadastrarAtleta(novoAtleta: Atleta): Observable<Atleta> {
    const url = `${this.apiUrl}atleta/cadastro`;
  
    return this.httpClient.post<Atleta>(url, novoAtleta, this.httpOptions).pipe(
      catchError((error) => {
        console.error('Erro ao cadastrar atleta', error);
        throw error;
      }),
      tap(() => {
        this.recarregarAtletasSubject.next();
      })
    );
  }

  public editarAtleta(atletaCod: number, atleta: Atleta): Observable<Atleta> {
    const url = `${this.apiUrl}atletas/${atletaCod}`;
    return this.httpClient.put<Atleta>(url, atleta, this.httpOptions);
  }

  public excluirAtleta(atletaCod: number): Observable<void> {
    const url = `${this.apiUrl}atletas/excluir/${atletaCod}`;
    return this.httpClient.delete<void>(url, this.httpOptions).pipe(
      catchError((error) => {
        console.error('Erro ao excluir atleta', error);
        throw error;
      })
    );
  }
}