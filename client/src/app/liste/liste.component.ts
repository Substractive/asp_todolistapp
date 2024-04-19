import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TodolistService } from '../_services/todolist.service';
import { TodoList } from '../_models/todo_list';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit{

  novaLista: any = {};
  todoLists: TodoList[] = [];
  constructor(private http: HttpClient,  private todoService: TodolistService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.dohvatiListe();
  }

  dohvatiListe(){
    this.todoLists = [];
    this.todoService.getTodoLists().subscribe({
      next: response => {
        response.map((listItem: TodoList) => {
          this.todoLists.push(listItem);
        });
        console.log(response);
      },
      error: error => this.toastr.error('Greška kod dohvaćanja listi.')
    })
  }

  spremiListu(){
    this.todoService.spremiNovuListu(this.novaLista).subscribe({
      next: response => {
        this.toastr.success('Spremljeno');
        this.novaLista = {};
        this.dohvatiListe();
      },
      error: error => {
        this.toastr.error('Dogodila se greška');
        console.error(error);
      }
    })
  }

  obrisiListu(listItem: any){
    if(listItem){
      this.todoService.obrisiListu(listItem.id).subscribe({
        next: response => {
          console.log("Obrisano");
          this.toastr.success("Obrisana lista");
          const index = this.todoLists.indexOf(listItem);
          this.todoLists.splice(index, 1);
        },
        error: error => {
          console.error("Dogodila se greška");
          console.error(error);
        }
      });
    }
  }

}
