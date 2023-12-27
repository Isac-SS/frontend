import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Evento } from '../../model/evento.model'; // Certifique-se de importar o modelo correto

@Injectable({
  providedIn: 'root',
})
export class EventosService {
  apiUrl = 'http://localhost:3000/api/';

  private recarregarEventosSubject = new Subject<void>();

  recarregarEventos$ = this.recarregarEventosSubject.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public getEventosList(): Observable<Evento[]> {
    return this.httpClient.get<Evento[]>(`${this.apiUrl}eventos`);
  }

  public cadastrarEvento(novoEvento: Evento): Observable<Evento> {
    const url = `${this.apiUrl}eventos/novo`;

    return this.httpClient.post<Evento>(url, novoEvento, this.httpOptions).pipe(
      catchError((error) => {
        console.error('Erro ao cadastrar evento', error);
        throw error;
      }),
      tap(() => {
        this.recarregarEventosSubject.next();
      })
    );
  }

  public editarEvento(eventoId: string, evento: Evento): Observable<Evento> {
    const url = `${this.apiUrl}eventos/${eventoId}`;
    return this.httpClient.put<Evento>(url, evento, this.httpOptions);
  }

  public excluirEvento(eventoId: string): Observable<void> {
    const url = `${this.apiUrl}eventos/excluir/${eventoId}`;
    return this.httpClient.delete<void>(url, this.httpOptions).pipe(
      catchError((error) => {
        console.error('Erro ao excluir evento', error);
        throw error;
      })
    );
  }
}