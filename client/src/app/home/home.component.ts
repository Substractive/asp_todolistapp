import { Component, OnInit } from '@angular/core';
import { TodoList } from '../_models/todo_list';
import { HttpClient } from '@angular/common/http';
import { TodolistService } from '../_services/todolist.service';
import { ToastrService } from 'ngx-toastr';
import { ZadaciService } from '../_services/zadaci.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todoLists: TodoList[] = [];
  selectedList: any = null;
  noviZadatak: any = {
    id: 0,
    opis: "",
    inProgress: true,
    appListId: 0
  };

  constructor(private http: HttpClient, private todoService: TodolistService,
     private toastr: ToastrService, private zadatakService: ZadaciService){}

  ngOnInit(): void {
   

    this.dohvatiListe();
  
    console.log(this.todoLists);
 
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
      error: error => this.toastr.error(error)
    })
  }

  izmjenaListe(lista: any){
    if(lista.target.value == 0){
      console.log("0 je odabrana");
      this.selectedList = null;
      return;
    }
    
    console.log("Izmjena liste event");
    console.log(lista.target.value);
    var id = lista.target.value;
    var foundItem = this.todoLists.find((item) => item.id == id);
    if(foundItem){
      this.selectedList = foundItem;
      console.log(this.selectedList);
      console.log("Item found");
    }
  }

  obrisiZadatak(model: any){
    console.log(model);
    const index = this.selectedList.listItems.indexOf(model);
    console.log("Index brisanja", index);
    this.zadatakService.obrisiZadatak(model).subscribe({
      next: response => {
        this.toastr.success("Zadatak obrisan");
        this.selectedList.listItems.splice(index, 1);
      },
      error: error => {
        this.toastr.error("Dogodila se greška");
      }
    })
  }

  zavrsiZadatak(model: any){
    console.log(model);
    model.inProgress = false;
    this.zadatakService.updateZadatak(model).subscribe({
      next: response => {
        this.toastr.success("Zadatak ažuriran");
      },
      error: error => {
        this.toastr.error("Dogodila se greška");
      }
    })
  }

  dodajZadatak(){
    console.log(this.noviZadatak);
    console.log(this.selectedList);

    if(this.selectedList == null){
      this.toastr.error("Odaberite listu.")
      return;
    }

    this.noviZadatak.appListId = this.selectedList.id;

    this.zadatakService.spremiZadatak(this.noviZadatak).subscribe({
      next: response => {
        console.log(response);
        this.noviZadatak = {
          id: 0,
          opis: "",
          inProgress: true,
          appListId: 0
        }
        this.selectedList.listItems.push({
          opis: response.opis,
          id: response.id,
          inProgress: response.inProgress,
        });
        this.toastr.success("Zadatak dodan");
      },
      error: error => {
        this.toastr.error("Dogodila se greška");
      }
    })
  }
}
