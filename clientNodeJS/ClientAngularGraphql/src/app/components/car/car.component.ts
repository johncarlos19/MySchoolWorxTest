import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Router, RouterModule} from '@angular/router';
import {request, gql} from 'graphql-request'
import {ignoreElements} from "rxjs";


const query = gql`
  query{
    cars{
      id
      typename
      brand
      model
      year
      color
    }
  }`


export interface CarElement {
  id: number;
  brand: string;
  color: string;
  year: number;
  model: string;
}


/**
 * @title Basic use of `<table mat-table>`
 */


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})


export class CarComponent implements OnInit {
  displayedColumns: string[] = ['id', 'brand', 'year', 'color', 'model', 'action'];
  carList: Array<CarElement> = [];
  dataSource: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private router: Router) {

  }

  ngOnInit(): void {
    request('http://localhost:8000/graphql/', query).then((data) => {

      for (let i = 0; i < data.cars.length; i++) {
        this.carList.push(data.cars[i])
      }

      console.log(data)
      this.dataSource = new MatTableDataSource(this.carList);
    }).then(() => {
      this.dataSource.paginator = this.paginator;
    })


  }

  edit(typename: string, id: string, action: string) {
    this.router.navigateByUrl('/Edit' + typename + '?id=' + id+'&action='+action);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
