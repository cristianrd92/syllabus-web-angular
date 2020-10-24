import { Component, OnInit } from '@angular/core';
import { DatatablesEspaniol } from '../helper/datatables.component';

@Component({
  selector: 'app-comision',
  templateUrl: './comision.component.html',
  styleUrls: ['./comision.component.css']
})
export class ComisionComponent implements OnInit {

  constructor() { }
  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }

}
