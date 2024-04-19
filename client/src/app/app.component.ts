import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TodolistService } from './_services/todolist.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { TodoList } from './_models/todo_list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  todoLists: TodoList[] = [];
  selectedList: any = null;

  constructor(private http: HttpClient, private todoService: TodolistService, private toastr: ToastrService){}

  ngOnInit(): void {
 
  }

  
}
