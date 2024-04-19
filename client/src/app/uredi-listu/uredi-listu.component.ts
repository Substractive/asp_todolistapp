import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodolistService } from '../_services/todolist.service';
import { TodoList } from '../_models/todo_list';
import { ToastrService } from 'ngx-toastr';
import { ZadaciService } from '../_services/zadaci.service';

@Component({
  selector: 'app-uredi-listu',
  templateUrl: './uredi-listu.component.html',
  styleUrls: ['./uredi-listu.component.css']
})
export class UrediListuComponent implements OnInit{

  lista: TodoList = {
    id: 0,
    title: "",
    tag: "",
    listItems: [
      {
        id: 0,
        opis: "",
        inProgress: false
      }
    ]
  };
  listID: string = "";

  constructor(private route: ActivatedRoute, private http: HttpClient, 
    private todoService: TodolistService, private zadatakService: ZadaciService,
    private toastr: ToastrService){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.listID = params['id'];
      console.log(this.listID);
      this.todoService.dohvatiListu(this.listID).subscribe({
        next: response => {
          this.lista = response;
          console.log(this.lista);
        },
        error: error => {
          this.toastr.error('Dogodila se greška.')
        }
      })
    })
  }

  spremiListu(){
    console.log(this.lista);
   
    this.todoService.azurirajListu(this.lista).subscribe({
      next: response => {
        console.log(response);
        this.toastr.success("Spremljeno");
      },
      error: error => {
        console.error(error);
        this.toastr.error("Dogodila se greška.");
      },
    })
  }

  obrisiZadatak(zadatak: any){
    console.log(zadatak);
    const index = this.lista.listItems.indexOf(zadatak);
    
    if(zadatak.id == 0){
      this.lista.listItems.splice(index, 1);
      return;
    }
  
    
    this.zadatakService.obrisiZadatak(zadatak).subscribe({
      next: response => {
        this.toastr.success("Zadatak obrisan");
        this.lista.listItems.splice(index, 1);
      },
      error: error => {
        this.toastr.error("Dogodila se greška");
      }
    })
  }

  dodajZadatak(){
    this.lista.listItems.push({
      id: 0,
      opis: "Default",
      inProgress: true
    });
  }

}
