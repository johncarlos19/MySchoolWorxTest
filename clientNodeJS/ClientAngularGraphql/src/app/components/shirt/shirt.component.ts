import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

import {request, gql} from 'graphql-request'
import {ignoreElements} from "rxjs";
import {CarElement} from "../car/car.component";
import {Router} from "@angular/router";


const query = gql`
  query{
    shirts{
      id
      typename
      lenght
      size
      color
    }
  }`


export interface ShirtElement {
  id: number;
  lenght: string;
  color: string;
  size: number;
}


@Component({
  selector: 'app-shirt',
  templateUrl: './shirt.component.html',
  styleUrls: ['./shirt.component.css']
})
export class ShirtComponent implements OnInit {
  displayedColumns: string[] = ['id', 'lenght', 'size', 'color', 'action'];
  shirtList: Array<ShirtElement> = [];
  dataSource: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router) { }

  ngOnInit(): void {
        request('http://localhost:8000/graphql/', query).then((data) => {

    for (let i = 0; i < data.shirts.length; i++) {
      this.shirtList.push(data.shirts[i])
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
