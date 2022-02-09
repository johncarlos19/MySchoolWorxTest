import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {request, GraphQLClient, gql} from 'graphql-request'
import {MatSnackBar} from "@angular/material/snack-bar";

const endpoint = 'http://localhost:8000/graphql/'

// const graphQLClient = new GraphQLClient(endpoint)
const createCar = gql`
  mutation create_Car($brand: String!, $model: String!, $color: String!, $year: Int!){
    createCar(brand: $brand, model: $model, color: $color, year: $year ) {
      statu
    }
  }
`

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  form: FormGroup;
  sb: MatSnackBar;

  constructor(private router: Router, private fb: FormBuilder, private _sb: MatSnackBar) {
    this.form = this.fb.group({
      brand: ['', Validators.required],
      year: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required]
    })
    this.sb = _sb

  }

  ngOnInit(): void {
  }

    cancel(){
    this.router.navigateByUrl('/shirt');
  }
    add() {

    try {
      const variables  = {
        brand: this.form.value.brand,
        model: this.form.value.model,
        color: this.form.value.color,
        year: this.form.value.year
      }

      console.log(variables )
      request(endpoint, createCar, variables).then((data) => {

        console.log(data)

        this.sb.open(data.createCar.statu, "Close");
      }).then(() => {
        this.router.navigateByUrl('/car');
      })

    } catch (error) {
      console.error(JSON.stringify(error, undefined, 2))
      console.error(error)

    }


  }

}
