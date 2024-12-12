import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { musicas } from '../data/mock-dados';
import { Imusica } from './imusica';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {

  private apiUrl = 'http://localhost:8080/musica/'; //URL da API Spring Boot

  constructor( private http: HttpClient) {}

  //Método para obter todos os Musicas da API
  getMusicas(): Observable<Imusica[]> {
    return this.http.get<Imusica[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Erro ao buscar da API, usando Musicas locais:',error);
        return of(musicas); //Retorna o array local como Observable
      } )
    );
  }

  //Método para obter um Musica por ID da API
  getMusicaById (id: number): Observable<Imusica> {
   const url = `${this.apiUrl}/${id}`;
   return this.http.get<Imusica>(url).pipe(
    catchError(error => {
      console.error(`Erro ao buscar o Musica com ID ${id}:`, error);
      return of(null as any); //Retorna null como Observable em caso de erro
    })
   );
  }

  //Método para adicionar um novo Musica á API
  addMusica(newMusica: Imusica): Observable<Imusica> {
    return this.http.post<Imusica>(this.apiUrl, newMusica).pipe(
      catchError(error => {
        console.error('Erro ao adicionar um novo Musica:', error);
        return of(null as any); //Retorna null como Observable em caso de erro

      })
    );
  }

  //Método para atualizar um Musica existente na API
  updateMusica(updateMusica: Imusica): Observable<Imusica> {
    const url = `${this.apiUrl}/${updateMusica.id}`;
    return this.http.put<Imusica>(url, updateMusica).pipe(
      catchError(error => {
        console.error(`Erro ao atualizar o Musica com ID${updateMusica.id}`, error);
        return of (null as any); //Retorna null como Observable em caso de erro
      })
    );
  }

  //Método para deletar um Musica por ID na API
  deleteMusica(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(error => {
        console.error(`Erro ao deletar o Musica com ID ${id}:`, error);
        return of(); //Retorna um Observable vazio em caso de erro
      } )
    );
  }
}
