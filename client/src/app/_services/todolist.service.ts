import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoList } from '../_models/todo_list';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTodoLists(){
    return this.http.get<TodoList[]>(this.baseUrl + 'list');
  } 

  dohvatiListu(id: any){
    return this.http.get<TodoList>(this.baseUrl + 'list/'+id);
  }

  spremiNovuListu(model: any){
    return this.http.post(this.baseUrl + 'list/insert',model);
  }

  obrisiListu(id: number){
    return this.http.delete(this.baseUrl + 'list/delete/'+id);
  }

  azurirajListu(model: any){
    return this.http.put(this.baseUrl + 'list/update/'+ model.id, model);
  }
}
