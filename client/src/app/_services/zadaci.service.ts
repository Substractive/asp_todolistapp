import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Zadatak } from '../_models/zadatak';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZadaciService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  spremiZadatak(model: any){
    return this.http.post<Zadatak>(this.baseUrl + 'item/insert', model);
  }

  dohvatiSveZadatke(){
    return this.http.get<Zadatak[]>(this.baseUrl + 'item');
  }

  obrisiZadatak(model: any){
    return this.http.delete(this.baseUrl + 'item/delete/'+model.id);
  }

  updateZadatak(model: any){
    return this.http.put(this.baseUrl + 'item/update/'+ model.id, model);
  }
}
