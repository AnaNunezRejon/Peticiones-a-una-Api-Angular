import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable,lastValueFrom, map, tap } from 'rxjs';
import { IUsuario } from '../interfaces/iusuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  httpClient = inject(HttpClient)
  baseUrl = 'https://peticiones.online/api/users'

  getAll(): Observable<IUsuario[]> {
    return this.httpClient.get<{ results: IUsuario[] }>(this.baseUrl)
      .pipe(
        map(response => response.results)
      );
  }

  getAllPromises(): Promise<IUsuario[]> {
    return lastValueFrom(this.httpClient.get<IUsuario[]>(this.baseUrl))
  }
  getById(id: string): Promise<IUsuario> {
    return lastValueFrom(this.httpClient.get<IUsuario>(`${this.baseUrl}/${id}`))
  }
  delete(id: string): Promise<IUsuario> {
    return lastValueFrom(this.httpClient.delete<IUsuario>(`${this.baseUrl}/${id}`))
  }
  insert(formValue: IUsuario): Promise<IUsuario> {
    return lastValueFrom(this.httpClient.post<IUsuario>(this.baseUrl, formValue))
  }
  update(formValue: IUsuario): Promise<IUsuario> {
    return lastValueFrom(this.httpClient.put<IUsuario>(`${this.baseUrl}/${formValue._id}`, formValue))
  }
}

