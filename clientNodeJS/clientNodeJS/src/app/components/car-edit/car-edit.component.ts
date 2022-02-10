import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {request, GraphQLClient, gql} from 'graphql-request'
import {MatSnackBar} from "@angular/material/snack-bar";


const endpoint = 'http://localhost:8000/graphql/'
const updateCar = gql`
  mutation update_Car($id: Int!, $brand: String!, $model: String!, $color: String!, $year: Int!){
    updateCar(id:$id, brand: $brand, model: $model, color: $color, year: $year ) {
      statu
    }
  }
`
const query = gql`
  query get_Car($id:Int!){
    getCar(id:$id){
      typename
      id
      brand
      model
      year
      color
    }
  }`

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {
  form: FormGroup;
  sb: MatSnackBar;
  id: string = '';
  action: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private _sb: MatSnackBar) {
    this.form = this.fb.group({
      brand: ['', Validators.required],
      year: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required]
    })
    this.sb = _sb
    let params = new URLSearchParams(document.location.search);

    // @ts-ignore
    this.id = params.get("id");
    // @ts-ignore
    this.action = params.get("action");

  }

  ngOnInit(): void {
    try {
      if (this.id !== null) {
        const variables = {
          id: parseInt(this.id)
        }
        console.log(variables)
        request(endpoint, query, variables).then((data) => {

          console.log(data)
          this.form = this.fb.group({
            brand: [data.getCar.brand, Validators.required],
            year: [data.getCar.year, Validators.required],
            model: [data.getCar.model, Validators.required],
            color: [data.getCar.color, Validators.required]
          })

          this.sb.open(data.updateCar.statu, "Close");
        }).then(() => {
          this.router.navigateByUrl('/' + this.action);
        })
      }


    } catch (error) {
      console.error(JSON.stringify(error, undefined, 2))
      console.error(error)

    }
  }

  cancel() {
    this.router.navigateByUrl('/' + this.action);
  }

  edit() {

    try {
      const variables = {
        id: parseInt(this.id),
        brand: this.form.value.brand,
        model: this.form.value.model,
        color: this.form.value.color,
        year: this.form.value.year
      }

      console.log(variables)
      request(endpoint, updateCar, variables).then((data) => {

        // console.log(data)

        this.sb.open(data.updateCar.statu, "Close");
      }).then(() => {
        this.router.navigateByUrl('/' + this.action);
      })

    } catch (error) {
      console.error(JSON.stringify(error, undefined, 2))
      console.error(error)

    }


  }

}
