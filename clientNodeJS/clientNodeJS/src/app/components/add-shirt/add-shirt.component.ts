import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {request, GraphQLClient, gql} from 'graphql-request'
import {MatSnackBar} from "@angular/material/snack-bar";

const endpoint = 'http://localhost:8000/graphql/'

// const graphQLClient = new GraphQLClient(endpoint)
const createShirt = gql`
  mutation create_Shirt($lenght: String!, $color: String!, $size: Float!){
    createShirt(lenght: $lenght, color: $color, size: $size ) {
    statu
  }
  }
`


@Component({
  selector: 'app-add-shirt',
  templateUrl: './add-shirt.component.html',
  styleUrls: ['./add-shirt.component.css']
})
export class AddShirtComponent implements OnInit {
  form: FormGroup;
  sb: MatSnackBar;


  constructor(private router: Router, private fb: FormBuilder,private _sb: MatSnackBar) {
    this.form = this.fb.group({
      lenght: ['', Validators.required],
      size: ['', Validators.required],
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
        lenght: this.form.value.lenght,
        color: this.form.value.color,
        size: this.form.value.size
      }

      console.log(variables )
      request(endpoint, createShirt, variables).then((data) => {

        console.log(data)

        this.sb.open(data.createShirt.statu, "Close");
      }).then(() => {
        this.router.navigateByUrl('/shirt');
      })

    } catch (error) {
      console.error(JSON.stringify(error, undefined, 2))
      console.error(error)

    }


  }

}
