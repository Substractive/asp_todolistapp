import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ZadaciService } from '../_services/zadaci.service';
import { Zadatak } from '../_models/zadatak';

@Component({
  selector: 'app-zadaci',
  templateUrl: './zadaci.component.html',
  styleUrls: ['./zadaci.component.css']
})
export class ZadaciComponent implements OnInit{

  zadaci: Zadatak[] = [];

  constructor(private http: HttpClient,  private zadaciService: ZadaciService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.dohvatiZadatke();
  }

  dohvatiZadatke(){
    this.zadaci = [];
    this.zadaciService.dohvatiSveZadatke().subscribe({
      next: response => {
        response.map((listItem: Zadatak) => {
          this.zadaci.push(listItem);
        });
        console.log(response);
      },
      error: error => this.toastr.error(error)
    })
  }

  obrisiZadatak(zadatak: any){
    const index = this.zadaci.indexOf(zadatak);
  
    this.zadaciService.obrisiZadatak(zadatak).subscribe({
      next: response => {
        this.toastr.success("Zadatak obrisan");
        this.zadaci.splice(index, 1);
      },
      error: error => this.toastr.error("Dogodila se greška"),
    })
  }
}
