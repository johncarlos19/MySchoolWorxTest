import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

import {request, gql} from 'graphql-request'
import {ignoreElements} from "rxjs";
import {CarElement} from "../car/car.component";
import {Router} from "@angular/router";
import {ShirtElement} from "../shirt/shirt.component";



const query = gql`
  query{
  products{
    typename
    id
    car{
      brand
      model
      year
      color
    }
    shirt{
      lenght
      size
      color
    }
  }
}`

export interface ProductElement {
  id: number;
  typename: string;
  car: CarElement;
  shirt: ShirtElement;


}



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['id', 'typename', 'field', 'action'];
  shirtList: Array<ProductElement> = [];
  dataSource: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router) { }

  ngOnInit(): void {
        request('http://localhost:8000/graphql/', query).then((data) => {

    for (let i = 0; i < data.products.length; i++) {
      this.shirtList.push(data.products[i])
    }

      console.log(data)
      this.dataSource =  new MatTableDataSource(this.shirtList);
    }).then(()=>{
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
